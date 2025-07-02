import { API_BASE_URL, API_KEY, API_READ_ACCESS_TOKEN } from "@env";

export const TMDB_CONFIG = {
  API_BASE_URL: API_BASE_URL as string,
  API_KEY: API_KEY as string,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
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
