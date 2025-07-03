export const TMDB_CONFIG = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL as string,
  IMAGE_BASE_URL: process.env.EXPO_PUBLIC_IMAGE_BASE_URL as string,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_READ_ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchGenres = async ({ language = "en" }) => {
  const endpoint = language
    ? `${TMDB_CONFIG.API_BASE_URL}/genre/movie/list?language=${encodeURIComponent(language)}`
    : `${TMDB_CONFIG.API_BASE_URL}/genre/movie/list`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status}`);
  }

  const data = await response.json();
  return data.genres;
};
