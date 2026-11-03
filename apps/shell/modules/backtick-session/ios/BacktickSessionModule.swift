import ExpoModulesCore

// What JavaScript may do with the session: start a sign-in, sign out, and know
// whether there's one. Never a key, a signature or a token.
public class BacktickSessionModule: Module {
  private var observer: NSObjectProtocol?

  public func definition() -> ModuleDefinition {
    Name("BacktickSession")
    Events("onChange")

    Function("isSignedIn") { Session.shared.isSignedIn }

    AsyncFunction("signIn") { () async throws -> Bool in
      try await Session.shared.signIn()
    }

    AsyncFunction("signOut") { () async in
      await Session.shared.signOut()
    }

    OnStartObserving {
      self.observer = NotificationCenter.default.addObserver(
        forName: Session.changed, object: nil, queue: nil
      ) { [weak self] _ in
        self?.sendEvent("onChange", ["signedIn": Session.shared.isSignedIn])
      }
    }

    OnStopObserving {
      if let observer = self.observer {
        NotificationCenter.default.removeObserver(observer)
      }
    }
  }
}
