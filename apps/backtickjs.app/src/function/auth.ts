// Who's calling: a host sends the user's Supabase access token, which the
// user's sign-in and consent gave it, and Supabase's public keys check it.
import {
  type AuthInfo,
  type OAuthTokenVerifier,
  OAuthError,
  OAuthErrorCode,
} from "@modelcontextprotocol/server";
import { createRemoteJWKSet, jwtVerify } from "jose";

const issuer = `${process.env.SUPABASE_URL}/auth/v1`;
const keys = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));

export const verifier: OAuthTokenVerifier = {
  async verifyAccessToken(token): Promise<AuthInfo> {
    try {
      const { payload } = await jwtVerify(token, keys, { issuer });
      return {
        token,
        clientId: String(payload.client_id ?? ""),
        scopes: String(payload.scope ?? "")
          .split(" ")
          .filter(Boolean),
        expiresAt: payload.exp,
        extra: { owner: payload.sub },
      };
    } catch (error) {
      // Why, never the token: a host whose tokens are all refused shows up here.
      console.log(
        "Refused a token:",
        error instanceof Error ? error.message : error,
      );
      throw new OAuthError(
        OAuthErrorCode.InvalidToken,
        error instanceof Error ? error.message : "Invalid token.",
      );
    }
  },
};

// The signed-in user's id. The handler only runs with a verified token.
export function ownerOf(auth: AuthInfo | undefined): string {
  const owner = auth?.extra?.owner;
  if (typeof owner !== "string") {
    throw new Error("A tool ran without a signed-in user.");
  }
  return owner;
}
