export interface CredencialDto {

  accessToken: string;

  email: string;

  expiresIn: number;

  id: number;

  login: string;

  name: string;

  refreshExpiresIn: number;

  refreshToken: string;

  roles: Array<string>;

  statusAtivo: boolean;
}
