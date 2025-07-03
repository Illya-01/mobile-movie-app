import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchGenres, fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import Searchbar from "../../components/Searchbar";
import "../global.css";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    isLoading: isLoadingMovies,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const { data: all_genres } = useFetch(() => fetchGenres({ language: "en" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5 mt-14"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-4 mb-5 mx-auto" />

        {isLoadingMovies && <LoadingScreen />}
        {moviesError && <ErrorScreen error={moviesError} />}
        {!isLoadingMovies && !moviesError && (
          <View className="flex-1 mt-5">
            <Searchbar onPress={() => router.push("/search")} />
            <Text className="text-lg font-bold text-white mt-5 mb-3">
              Latest Movies
            </Text>
            <FlatList
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
              className="mt-2 pb-32"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
