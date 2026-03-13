const getApiBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (url) {
    return url;
  }

  return "http://localhost:3000/api";
};

export const API_BASE_URL = getApiBaseUrl();
