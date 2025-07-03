import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchGenres, fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Searchbar from "../../components/Searchbar";
import "../global.css";

const LoadingScreen = () => (
  <ActivityIndicator
    size="large"
    color="#0000FF"
    className="mt-10 self-center"
  />
);

const ErrorScreen = ({ error }: { error: Error }) => (
  <View>
    <Text className="text-white">Error: {error.message}</Text>
  </View>
);

const MoviesContent = ({
  router,
  movies,
  all_genres,
}: {
  router: any;
  movies: Movie[];
  all_genres?: Genre[];
}) => (
  <SafeAreaView className="flex-1 mt-5">
    <Searchbar onPress={() => router.push("/search")} />
    <Text className="text-lg font-bold text-white mt-5 mb-3">
      Latest Movies
    </Text>
    <FlatList
      data={movies}
      renderItem={({ item }) => <MovieCard {...item} all_genres={all_genres} />}
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
  </SafeAreaView>
);

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    isLoading: isLoadingMovies,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const { data: all_genres } = useFetch(() => fetchGenres({ language: "en" }));

  const renderContent = () => {
    if (isLoadingMovies) return <LoadingScreen />;
    if (moviesError) return <ErrorScreen error={moviesError} />;
    return (
      <MoviesContent router={router} movies={movies} all_genres={all_genres} />
    );
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {renderContent()}
      </ScrollView>
    </View>
  );
}
