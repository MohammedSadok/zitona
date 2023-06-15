import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const FertilisationItem = ({
  id,
  quantite,
  typeDengrais,
  date,
  commentaire,
  cout,
  toggleModalUpdate
}) => {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      className="p-2 pb-1 mx-2 mb-2 bg-white rounded-md"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
      }}
      onLongPress={toggleModalUpdate}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="text-lg font-bold"
          style={{ fontFamily: "Mulish_700Bold" }}
        >
          {typeDengrais}
        </Text>
        <Text
          className="text-base font-bold text-red-400"
          style={{ fontFamily: "Mulish_400Regular" }}
        >
          {cout} Dh
        </Text>
      </View>
      <Text className="overflow-scroll text-base">{commentaire}</Text>

      <View className="flex-row items-center justify-between">
        <Text
          className="text-sm text-green-500"
          style={{ fontFamily: "Mulish_700Bold" }}
        >
          {quantite} kg
        </Text>

        <Text
          className="text-xs text-gray-500"
          style={{ fontFamily: "Mulish_400Regular" }}
        >
          {date}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FertilisationItem;
