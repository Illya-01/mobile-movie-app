export const TMDB_CONFIG = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL as string,
  IMAGE_BASE_URL: process.env.EXPO_PUBLIC_IMAGE_BASE_URL as string,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_READ_ACCESS_TOKEN}`,
  },
};

export const SUPABASE_CONFIG = {
  URL: process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
};
