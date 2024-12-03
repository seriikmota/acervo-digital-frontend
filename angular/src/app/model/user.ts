export interface  User {
  id: number;
  name: string;
  email?: string;
  userGroup?: string;
  accessToken: string;
  password?: string;
  login: string;
  refreshToken: string;
  expiresIn: number;
  roles: string[];
}
