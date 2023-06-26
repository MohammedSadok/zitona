import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon, { Icons } from "../general/Icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import Colors from "../../constants/Colors";
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
  const quality = {
    color: "",
    name: "",
  };
  if (qualite === "BONNE") {
    quality.color = Colors.green;
    quality.name = "smileo";
  } else if (qualite === "MOYENNE") {
    quality.color = Colors.gray;
    quality.name = "meh";
  } else {
    quality.color = Colors.red;
    quality.name = "frowno";
  }
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
        <View className="flex-row items-center justify-center space-x-2">
          <Text className="text-xl" style={{ fontFamily: "Mulish_700Bold" }}>
            {quantite} Kg
          </Text>
          <Text
            className="text-base text-gray-500"
            style={{ fontFamily: "Mulish_700Bold" }}
          >
            {methode}
          </Text>
          <Icon
            type={Icons.AntDesign}
            name={quality.name}
            color={quality.color}
            size={28}
          />
        </View>
        <Text
          style={{ fontFamily: "Mulish_400Regular",color:Colors.blue }}
          className="text-sm text-red-500"
        >
          {cout} Dh
        </Text>
      </View>
      <View className="flex-row items-baseline space-x-2">
        <Text className="text-sm" style={{ fontFamily: "Mulish_400Regular" }}>
          {commentaire}
        </Text>
      </View>
      <Text
        className="text-xs text-right text-gray-400"
        style={{ fontFamily: "Mulish_400Regular" }}
      >
        {date}
      </Text>
    </TouchableOpacity>
  );
};

export default RecoltItem;
