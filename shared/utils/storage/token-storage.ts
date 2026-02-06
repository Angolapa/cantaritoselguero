const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

class TokenManager {
  private static instance: TokenManager;

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {
    if (typeof window !== "undefined") {
      this.accessToken =
        localStorage.getItem(ACCESS_TOKEN_KEY);
      this.refreshToken =
        localStorage.getItem(REFRESH_TOKEN_KEY);
    }
  }

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  setTokens(
    accessToken: string,
    refreshToken: string
  ): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }
}

export const tokenManager = TokenManager.getInstance();
