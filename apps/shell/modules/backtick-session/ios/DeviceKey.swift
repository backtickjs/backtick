import CryptoKit
import Foundation
import Security

// The phone's key: ECDSA P-256 in the Secure Enclave, made on this device and
// never exportable. It signs DPoP proofs and seals the refresh token; nothing,
// native or JavaScript, can read it.
enum DeviceKey {
  private static let tag = Data("com.backtickjs.app.device-key".utf8)

  static func loadOrCreate() throws -> SecKey {
    if let key = load() {
      return key
    }
    var error: Unmanaged<CFError>?
    guard
      let access = SecAccessControlCreateWithFlags(
        nil, kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly, .privateKeyUsage, &error)
    else {
      throw error!.takeRetainedValue() as Error
    }
    let attributes: [String: Any] = [
      kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom,
      kSecAttrKeySizeInBits as String: 256,
      kSecAttrTokenID as String: kSecAttrTokenIDSecureEnclave,
      kSecPrivateKeyAttrs as String: [
        kSecAttrIsPermanent as String: true,
        kSecAttrApplicationTag as String: tag,
        kSecAttrAccessControl as String: access,
      ],
    ]
    guard let key = SecKeyCreateRandomKey(attributes as CFDictionary, &error) else {
      throw error!.takeRetainedValue() as Error
    }
    return key
  }

  static func load() -> SecKey? {
    let query: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrApplicationTag as String: tag,
      kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom,
      kSecReturnRef as String: true,
    ]
    var item: CFTypeRef?
    guard SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess else {
      return nil
    }
    return (item as! SecKey)
  }

  static func delete() {
    let query: [String: Any] = [
      kSecClass as String: kSecClassKey,
      kSecAttrApplicationTag as String: tag,
    ]
    SecItemDelete(query as CFDictionary)
  }

  // The public key as a JWK, for the DPoP proof's header.
  static func publicJWK(_ key: SecKey) throws -> [String: String] {
    guard let publicKey = SecKeyCopyPublicKey(key),
      let point = SecKeyCopyExternalRepresentation(publicKey, nil) as Data?,
      point.count == 65, point.first == 0x04
    else {
      throw SessionError.key
    }
    return [
      "kty": "EC",
      "crv": "P-256",
      "x": point[1..<33].base64URL,
      "y": point[33..<65].base64URL,
    ]
  }

  // The key's thumbprint (RFC 7638): what `dpop_jkt` names.
  static func thumbprint(_ jwk: [String: String]) -> String {
    let canonical =
      #"{"crv":"\#(jwk["crv"]!)","kty":"\#(jwk["kty"]!)","x":"\#(jwk["x"]!)","y":"\#(jwk["y"]!)"}"#
    return Data(SHA256.hash(data: Data(canonical.utf8))).base64URL
  }

  // An ES256 signature as JWS wants it: r and s, 32 bytes each.
  static func sign(_ key: SecKey, _ data: Data) throws -> Data {
    var error: Unmanaged<CFError>?
    guard
      let der = SecKeyCreateSignature(
        key, .ecdsaSignatureMessageX962SHA256, data as CFData, &error) as Data?
    else {
      throw error!.takeRetainedValue() as Error
    }
    return try rawSignature(der)
  }

  private static let sealing =
    SecKeyAlgorithm.eciesEncryptionCofactorVariableIVX963SHA256AESGCM

  static func seal(_ key: SecKey, _ data: Data) throws -> Data {
    var error: Unmanaged<CFError>?
    guard let publicKey = SecKeyCopyPublicKey(key),
      let sealed = SecKeyCreateEncryptedData(publicKey, sealing, data as CFData, &error)
        as Data?
    else {
      throw error.map { $0.takeRetainedValue() as Error } ?? SessionError.key
    }
    return sealed
  }

  static func unseal(_ key: SecKey, _ data: Data) throws -> Data {
    var error: Unmanaged<CFError>?
    guard let plain = SecKeyCreateDecryptedData(key, sealing, data as CFData, &error) as Data?
    else {
      throw error!.takeRetainedValue() as Error
    }
    return plain
  }

  // DER's SEQUENCE { INTEGER r, INTEGER s } to r ‖ s.
  static func rawSignature(_ der: Data) throws -> Data {
    let bytes = [UInt8](der)
    var index = 0
    func expect(_ tag: UInt8) throws {
      guard index < bytes.count, bytes[index] == tag else { throw SessionError.key }
      index += 1
    }
    func length() throws -> Int {
      guard index < bytes.count else { throw SessionError.key }
      let first = Int(bytes[index])
      index += 1
      if first < 0x80 {
        return first
      }
      let count = first & 0x7f
      guard (1...2).contains(count), index + count <= bytes.count else {
        throw SessionError.key
      }
      var value = 0
      for _ in 0..<count {
        value = value << 8 | Int(bytes[index])
        index += 1
      }
      return value
    }
    func integer() throws -> Data {
      try expect(0x02)
      let count = try length()
      guard count >= 1, index + count <= bytes.count else { throw SessionError.key }
      var value = Array(bytes[index..<index + count])
      index += count
      while value.count > 32, value.first == 0 {
        value.removeFirst()
      }
      guard value.count <= 32 else { throw SessionError.key }
      return Data(repeating: 0, count: 32 - value.count) + Data(value)
    }
    try expect(0x30)
    _ = try length()
    return try integer() + integer()
  }
}

extension Data {
  var base64URL: String {
    base64EncodedString()
      .replacingOccurrences(of: "+", with: "-")
      .replacingOccurrences(of: "/", with: "_")
      .replacingOccurrences(of: "=", with: "")
  }
}

enum SessionError: Error {
  case key
  case notSignedIn
  case server(String)
  case callback
}
