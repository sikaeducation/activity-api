import {
  AuthenticationResult,
  AuthenticationService,
  JWTStrategy,
} from "@feathersjs/authentication";
import jwksClient from "jwks-rsa";
import jwt, { GetPublicKeyOrSecret } from "jsonwebtoken";

import type { Application } from "./declarations";
import { SwaggerConfigs } from "swagger-ui-dist";
import { Params } from "@feathersjs/feathers";

export type AuthPayload = {
  roles: string[];
};

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
      jwt.verify(
        token,
        getKey,
        { audience: process.env.AUTH_AUDIENCE },
        (error, decodedJwt) => {
          if (error) reject(error);
          resolve(decodedJwt);
        },
      );
    });
  }

  async getPayload(authResult: AuthenticationResult, params: Params) {
    const payload = await super.getPayload(authResult, params);
    payload.roles = authResult?.user["https://sikaeducation.com/roles"];
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
