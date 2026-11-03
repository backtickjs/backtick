package expo.modules.backticksession

import android.app.Activity
import android.app.Application
import android.content.Context
import android.content.Intent
import android.os.Bundle
import com.facebook.react.modules.network.OkHttpClientProvider
import expo.modules.core.interfaces.ApplicationLifecycleListener
import expo.modules.core.interfaces.Package
import expo.modules.core.interfaces.ReactActivityLifecycleListener
import okhttp3.Interceptor

class BacktickSessionPackage : Package {
  // Before anything builds React Native's OkHttp client: every client built
  // from it (fetch, XMLHttpRequest, images, WebSockets) gets a network
  // interceptor, run for each request on the wire, redirects included, that
  // attaches the token to Backtick's own origins. A script's own Authorization
  // to them is never sent; every other request goes out untouched.
  override fun createApplicationLifecycleListeners(context: Context): List<ApplicationLifecycleListener> =
    listOf(object : ApplicationLifecycleListener {
      override fun onCreate(application: Application) {
        Session.start(application)
        OkHttpClientProvider.setOkHttpClientFactory {
          OkHttpClientProvider.createClientBuilder(application)
            .addNetworkInterceptor(Interceptor { chain ->
              val request = chain.request()
              val origin = Session.originOf(request.url) ?: return@Interceptor chain.proceed(request)
              val token = Session.accessToken(origin)
              chain.proceed(
                request.newBuilder()
                  .removeHeader("Authorization")
                  .apply { if (token != null) header("Authorization", "Bearer $token") }
                  .build()
              )
            })
            .build()
        }
      }
    })

  // Auth Tab's launcher, registered as the activity is created; and the
  // sign-in callback, when it comes back as an App Link, kept from JavaScript.
  override fun createReactActivityLifecycleListeners(activityContext: Context): List<ReactActivityLifecycleListener> =
    listOf(object : ReactActivityLifecycleListener {
      override fun onCreate(activity: Activity, savedInstanceState: Bundle?) {
        Session.register(activity)
      }

      override fun onNewIntent(intent: Intent): Boolean = Session.handle(intent)
    })
}
