import {
  AuthenticationResult,
  AuthenticationService,
  JWTStrategy,
} from "@feathersjs/authentication";
import jwksClient from "jwks-rsa";
import jwt, { GetPublicKeyOrSecret } from "jsonwebtoken";

import type { Application } from "./declarations";
import { Params } from "@feathersjs/feathers";
import { SwaggerConfigs } from "swagger-ui-dist";

const client = jwksClient({
  cache: true,
  jwksUri: process.env.AUTH_KEY_URL || "",
});

const getKey: GetPublicKeyOrSecret = (header, callback) => {
  client.getSigningKey(header.kid, (error, key) => {
    const signingKey = key?.getPublicKey() || "";
    callback(error, signingKey);
  });
};

class StatelessJwtService extends AuthenticationService {
  docs: SwaggerConfigs = {};
  async verifyAccessToken(token: string) {
    // Don't check signatures when testing
    if (process.env.NODE_ENV === "test")
      return Promise.resolve(jwt.decode(token));

    return new Promise((resolve, reject) => {
      jwt.verify(token, getKey, (error, decodedJwt) => {
        if (error) reject(error);
        resolve(decodedJwt);
      });
    });
  }
  async getPayload(authResult: AuthenticationResult, params: Params) {
    const payload = await super.getPayload(authResult, params);
    payload.user = {
      email: authResult["https://sikaeducation.com/email"],
      role: authResult["https://sikaeducation.com/role"],
    };

    return payload;
  }
}

declare module "./declarations" {
  interface ServiceTypes {
    authentication: StatelessJwtService;
  }
}

export const authentication = (app: Application) => {
  const authentication = new StatelessJwtService(app);

  authentication.register("jwt", new JWTStrategy());

  app.use("authentication", authentication);
};

export type AuthenticatedHookContext = {
  params: {
    authentication: {
      payload: {
        "https://sikaeducation.com/role": "learner" | "coach";
      };
    };
    user?: {
      role: "learner" | "coach";
    };
  };
};

export function isAuthenticated(
  context: AuthenticatedHookContext,
): context is AuthenticatedHookContext {
  return !!context.params.authentication.payload[
    "https://sikaeducation.com/role"
  ];
}
