import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const TrandingRating = ({
  rating = 0,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md";
}) => {
  const sizeConfig = {
    sm: {
      iconClass: "size-2.5",
      textClass: "text-[10px] text-white font-bold",
    },
    md: {
      iconClass: "size-3",
      textClass: "text-xs text-white font-bold",
    },
  };

  const config = sizeConfig[size];

  return (
    <View className="flex-row justify-center items-center gap-x-1">
      <Image className={config.iconClass} source={icons.star} />
      <Text className={config.textClass}>{rating.toFixed(1)}</Text>
    </View>
  );
};

export default TrandingRating;
