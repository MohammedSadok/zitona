import { View, Text, TouchableOpacity } from "react-native";
import Icon, { Icons } from "./general/Icons";
import React from "react";

const MaladeItem = ({ id, date, maladie, commentaire }) => {
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
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Text className="text-2xl font-bold">{id}</Text>
          <Icon
            type={Icons.FontAwesome5}
            size={24}
            color={"#76B39C"}
            name={"tree"}
          />
          <Text className="text-lg font-bold">{maladie}</Text>
        </View>
        <Text className="text-sm text-slate-700">{date}</Text>
      </View>
      <Text className="text-base">{commentaire}</Text>
    </TouchableOpacity>
  );
};

export default MaladeItem;
