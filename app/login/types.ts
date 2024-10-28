export interface LoginCheckResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
}

export interface RefreshResponse {
  accessToken: string;
  role: string;
}
