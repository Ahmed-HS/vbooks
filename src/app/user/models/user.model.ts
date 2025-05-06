export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  accessToken: string;
  expiresAt: number;
}
