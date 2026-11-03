package expo.modules.backticksession

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Handler
import android.os.Looper
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultLauncher
import androidx.browser.auth.AuthTabIntent
import okhttp3.FormBody
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONArray
import org.json.JSONObject
import java.security.MessageDigest
import java.security.SecureRandom
import java.util.UUID

// The phone's session with Backtick's authorization server (OAuth 2.1 with
// PKCE and DPoP): signing in, the refresh token, sealed by a Keystore key, and
// a short access token per origin, kept in memory. Nothing here is reachable
// from JavaScript but `signIn`, `signOut` and whether there's a session.
object Session {
  private const val CLIENT_ID = "backtick-app"
  private lateinit var context: Context
  private lateinit var authorizationServer: String
  private lateinit var callback: Uri

  // The authorization server's own requests, through no hook of ours.
  private val http = OkHttpClient()
  private val lock = Any()
  private var refreshToken: String? = null
  private var origins: List<String> = emptyList()
  private var nonce: String? = null
  private val accessTokens = HashMap<String, Pair<String, Long>>()
  private val listeners = mutableListOf<() -> Unit>()

  // A sign-in in flight: its launcher, its PKCE verifier and state, and who
  // to tell.
  private var launcher: ActivityResultLauncher<Intent>? = null
  private var pending: Pending? = null

  private class Pending(val verifier: String, val state: String, val done: (Result<Boolean>) -> Unit)

  // At launch, before any request.
  fun start(context: Context) {
    this.context = context.applicationContext
    val meta = context.packageManager
      .getApplicationInfo(context.packageName, PackageManager.GET_META_DATA).metaData
    authorizationServer = meta.getString("backtick.authorizationServer")!!.trimEnd('/')
    callback = Uri.parse(meta.getString("backtick.signInCallback")!!)
    val stored = preferences().getString("sealed", null) ?: return
    try {
      val state = JSONObject(String(DeviceKey.unseal(android.util.Base64.decode(stored, 0))))
      synchronized(lock) {
        refreshToken = state.getString("refreshToken")
        origins = state.getJSONArray("origins").let { list -> (0 until list.length()).map { list.getString(it) } }
      }
    } catch (e: Exception) {
      // Restored from a backup without its key, or the key is gone: signed out.
      preferences().edit().remove("sealed").apply()
    }
  }

  val isSignedIn: Boolean get() = synchronized(lock) { refreshToken != null }

  fun onChange(listener: () -> Unit) = synchronized(listeners) { listeners.add(listener) }

  private fun changed() = synchronized(listeners) { listeners.toList() }.forEach { it() }

  // Whether a request to `url` gets a token: HTTPS, to an origin matching one
  // of the authorization server's patterns (`https://app.backtickjs.com`,
  // `https://*.backtickjs.app`), and only while signed in.
  fun originOf(url: okhttp3.HttpUrl): String? {
    if (!url.isHttps || url.port != 443) return null
    val host = url.host.lowercase()
    val origin = "https://$host"
    val patterns = synchronized(lock) { if (refreshToken == null) emptyList() else origins }
    for (pattern in patterns) {
      if (pattern == origin) return origin
      if (pattern.startsWith("https://*.")) {
        val domain = "." + pattern.removePrefix("https://*.")
        if (host.endsWith(domain) && host.length > domain.length && !host.dropLast(domain.length).contains('.')) {
          return origin
        }
      }
    }
    return null
  }

  // An access token for `origin`: the cached one while it has a minute left,
  // or a new one, one request at a time.
  fun accessToken(origin: String): String? = synchronized(lock) {
    accessTokens[origin]?.let { (token, expires) ->
      if (expires > System.currentTimeMillis() + 60_000) return token
    }
    val refresh = refreshToken ?: return null
    try {
      val answer = token(
        mapOf(
          "grant_type" to "refresh_token",
          "refresh_token" to refresh,
          "client_id" to CLIENT_ID,
          "resource" to origin,
        )
      )
      // A seal that fails keeps the session in memory: the token still works.
      runCatching { adopt(answer) }
      keep(answer, origin)
    } catch (e: SessionException) {
      // Revoked, or idle too long: signed out.
      if (e.message == "invalid_grant") clear()
      null
    } catch (e: Exception) {
      null
    }
  }

