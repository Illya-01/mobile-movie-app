import { images } from "@/constants/images";
import { getGenreNames } from "@/utils";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface trendingMovieCardProps {
  movie: TrendingMovie;
  index: number;
  all_genres?: Genre[];
}

const trendingMovieCard = ({
  movie: { id, movie_id, count, title, poster_url, vote_average, genre_ids },
  index,
  all_genres = [],
}: trendingMovieCardProps) => {
  const trendingMovieGenres = getGenreNames(genre_ids, all_genres);

  return (
    <Link href={`movies/${id}`} asChild>
      <Pressable onPress={() => {}} className="w-32 relative pl-5">
        {({ pressed }) => (
          <>
            <Image
              source={{ uri: poster_url }}
              className="w-32 h-52 rounded-lg"
              resizeMode="cover"
              style={{
                opacity: pressed ? 0.5 : 1,
              }}
            />
            <View className="absolute bottom-8 -left-2 px-2 py-1 rounded-full">
              <MaskedView
                maskElement={
                  <Text className="font-bold text-white text-6xl">
                    {index + 1}
                  </Text>
                }
              >
                <Image
                  source={images.rankingGradient}
                  className="size-14"
                  resizeMode="cover"
                />
              </MaskedView>
            </View>
            <Text
              numberOfLines={1}
              className="text-white font-bold text-sm mt-2"
            >
              {title}
            </Text>
            <View className="flex-row justify-between items-center">
              {trendingMovieGenres.length > 0 && (
                <Text
                  className="text-xs font-medium text-light-300"
                  numberOfLines={1}
                >
                  {trendingMovieGenres[0]} • Movie
                </Text>
              )}
            </View>
          </>
        )}
      </Pressable>
    </Link>
  );
};

export default trendingMovieCard;
