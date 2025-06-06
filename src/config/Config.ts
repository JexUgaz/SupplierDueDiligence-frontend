const { VITE_BACKEND_API_URL: backendApiUrl = "no-endpoint" } = import.meta.env;

export class Config {
  static readonly backendApiUrl: string = backendApiUrl;
}
