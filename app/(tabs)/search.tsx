import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/Searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchGenres, fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/supabase";
import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const DELAY_TIME = 500;

  const {
    data: movies,
    isLoading: isLoadingMovies,
    error: moviesError,
    refetch: reloadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const { data: all_genres } = useFetch(() => fetchGenres({ language: "en" }));

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await reloadMovies();
      } else {
        reset();
      }
    }, DELAY_TIME);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() && movies && movies.length > 0) {
      const timeoutId = setTimeout(() => {
        updateSearchCount(searchQuery, movies[0]);
      }, DELAY_TIME);

      return () => clearTimeout(timeoutId);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView className="pt-14" showsVerticalScrollIndicator={false}>
        <View className="mx-5">
          <Image source={icons.logo} className="w-12 h-10 mt-4 mb-2 mx-auto" />
          <View className="mt-4 mb-5">
            <Searchbar
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            />
          </View>

          {isLoadingMovies && <LoadingScreen />}
          {moviesError && <ErrorScreen error={moviesError} />}

          {!isLoadingMovies &&
            !moviesError &&
            searchQuery.trim() &&
            movies?.length > 0 && (
              <Text className="text-white text-xl font-bold mb-5">
                Search results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          <FlatList
            className="pb-32"
            data={movies}
            renderItem={({ item }) => (
              <MovieCard {...item} all_genres={all_genres} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 18,
              marginBottom: 24,
            }}
            scrollEnabled={false}
            ListEmptyComponent={
              !isLoadingMovies && !moviesError ? (
                <View className="mt-5">
                  <Text className="text-center text-gray-500">
                    {searchQuery.trim()
                      ? "No movies found"
                      : "Search for movies"}
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