  // Before the activity starts, as Auth Tab requires.
  fun register(activity: Activity) {
    val component = activity as? ComponentActivity ?: return
    launcher = AuthTabIntent.registerActivityResultLauncher(component) { result ->
      when (result.resultCode) {
        AuthTabIntent.RESULT_OK -> result.resultUri?.let { finish(it) }
        // Closed, or a browser without Auth Tab whose Custom Tab returned the
        // App Link to the activity instead: give that a moment to arrive.
        else -> Handler(Looper.getMainLooper()).postDelayed({
          pending?.let { pending = null; it.done(Result.success(false)) }
        }, 1500)
      }
    }
  }

  // The callback as an App Link, from a browser without Auth Tab. Consumed
  // here, never handed to JavaScript.
  fun handle(intent: Intent?): Boolean {
    val uri = intent?.data ?: return false
    if (uri.scheme != "https" || uri.host != callback.host || uri.path != callback.path) return false
    finish(uri)
    return true
  }

  // Sign-in (RFC 8252, with PKCE and `dpop_jkt`) in Chrome's Auth Tab,
  // returning to the HTTPS callback only this app can receive. `extra` goes to
  // the authorization server as is (`provider`, `login_hint`, `prompt`: what
  // it reads is its own business), but never in place of the request's own
  // parameters.
  fun signIn(extra: Map<String, String>, done: (Result<Boolean>) -> Unit) {
    val launcher = launcher ?: return done(Result.failure(SessionException("No activity")))
    DeviceKey.loadOrCreate()
    val verifier = random()
    val state = random()
    pending = Pending(verifier, state, done)
    val own = linkedMapOf(
      "response_type" to "code",
      "client_id" to CLIENT_ID,
      "redirect_uri" to callback.toString(),
      "code_challenge" to challenge(verifier),
      "code_challenge_method" to "S256",
      "state" to state,
      "dpop_jkt" to DeviceKey.thumbprint(DeviceKey.publicJwk()),
    )
    val url = Uri.parse("$authorizationServer/authorize").buildUpon()
      .apply {
        own.forEach { (name, value) -> appendQueryParameter(name, value) }
        extra.toSortedMap().forEach { (name, value) ->
          if (name !in own) appendQueryParameter(name, value)
        }
      }
      .build()
    Handler(Looper.getMainLooper()).post {
      AuthTabIntent.Builder().setEphemeralBrowsingEnabled(true).build()
        .launch(launcher, url, callback.host!!, callback.path!!)
    }
  }

  private fun finish(uri: Uri) {
    val sign = pending ?: return
    pending = null
    Thread {
      sign.done(
        runCatching {
          // The answer is to this request (`state`) from this server (`iss`, RFC 9207).
          if (!equal(uri.getQueryParameter("state") ?: "", sign.state) ||
            uri.getQueryParameter("iss") != authorizationServer
          ) {
            throw SessionException("callback")
          }
          // Refused (RFC 6749, 4.1.2.1): the user saying no is the same as closing.
          uri.getQueryParameter("error")?.let { error ->
            if (error == "access_denied") return@runCatching false
            throw SessionException(error)
          }
          val code = uri.getQueryParameter("code") ?: throw SessionException("callback")
          val home = "https://${callback.host}"
          val answer = token(
            mapOf(
              "grant_type" to "authorization_code",
              "code" to code,
              "code_verifier" to sign.verifier,
              "redirect_uri" to callback.toString(),
              "client_id" to CLIENT_ID,
              "resource" to home,
            )
          )
          answer.getString("refresh_token")
          adopt(answer)
          synchronized(lock) { keep(answer, home) }
          changed()
          true
        }
      )
    }.start()
  }

