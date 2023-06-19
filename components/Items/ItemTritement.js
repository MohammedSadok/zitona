import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ItemTritement = ({
  id,
  typeTraitement,
  description,
  date,
  toggleModalUpdate,
  cout,
}) => {
  return (
    <TouchableOpacity
      className="p-2.5 pb-1 mx-2 mb-2 bg-white rounded-md"
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
        <Text style={{ fontFamily: "Mulish_700Bold" }} className="text-lg">
          {typeTraitement}
        </Text>
        <Text
          style={{ fontFamily: "Mulish_400Regular" }}
          className="text-sm text-red-500"
        >
          {cout} Dh
        </Text>
      </View>
      <Text style={{ fontFamily: "Mulish_400Regular" }}>{description}</Text>
      <Text
        style={{ fontFamily: "Mulish_400Regular" }}
        className="text-xs text-right text-gray-400"
      >
        {date}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemTritement;
