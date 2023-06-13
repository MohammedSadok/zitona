import { View, Text, Image } from "react-native";
import React from "react";

const ItemTraitement = ({
  id,
  description,
  nomProduit,
  dose,
  frequence,
  duree,
}) => {
  return (
    <View
      className="p-2.5 pb-1 pl-0 mx-2 mb-2 bg-white rounded-md"
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
    >
      <View className="flex-row items-center">
        <Image
          source={require("../assets/FongiStop.jpg")}
          resizeMode="cover"
          className="w-1/4 h-24"
        />
        <View className="w-3/4">
          <Text className="text-lg font-bold">{nomProduit}</Text>
          <Text className="overflow-scroll text-base">{description}</Text>
          <Text className="text-sm">Dose : {dose}</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-bold text-gray-500">
              Fréquence : {frequence}
            </Text>
            <Text className="text-xs text-gray-500">{duree}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemTraitement;
