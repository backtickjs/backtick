package expo.modules.backticksession

import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyInfo
import android.security.keystore.KeyProperties
import android.security.keystore.StrongBoxUnavailableException
import android.util.Base64
import java.security.KeyFactory
import java.security.KeyPairGenerator
import java.security.KeyStore
import java.security.MessageDigest
import java.security.PrivateKey
import java.security.Signature
import java.security.interfaces.ECPublicKey
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

// The phone's key: ECDSA P-256 in the Android Keystore (StrongBox when there
// is one), never exportable, never in a software keystore. It signs DPoP
// proofs. A second Keystore key, AES, seals the refresh token. Nothing, native
// or JavaScript, can read either.
object DeviceKey {
  private const val SIGNING = "backtick_device_key"
  private const val SEALING = "backtick_sealing_key"
  private val keyStore: KeyStore get() = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }

  fun loadOrCreate(): PrivateKey {
    (keyStore.getKey(SIGNING, null) as PrivateKey?)?.let { return it }
    val key = generate(strongBox = true) ?: generate(strongBox = false)!!
    val info = KeyFactory.getInstance(key.algorithm, "AndroidKeyStore")
      .getKeySpec(key, KeyInfo::class.java)
    if (info.securityLevel == KeyProperties.SECURITY_LEVEL_SOFTWARE) {
      delete()
      throw SessionException("This phone can't keep a key in hardware.")
    }
    return key
  }

  private fun generate(strongBox: Boolean): PrivateKey? = try {
    KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_EC, "AndroidKeyStore").run {
      initialize(
        KeyGenParameterSpec.Builder(SIGNING, KeyProperties.PURPOSE_SIGN)
          .setDigests(KeyProperties.DIGEST_SHA256)
          .setIsStrongBoxBacked(strongBox)
          .build()
      )
      generateKeyPair().private
    }
  } catch (e: StrongBoxUnavailableException) {
    null
  }

  fun load(): PrivateKey? = keyStore.getKey(SIGNING, null) as PrivateKey?

  fun delete() {
    keyStore.apply {
      deleteEntry(SIGNING)
      deleteEntry(SEALING)
    }
  }

  // The public key as a JWK, for the DPoP proof's header.
  fun publicJwk(): Map<String, String> {
    val key = keyStore.getCertificate(SIGNING).publicKey as ECPublicKey
    return mapOf(
      "kty" to "EC",
      "crv" to "P-256",
      "x" to base64Url(unsigned32(key.w.affineX.toByteArray())),
      "y" to base64Url(unsigned32(key.w.affineY.toByteArray())),
    )
  }

  // The key's thumbprint (RFC 7638): what `dpop_jkt` names.
  fun thumbprint(jwk: Map<String, String>): String {
    val canonical =
      """{"crv":"${jwk["crv"]}","kty":"${jwk["kty"]}","x":"${jwk["x"]}","y":"${jwk["y"]}"}"""
    return base64Url(MessageDigest.getInstance("SHA-256").digest(canonical.toByteArray()))
  }

  // An ES256 signature as JWS wants it: r and s, 32 bytes each.
  fun sign(data: ByteArray): ByteArray {
    val der = Signature.getInstance("SHA256withECDSA").run {
      initSign(load() ?: throw SessionException("No key"))
      update(data)
      sign()
    }
    return rawSignature(der)
  }

  fun seal(data: ByteArray): ByteArray {
    val cipher = Cipher.getInstance("AES/GCM/NoPadding")
    cipher.init(Cipher.ENCRYPT_MODE, sealingKey())
    return cipher.iv + cipher.doFinal(data)
  }

  fun unseal(data: ByteArray): ByteArray {
    val key = keyStore.getKey(SEALING, null) as SecretKey? ?: throw SessionException("No key")
    val cipher = Cipher.getInstance("AES/GCM/NoPadding")
    cipher.init(Cipher.DECRYPT_MODE, key, GCMParameterSpec(128, data.copyOfRange(0, 12)))
    return cipher.doFinal(data.copyOfRange(12, data.size))
  }

  private fun sealingKey(): SecretKey {
    (keyStore.getKey(SEALING, null) as SecretKey?)?.let { return it }
    return KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore").run {
      init(
        KeyGenParameterSpec.Builder(SEALING, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
          .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
          .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
          .setKeySize(256)
          .build()
      )
      generateKey()
    }
  }

  // DER's SEQUENCE { INTEGER r, INTEGER s } to r ‖ s.
  fun rawSignature(der: ByteArray): ByteArray {
    var index = 0
    fun expect(tag: Int) {
      if (index >= der.size || der[index].toInt() and 0xff != tag) throw SessionException("Bad signature")
      index++
    }
    fun length(): Int {
      val first = der[index++].toInt() and 0xff
      if (first < 0x80) return first
      val count = first and 0x7f
      if (count !in 1..2) throw SessionException("Bad signature")
      var value = 0
      repeat(count) { value = (value shl 8) or (der[index++].toInt() and 0xff) }
      return value
    }
    fun integer(): ByteArray {
      expect(0x02)
      val count = length()
      val value = der.copyOfRange(index, index + count)
      index += count
      return unsigned32(value)
    }
    expect(0x30)
    length()
    return integer() + integer()
  }

  private fun unsigned32(bytes: ByteArray): ByteArray {
    var value = bytes
    while (value.size > 32 && value[0] == 0.toByte()) value = value.copyOfRange(1, value.size)
    if (value.size > 32) throw SessionException("Bad number")
    return ByteArray(32 - value.size) + value
  }

  fun base64Url(bytes: ByteArray): String =
    Base64.encodeToString(bytes, Base64.URL_SAFE or Base64.NO_PADDING or Base64.NO_WRAP)
}

class SessionException(message: String) : Exception(message)
