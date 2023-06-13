import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const RecoltItem = ({
  id,
  date,
  quantite,
  methode,
  qualite,
  cout,
  commentaire,
  toggleModalUpdate,
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
      className="p-3 mx-2 mb-2 bg-white rounded-md"
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
        <View className="flex-row items-baseline justify-center space-x-2">
          <Text className="text-xl" style={{ fontFamily: "Mulish_700Bold" }}>
            {quantite} Kg
          </Text>
          <Text
            className="text-base text-gray-500"
            style={{ fontFamily: "Mulish_700Bold" }}
          >
            {methode}
          </Text>
        </View>
        <Text className="text-base" style={{ fontFamily: "Mulish_700Bold" }}>
          {qualite}
        </Text>
        <Text className="text-xs" style={{ fontFamily: "Mulish_400Regular" }}>
          {date}
        </Text>
      </View>
      <View className="flex-row items-baseline space-x-2">
        <Text className="text-sm" style={{ fontFamily: "Mulish_400Regular" }}>
          {commentaire}
        </Text>
        <Text className="text-xs" style={{ fontFamily: "Mulish_400Regular" }}>
          {cout} DH
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecoltItem;
