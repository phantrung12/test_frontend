export interface ILogin {
  name: string;
  password: string;
}

export interface IAuthInfo {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
}

export interface IAuth {
  idToken: {
    jwtToken: string;
    payload: IAuthInfo;
  };
  refreshToken: {
    token: string;
  };
  accessToken: {
    jwtToken: string;
    payload: IAuth;
  };
}
