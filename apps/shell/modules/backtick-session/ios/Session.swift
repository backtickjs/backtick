import AuthenticationServices
import CryptoKit
import Foundation
import UIKit

// The phone's session with Backtick's authorization server (OAuth 2.1 with
// PKCE and DPoP): signing in, the refresh token,
// sealed by the device key, and a short access token per origin, kept in
// memory. Nothing here is reachable from JavaScript but `signIn`, `signOut`
// and whether there's a session.
final class Session: NSObject, @unchecked Sendable {
  static let shared = Session()
  static let changed = Notification.Name("BacktickSessionChanged")

  private let clientID = "backtick-app"
  private let authorizationServer: URL
  private let callback: URL
  private let lock = NSLock()
  // The authorization server's own requests, through no hook of ours.
  private let http = URLSession(configuration: .ephemeral)

  private var refreshToken: String?
  private var origins: [String] = []
  private var nonce: String?
  private var accessTokens: [String: (token: String, expires: Date)] = [:]
  private var inFlight: [String: Task<String?, Never>] = [:]
  private var signingIn: ASWebAuthenticationSession?

  private override init() {
    let info = Bundle.main.infoDictionary ?? [:]
    authorizationServer = URL(string: info["BacktickAuthorizationServer"] as! String)!
    callback = URL(string: info["BacktickSignInCallback"] as! String)!
    super.init()
  }

  // At launch, before any request. A first run after an install starts clean:
  // the Keychain, and so an old key and session, survive deleting the app.
  func start() {
    let defaults = UserDefaults.standard
    if !defaults.bool(forKey: "BacktickSessionInstalled") {
      SealedState.delete()
      DeviceKey.delete()
      defaults.set(true, forKey: "BacktickSessionInstalled")
    }
    guard let key = DeviceKey.load(), let state = SealedState.load(key) else {
      return
    }
    lock.withLock {
      refreshToken = state.refreshToken
      origins = state.origins
    }
  }

  var isSignedIn: Bool {
    lock.withLock { refreshToken != nil }
  }

  // Whether a request to `url` gets a token: HTTPS, to an origin matching one
  // of the authorization server's patterns (`https://app.backtickjs.com`,
  // `https://*.backtickjs.app`), and only while signed in.
  func origin(for url: URL) -> String? {
    guard url.scheme == "https", url.port == nil, let host = url.host?.lowercased() else {
      return nil
    }
    let origin = "https://\(host)"
    let patterns = lock.withLock { refreshToken == nil ? [] : origins }
    for pattern in patterns {
      if pattern == origin {
        return origin
      }
      // `https://*.<domain>`: one label in front of the domain, no more.
      if pattern.hasPrefix("https://*.") {
        let domain = "." + pattern.dropFirst("https://*.".count)
        if host.hasSuffix(domain), !host.dropLast(domain.count).contains("."),
          host.count > domain.count
        {
          return origin
        }
      }
    }
    return nil
  }

  // An access token for `origin`: the cached one while it has a minute left,
  // or a new one, one request at a time per origin.
  func accessToken(for origin: String) async -> String? {
    let task: Task<String?, Never> = lock.withLock {
      if let cached = accessTokens[origin], cached.expires > Date().addingTimeInterval(60) {
        return Task { cached.token }
      }
      if let running = inFlight[origin] {
        return running
      }
      let task = Task { await self.refresh(origin) }
      inFlight[origin] = task
      return task
    }
    let token = await task.value
    lock.withLock { inFlight[origin] = nil }
    return token
  }

  private func refresh(_ origin: String) async -> String? {
    guard let refreshToken = lock.withLock({ self.refreshToken }) else {
      return nil
    }
    do {
      let answer = try await token([
        "grant_type": "refresh_token",
        "refresh_token": refreshToken,
        "client_id": clientID,
        "resource": origin,
      ])
      // A seal that fails keeps the session in memory: the token still works.
      try? adopt(answer)
      return keep(answer, for: origin)
    } catch SessionError.server("invalid_grant") {
      // Revoked, or idle too long: signed out.
      clear()
      return nil
    } catch {
      return nil
    }
  }

