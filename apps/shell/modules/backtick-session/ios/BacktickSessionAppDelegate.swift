import Expo
import ExpoModulesCore
import React

// Before any request: the session is loaded, and both of iOS's request paths,
// `fetch` (expo/fetch's own URLSession) and XMLHttpRequest and images (React
// Native's), get the protocol that attaches tokens.
public class BacktickSessionAppDelegate: ExpoAppDelegateSubscriber {
  public func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    Session.shared.start()
    let configuration: @convention(block) () -> URLSessionConfiguration? = {
      let configuration = URLSessionConfiguration.default
      configuration.protocolClasses =
        [SessionURLProtocol.self] + (configuration.protocolClasses ?? [])
      return configuration
    }
    MainActor.assumeIsolated {
      ExpoFetchCustomExtension.setCustomURLSessionConfigurationProvider(configuration)
    }
    RCTSetCustomNSURLSessionConfigurationProvider(configuration)
    return true
  }
}
