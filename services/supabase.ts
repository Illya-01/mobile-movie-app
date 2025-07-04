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

    console.log("Existing searches:", existingSearches);

    if (existingSearches && existingSearches.length > 0) {
      // Update existing record
      const existingMovie = existingSearches[0];
      console.log("Updating existing movie:", existingMovie);

      const { error: updateError } = await supabase
        .from("metrics")
        .update({ count: existingMovie.count + 1 })
        .eq("id", existingMovie.id);

      if (updateError) {
        console.error("Error updating search count:", updateError);
      } else {
        console.log(
          "Successfully updated search count to:",
          existingMovie.count + 1
        );
      }
    } else {
      // Insert new record
      console.log("Inserting new search record for:", query, movie.title);

      const { error: insertError } = await supabase.from("metrics").insert({
        search_term: query,
        count: 1,
        movie_id: movie.id,
        movie_title: movie.title,
        poster_url: `${TMDB_CONFIG.IMAGE_BASE_URL}${movie.poster_path}`,
      });

      if (insertError) {
        console.error("Error inserting new search record:", insertError);
      } else {
        console.log("Successfully inserted new search record");
      }
    }
  } catch (error) {
    console.error("Error getting or updating search count:", error);
  }
};
