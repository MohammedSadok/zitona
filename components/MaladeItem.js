import { View, Text, TouchableOpacity } from "react-native";
import Icon, { Icons } from "./general/Icons";
import React from "react";

const MaladeItem = ({
  id,
  date,
  maladie,
  commentaire,
  navigation,
  toggleModalUpdate,
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
      onPress={() =>
        navigation.navigate("Traitement", {
          id: id,
        })
      }
      onLongPress={toggleModalUpdate}
    >
      <View className="flex-row items-center">
        <View className="flex-row items-center space-x-2">
          <Icon
            type={Icons.FontAwesome5}
            size={24}
            color={"#76B39C"}
            name={"tree"}
          />
          <Text className="text-lg font-bold text-right">{maladie}</Text>
        </View>
      </View>
      <Text className="text-base">{commentaire}</Text>
      <Text className="text-xs text-right text-gray-500">{date}</Text>
    </TouchableOpacity>
  );
};

export default MaladeItem;