  // Sign-in (RFC 8252, with PKCE and `dpop_jkt`) in the system's sign-in
  // browser, returning to the HTTPS callback only this app can receive. False
  // if the user closed it. `extra` goes to the authorization server as is
  // (`provider`, `login_hint`, `prompt`: what it reads is its own business),
  // but never in place of the request's own parameters.
  @MainActor
  func signIn(extra: [String: String]) async throws -> Bool {
    let key = try DeviceKey.loadOrCreate()
    let jkt = DeviceKey.thumbprint(try DeviceKey.publicJWK(key))
    let verifier = Self.random()
    let state = Self.random()
    var authorize = URLComponents(
      url: authorizationServer.appendingPathComponent("authorize"), resolvingAgainstBaseURL: false)!
    authorize.queryItems = [
      URLQueryItem(name: "response_type", value: "code"),
      URLQueryItem(name: "client_id", value: clientID),
      URLQueryItem(name: "redirect_uri", value: callback.absoluteString),
      URLQueryItem(name: "code_challenge", value: Self.challenge(verifier)),
      URLQueryItem(name: "code_challenge_method", value: "S256"),
      URLQueryItem(name: "state", value: state),
      URLQueryItem(name: "dpop_jkt", value: jkt),
    ]
    let own = Set(authorize.queryItems!.map(\.name))
    for (name, value) in extra.sorted(by: { $0.key < $1.key }) where !own.contains(name) {
      authorize.queryItems!.append(URLQueryItem(name: name, value: value))
    }
    let returned: URL? = try await withCheckedThrowingContinuation { continuation in
      let session = ASWebAuthenticationSession(
        url: authorize.url!,
        callback: .https(host: callback.host!, path: callback.path)
      ) { url, error in
        if let error = error as? ASWebAuthenticationSessionError, error.code == .canceledLogin {
          continuation.resume(returning: nil)
        } else if let error {
          continuation.resume(throwing: error)
        } else {
          continuation.resume(returning: url)
        }
      }
      session.presentationContextProvider = self
      // Nothing of the sign-in stays in Safari.
      session.prefersEphemeralWebBrowserSession = true
      signingIn = session
      session.start()
    }
    signingIn = nil
    guard let returned else {
      return false
    }
    let query = URLComponents(url: returned, resolvingAgainstBaseURL: false)?.queryItems ?? []
    let value = { (name: String) in query.first { $0.name == name }?.value }
    // The answer is to this request (`state`) from this server (`iss`, RFC 9207).
    guard let code = value("code"), value("state").map({ Self.equal($0, state) }) == true,
      value("iss") == authorizationServer.absoluteString.trimmingSuffix("/")
    else {
      throw SessionError.callback
    }
    let home = "https://\(callback.host!)"
    let answer = try await token([
      "grant_type": "authorization_code",
      "code": code,
      "code_verifier": verifier,
      "redirect_uri": callback.absoluteString,
      "client_id": clientID,
      "resource": home,
    ])
    guard answer["refresh_token"] is String else {
      throw SessionError.server("no refresh token")
    }
    try adopt(answer)
    _ = keep(answer, for: home)
    NotificationCenter.default.post(name: Self.changed, object: nil)
    return true
  }

  // Sign out (RFC 7009): the server stops the refresh token, and the phone
  // forgets it and its key.
  func signOut() async {
    if let refreshToken = lock.withLock({ self.refreshToken }) {
      _ = try? await request(
        "revoke", ["token": refreshToken, "token_type_hint": "refresh_token", "client_id": clientID])
    }
    clear()
  }

  private func clear() {
    lock.withLock {
      refreshToken = nil
      origins = []
      accessTokens = [:]
    }
    SealedState.delete()
    DeviceKey.delete()
    NotificationCenter.default.post(name: Self.changed, object: nil)
  }

  // What a token answer carries for the session, at sign-in or any refresh: a
  // refresh token (the server may rotate it) and the origins (it may add
  // some). Kept, and sealed again.
  private func adopt(_ answer: [String: Any]) throws {
    let next: SealedState? = lock.withLock {
      let refresh = answer["refresh_token"] as? String ?? refreshToken
      let patterns = answer["backtick_origins"] as? [String] ?? origins
      guard let refresh, refresh != refreshToken || patterns != origins else {
        return nil
      }
      refreshToken = refresh
      origins = patterns
      return SealedState(refreshToken: refresh, origins: patterns)
    }
    if let next, let key = DeviceKey.load() {
      try SealedState.save(next, key)
    }
  }

  private func keep(_ answer: [String: Any], for origin: String) -> String? {
    guard let token = answer["access_token"] as? String,
      let seconds = answer["expires_in"] as? Double
    else {
      return nil
    }
    lock.withLock {
      accessTokens[origin] = (token, Date().addingTimeInterval(seconds))
    }
    return token
  }

  // A token endpoint request, with a DPoP proof; asked for its nonce, it asks
  // again once with it.
  private func token(_ form: [String: String]) async throws -> [String: Any] {
    try await request("token", form)
  }

