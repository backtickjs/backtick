package expo.modules.backticksession

import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

// What JavaScript may do with the session: start a sign-in, sign out, and know
// whether there's one. Never a key, a signature or a token.
class BacktickSessionModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("BacktickSession")
    Events("onChange")

    OnCreate {
      Session.onChange { sendEvent("onChange", mapOf("signedIn" to Session.isSignedIn)) }
    }

    Function("isSignedIn") { Session.isSignedIn }

    AsyncFunction("signIn") { promise: Promise ->
      Session.signIn { result ->
        result.fold(
          onSuccess = { promise.resolve(it) },
          onFailure = { promise.reject("ERR_SIGN_IN", it.message ?: "Sign-in failed", it) },
        )
      }
    }

    AsyncFunction("signOut") { Session.signOut() }
  }
}