  // Sign out (RFC 7009): the server stops the refresh token, and the phone
  // forgets it and its keys.
  fun signOut() {
    synchronized(lock) { refreshToken }?.let { refresh ->
      runCatching {
        request(
          "revoke",
          mapOf("token" to refresh, "token_type_hint" to "refresh_token", "client_id" to CLIENT_ID),
        )
      }
    }
    clear()
  }

  private fun clear() {
    synchronized(lock) {
      refreshToken = null
      origins = emptyList()
      accessTokens.clear()
    }
    preferences().edit().remove("sealed").apply()
    DeviceKey.delete()
    changed()
  }

  // What a token answer carries for the session, at sign-in or any refresh: a
  // refresh token (the server may rotate it) and the origins (it may add
  // some). Kept, and sealed again.
  private fun adopt(answer: JSONObject) {
    val next = synchronized(lock) {
      val refresh = answer.optString("refresh_token").ifEmpty { refreshToken } ?: return
      val patterns = answer.optJSONArray("backtick_origins")
        ?.let { list -> (0 until list.length()).map { list.getString(it) } } ?: origins
      if (refresh == refreshToken && patterns == origins) return
      refreshToken = refresh
      origins = patterns
      JSONObject().put("refreshToken", refresh).put("origins", JSONArray(patterns))
    }
    val sealed = DeviceKey.seal(next.toString().toByteArray())
    preferences().edit().putString("sealed", android.util.Base64.encodeToString(sealed, 0)).apply()
  }

  private fun keep(answer: JSONObject, origin: String): String? {
    val token = answer.optString("access_token").ifEmpty { return null }
    val expires = System.currentTimeMillis() + answer.optLong("expires_in", 0) * 1000
    accessTokens[origin] = token to expires
    return token
  }

  private fun token(form: Map<String, String>): JSONObject = request("token", form)

  // A request to the authorization server, with a DPoP proof; asked for its
  // nonce, it asks again once with it.
  private fun request(path: String, form: Map<String, String>, retried: Boolean = false): JSONObject {
    val url = "$authorizationServer/$path"
    val body = FormBody.Builder().apply { form.forEach { (name, value) -> add(name, value) } }.build()
    val response = http.newCall(
      Request.Builder().url(url).post(body).header("DPoP", proof(url)).build()
    ).execute()
    response.use {
      response.header("DPoP-Nonce")?.let { next -> synchronized(lock) { nonce = next } }
      val json = runCatching { JSONObject(response.body?.string() ?: "") }.getOrDefault(JSONObject())
      if (response.code == 200) return json
      val error = json.optString("error").ifEmpty { "status ${response.code}" }
      if (error == "use_dpop_nonce" && !retried) return request(path, form, retried = true)
      throw SessionException(error)
    }
  }

  // A DPoP proof (RFC 9449) for a POST to `url`, signed by the device key.
  private fun proof(url: String): String {
    val header = JSONObject()
      .put("typ", "dpop+jwt").put("alg", "ES256").put("jwk", JSONObject(DeviceKey.publicJwk()))
    val payload = JSONObject()
      .put("htm", "POST").put("htu", url)
      .put("iat", System.currentTimeMillis() / 1000).put("jti", UUID.randomUUID().toString())
    synchronized(lock) { nonce }?.let { payload.put("nonce", it) }
    val input = listOf(header, payload)
      .joinToString(".") { DeviceKey.base64Url(it.toString().toByteArray()) }
    return input + "." + DeviceKey.base64Url(DeviceKey.sign(input.toByteArray()))
  }

  private fun preferences() = context.getSharedPreferences("backtick_session", Context.MODE_PRIVATE)

  private fun random(): String =
    DeviceKey.base64Url(ByteArray(32).also { SecureRandom().nextBytes(it) })

  private fun challenge(verifier: String): String =
    DeviceKey.base64Url(MessageDigest.getInstance("SHA-256").digest(verifier.toByteArray()))

  private fun equal(a: String, b: String): Boolean =
    MessageDigest.isEqual(a.toByteArray(), b.toByteArray())
}
