import { createClient } from "@supabase/supabase-js";
import { SUPABASE_CONFIG, TMDB_CONFIG } from "../config";

const supabase = createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);

export const updateSearchCount = async (query: string, movie: Movie) => {
  if (!query || !movie) {
    console.error("Query or movie is undefined");
    return;
  }

  try {
    const { data: existingSearches, error: selectError } = await supabase
      .from("metrics")
      .select("*")
      .eq("search_term", query)
      .eq("movie_id", movie.id);

    if (selectError) {
      console.error("Error selecting existing searches:", selectError);
      return;
    }

    if (existingSearches && existingSearches.length > 0) {
      // Update existing record
      const existingMovie = existingSearches[0];

      const { error: updateError } = await supabase
        .from("metrics")
        .update({ count: existingMovie.count + 1 })
        .eq("id", existingMovie.id);

      if (updateError) {
        console.error("Error updating search count:", updateError);
      }
    } else {
      // Insert new record
      const { error: insertError } = await supabase.from("metrics").insert({
        search_term: query,
        count: 1,
        movie_id: movie.id,
        title: movie.title,
        poster_url: `${TMDB_CONFIG.IMAGE_BASE_URL}${movie.poster_path}`,
        genre_ids: movie.genre_ids,
        vote_average: movie.vote_average,
      });

      if (insertError) {
        console.error("Error inserting new search record:", insertError);
      }
    }
  } catch (error) {
    console.error("Error getting or updating search count:", error);
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const { data: trendingMovies, error: selectError } = await supabase
      .from("metrics")
      .select("*")
      .limit(5)
      .order("count", { ascending: false });

    if (selectError) {
      console.error("Error selecting existing searches:", selectError);
      return;
    }

    return trendingMovies as TrendingMovie[];
  } catch (error) {
    console.error("Error fetching trending searches:", error);
    return;
  }
};
