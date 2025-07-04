import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const TrandingRating = ({ rating }: { rating: number }) => {
  return (
    <View className="flex-row justify-center items-center gap-x-1 absolute top-1.5 -right-3.5 bg-white/30 rounded-md p-1">
      <Image className="size-2" source={icons.star} />
      <Text className="text-white font-bold text-[10px]">
        {rating.toFixed(1)}
      </Text>
    </View>
  );
};

export default TrandingRating;
