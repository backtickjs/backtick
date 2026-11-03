import Foundation

// Attaches the session's access token to requests to Backtick's own origins,
// below JavaScript, so no script can read or set it. Every other request goes
// out untouched. A redirect is decided again for its own origin.
final class SessionURLProtocol: URLProtocol, URLSessionDataDelegate, @unchecked Sendable {
  private static let handled = "BacktickSessionHandled"
  private var session: URLSession?
  private var loading: URLSessionDataTask?

  override class func canInit(with request: URLRequest) -> Bool {
    guard let url = request.url, property(forKey: handled, in: request) == nil else {
      return false
    }
    return Session.shared.origin(for: url) != nil
  }

  override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

  override func startLoading() {
    let request = self.request
    Task {
      let mutable = (request as NSURLRequest).mutableCopy() as! NSMutableURLRequest
      // A script's own Authorization to a Backtick origin is never sent.
      mutable.setValue(nil, forHTTPHeaderField: "Authorization")
      if let url = request.url, let origin = Session.shared.origin(for: url),
        let token = await Session.shared.accessToken(for: origin)
      {
        mutable.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
      }
      URLProtocol.setProperty(true, forKey: Self.handled, in: mutable)
      let session = URLSession(configuration: .default, delegate: self, delegateQueue: nil)
      self.session = session
      loading = session.dataTask(with: mutable as URLRequest)
      loading!.resume()
    }
  }

  override func stopLoading() {
    loading?.cancel()
    session?.invalidateAndCancel()
  }

  func urlSession(
    _ session: URLSession, task: URLSessionTask, willPerformHTTPRedirection response: HTTPURLResponse,
    newRequest request: URLRequest, completionHandler: @escaping (URLRequest?) -> Void
  ) {
    var next = request
    next.setValue(nil, forHTTPHeaderField: "Authorization")
    let mutable = (next as NSURLRequest).mutableCopy() as! NSMutableURLRequest
    URLProtocol.removeProperty(forKey: Self.handled, in: mutable)
    client?.urlProtocol(self, wasRedirectedTo: mutable as URLRequest, redirectResponse: response)
    task.cancel()
    completionHandler(nil)
  }

  func urlSession(
    _ session: URLSession, dataTask: URLSessionDataTask, didReceive response: URLResponse,
    completionHandler: @escaping (URLSession.ResponseDisposition) -> Void
  ) {
    client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
    completionHandler(.allow)
  }

  func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
    client?.urlProtocol(self, didLoad: data)
  }

  func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
    if let error, (error as NSError).code != NSURLErrorCancelled {
      client?.urlProtocol(self, didFailWithError: error)
    } else if error == nil {
      client?.urlProtocolDidFinishLoading(self)
    }
    session.finishTasksAndInvalidate()
  }
}
