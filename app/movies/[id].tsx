import { TMDB_CONFIG } from "@/config";
import { icons } from "@/constants/icons";
import useFetch from "@/hooks/useFetch";
import { fetchMovieDetails } from "@/services/api";
import {
  convertToHoursAndMinutes,
  formatBigNums,
  formatReleaseDate,
  getReleaseYear,
} from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

type MovieInfoProps = {
  label: string;
  value?: string | number | React.ReactNode;
};

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-6">
      <Text className="text-light-200 font-normal text-sm mb-2">{label}</Text>
      <Text className="text-light-100 font-bold text-sm leading-[1.75]">
        {value}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, isLoading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image
            source={{
              uri: `${TMDB_CONFIG.IMAGE_BASE_URL}${movie?.poster_path}`,
            }}
            className="w-full h-[500px] rounded-b-[4px]"
            resizeMode="cover"
          />
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white text-xl font-bold mb-2">
              {movie?.title}
            </Text>

            <View className="flex-row gap-2 mb-4">
              <Text className="text-light-200 text-sm">
                {getReleaseYear(movie?.release_date as string)}
              </Text>
              <Text className="text-light-200">•</Text>
              <Text className="text-light-200 text-sm">
                {convertToHoursAndMinutes(movie?.runtime as number)}
              </Text>
              {movie?.adult && (
                <>
                  <Text className="text-light-200">•</Text>
                  <Text className="text-light-200 text-sm">18+</Text>
                </>
              )}
            </View>

            <View className="flex-row justify-center items-center gap-x-1 bg-white/30 rounded-md p-2">
              <Image className="size-4" source={icons.star} />
              <Text className="text-sm text-white font-bold">
                {((movie?.vote_average as number) / 2).toFixed(1)}
                <Text className="text-light-200 font-bold">/5 </Text>
                <Text className="text-light-200 font-bold">
                  {formatBigNums(movie?.vote_count as number)}
                </Text>
              </Text>
            </View>

            <MovieInfo
              label="Overview"
              value={<Text className="text-white">{movie?.overview}</Text>}
            />
            <View className="w-full flex-row gap-16">
              <MovieInfo
                label="Release date"
                value={`${formatReleaseDate(movie?.release_date as string)} (Worldwide)`}
              />
              <MovieInfo label="Status" value={movie?.status} />
            </View>

            <MovieInfo
              label="Genres"
              value={
                <View className="flex-row flex-wrap gap-2">
                  {movie?.genres?.map((genre, index) => (
                    <Text
                      key={index}
                      className="bg-dark-100 text-white text-sm font-bold py-1.5 px-2.5 rounded"
                    >
                      {genre.name}
                    </Text>
                  ))}
                </View>
              }
            />

            <MovieInfo
              label="Countries"
              value={
                <View className="flex-row flex-wrap items-center gap-2">
                  {movie?.production_countries?.map((country, index) => (
                    <React.Fragment key={index}>
                      <Text className="text-light-100 text-sm font-bold">
                        {country.name}
                      </Text>
                      {index < movie.production_countries.length - 1 && (
                        <Text className="text-light-100">•</Text>
                      )}
                    </React.Fragment>
                  ))}
                </View>
              }
            />

            <View className="w-full flex-row gap-16">
              <MovieInfo
                label="Budget"
                value={`$${formatBigNums(movie?.budget as number)}`}
              />
              <MovieInfo
                label="Revenue"
                value={`$${formatBigNums(movie?.revenue as number)}`}
              />
            </View>

            {movie?.tagline && (
              <MovieInfo label="Tagline" value={movie?.tagline} />
            )}

            <MovieInfo
              label="Production companies"
              value={
                <View className="flex-row flex-wrap items-center gap-2">
                  {movie?.production_companies?.map((company, index) => (
                    <React.Fragment key={index}>
                      <Text className="text-light-100 text-sm font-bold">
                        {company.name}
                      </Text>
                      {index < movie.production_companies.length - 1 && (
                        <Text className="text-light-100">•</Text>
                      )}
                    </React.Fragment>
                  ))}
                </View>
              }
            />

            <Pressable
              className="w-full mt-6 flex-row flex-1 justify-center items-center py-4 bg-accent rounded"
              onPress={router.back}
            >
              <Image
                source={icons.arrow}
                tintColor="#151312"
                className="size-5 rotate-180"
              />
              <Text className="text-primary font-semibold ml-2">Go back</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