  private func request(_ path: String, _ form: [String: String], retried: Bool = false)
    async throws -> [String: Any]
  {
    let url = authorizationServer.appendingPathComponent(path)
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
    request.setValue(try proof(url), forHTTPHeaderField: "DPoP")
    var body = URLComponents()
    body.queryItems = form.map { URLQueryItem(name: $0.key, value: $0.value) }
    request.httpBody = body.percentEncodedQuery!
      .replacingOccurrences(of: "+", with: "%2B")
      .data(using: .utf8)
    let (data, response) = try await http.data(for: request)
    let http = response as! HTTPURLResponse
    if let next = http.value(forHTTPHeaderField: "DPoP-Nonce") {
      lock.withLock { nonce = next }
    }
    let json = (try? JSONSerialization.jsonObject(with: data)) as? [String: Any] ?? [:]
    if http.statusCode == 200 {
      return json
    }
    let error = json["error"] as? String ?? "status \(http.statusCode)"
    if error == "use_dpop_nonce", !retried {
      return try await self.request(path, form, retried: true)
    }
    throw SessionError.server(error)
  }

  // A DPoP proof (RFC 9449) for a POST to `url`, signed by the device key.
  private func proof(_ url: URL) throws -> String {
    guard let key = DeviceKey.load() else {
      throw SessionError.notSignedIn
    }
    let header: [String: Any] = [
      "typ": "dpop+jwt", "alg": "ES256", "jwk": try DeviceKey.publicJWK(key),
    ]
    var payload: [String: Any] = [
      "htm": "POST",
      "htu": url.absoluteString,
      "iat": Int(Date().timeIntervalSince1970),
      "jti": UUID().uuidString,
    ]
    if let nonce = lock.withLock({ nonce }) {
      payload["nonce"] = nonce
    }
    let input = [header, payload].map {
      try! JSONSerialization.data(withJSONObject: $0, options: [.sortedKeys]).base64URL
    }.joined(separator: ".")
    return input + "." + (try DeviceKey.sign(key, Data(input.utf8))).base64URL
  }

  private static func random() -> String {
    var bytes = [UInt8](repeating: 0, count: 32)
    _ = SecRandomCopyBytes(kSecRandomDefault, bytes.count, &bytes)
    return Data(bytes).base64URL
  }

  private static func challenge(_ verifier: String) -> String {
    Data(SHA256.hash(data: Data(verifier.utf8))).base64URL
  }

  private static func equal(_ a: String, _ b: String) -> Bool {
    let left = Array(a.utf8)
    let right = Array(b.utf8)
    guard left.count == right.count else { return false }
    return zip(left, right).reduce(0) { $0 | ($1.0 ^ $1.1) } == 0
  }
}

extension Session: ASWebAuthenticationPresentationContextProviding {
  func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
    MainActor.assumeIsolated {
      UIApplication.shared.connectedScenes
        .compactMap { $0 as? UIWindowScene }
        .flatMap(\.windows)
        .first { $0.isKeyWindow } ?? ASPresentationAnchor()
    }
  }
}

// The refresh token and the origins it's good for, sealed by the device key
// and kept in the Keychain: unreadable to anything but this module.
struct SealedState: Codable {
  var refreshToken: String
  var origins: [String]

  private static let query: [String: Any] = [
    kSecClass as String: kSecClassGenericPassword,
    kSecAttrService as String: "com.backtickjs.app.session",
    kSecAttrAccount as String: "sealed",
  ]

  static func load(_ key: SecKey) -> SealedState? {
    var item: CFTypeRef?
    var lookup = query
    lookup[kSecReturnData as String] = true
    guard SecItemCopyMatching(lookup as CFDictionary, &item) == errSecSuccess,
      let sealed = item as? Data,
      let plain = try? DeviceKey.unseal(key, sealed)
    else {
      return nil
    }
    return try? JSONDecoder().decode(SealedState.self, from: plain)
  }

  static func save(_ state: SealedState, _ key: SecKey) throws {
    let sealed = try DeviceKey.seal(key, try JSONEncoder().encode(state))
    delete()
    var item = query
    item[kSecValueData as String] = sealed
    item[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
    let status = SecItemAdd(item as CFDictionary, nil)
    guard status == errSecSuccess else {
      throw SessionError.server("Keychain \(status)")
    }
  }

  static func delete() {
    SecItemDelete(query as CFDictionary)
  }
}

extension String {
  func trimmingSuffix(_ suffix: String) -> String {
    hasSuffix(suffix) ? String(dropLast(suffix.count)) : self
  }
}
