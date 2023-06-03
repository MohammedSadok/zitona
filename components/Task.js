import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon, { Icons } from "../components/general/Icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const Task = ({ done }) => {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between px-3 py-2 pt-0 mx-2 my-1 bg-white rounded-lg"
      style={styles.task}
      // onPress={navigateToProfile}
    >
      <View className="">
        <Text
          style={{ fontFamily: "Mulish_700Bold" }}
          className="text-lg"
        >
          Arrosage
        </Text>
        <Text style={{ fontFamily: "Mulish_400Regular" }}>
          description sur l’arrosage ...description sur l’arrosage
          ...description sur l’arrosage ...
        </Text>
      </View>
      {done ? (
        <Icon
          color={"#169823"}
          name={"checkcircleo"}
          type={Icons.AntDesign}
          size={32}
        />
      ) : (
        <Icon
          color={"#DD1D1D"}
          name={"closecircleo"}
          type={Icons.AntDesign}
          size={32}
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  task: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});
export default Task;
