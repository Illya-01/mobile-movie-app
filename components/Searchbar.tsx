import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface SearchbarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const Searchbar = ({ value, onChangeText, onPress }: SearchbarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        value={value}
        placeholder="Search movies..."
        placeholderTextColor="#A8B5DB"
        onPress={onPress}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default Searchbar;
