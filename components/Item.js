import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image,Dimensions } from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { Entypo } from "@expo/vector-icons";
const Item = (props) => {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between w-full p-2 bg-white rounded-lg"
      onPress={props.handleClick}
      style={styles.container}
    >
      <View className="flex-row">
        <View
          className="items-center justify-center mr-2 rounded-lg"
          style={{ backgroundColor: props.color, padding: "5%" }}
        >
          <Image
            source={props.image}
            style={{ height: props.height, width: props.width }}
          />
        </View>
        <View className="justify-around">
          <Text style={{ fontFamily: "Mulish_700Bold" }} className="text-base">
            {props.title}
          </Text>
          <Text style={{ fontFamily: "Mulish_400Regular" }} className="text-xs">
            {props.text}
          </Text>
        </View>
      </View>
      <Entypo name="chevron-right" size={32} color="#130F26" />
    </TouchableOpacity>
  );
};
export default Item;
const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginVertical: Dimensions.get("window").height *0.01
  },
  
});
