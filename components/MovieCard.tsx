import { TMDB_CONFIG } from "@/config";
import { icons } from "@/constants/icons";
import { getGenreNames } from "@/utils";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface MovieCardProps extends Movie {
  all_genres?: Genre[];
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  genre_ids,
  all_genres = [],
}: MovieCardProps) => {
  const movieGenres = getGenreNames(genre_ids, all_genres);

  return (
    <Link href={`movies/${id}`} asChild>
      <Pressable onPress={() => {}} className="w-[30%]">
        {({ pressed }) => (
          <>
            <Image
              source={{
                uri: poster_path
                  ? `${TMDB_CONFIG.IMAGE_BASE_URL}${poster_path}`
                  : "https://placehold.co/300x500.png",
              }}
              className="w-full h-52 rounded-lg"
              resizeMode="cover"
              style={{
                opacity: pressed ? 0.5 : 1,
              }}
            />
            <Text
              numberOfLines={1}
              className="text-white font-bold text-sm mt-2"
            >
              {title}
            </Text>
            <View className="flex-row justify-start items-center gap-x-1">
              <Image className="size-4" source={icons.star} />
              <Text className="text-white font-bold text-xs">
                {(vote_average / 2).toFixed(1)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              {movieGenres.length > 0 && (
                <Text
                  className="text-xs font-medium text-light-300"
                  numberOfLines={1}
                >
                  {movieGenres[0]} • Movie
                </Text>
              )}
            </View>
          </>
        )}
      </Pressable>
    </Link>
  );
};

export default MovieCard;
