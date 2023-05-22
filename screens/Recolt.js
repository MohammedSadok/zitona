import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import BarChartView from "../components/BarChart";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
// import AddNew from "../components/addNew";
const Recolt = ({ navigation }) => {
  const data = [
    { value: 241, color: "#283618" },
    { value: 372, color: "#606C38" },
    { value: 188, color: "#DDA15E" },
    { value: 100, color: "#BC6C25" },
  ];

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: Colors.backgroundColor }}
    >
      {/* <AddNew /> */}

      <View className="mx-auto my-2">
        <BarChartView color={"#2DA779"} />
      </View>
      <View className="flex-row items-center justify-between mx-3 mb-2">
        <Text className="text-xl font-bold">Historique</Text>
        <View className="flex-row items-center justify-between space-x-2">
          <Feather name="sliders" size={24} color="black" />
          <Text className="">Sort/Filter</Text>
        </View>
      </View>
      <TouchableOpacity
        className="p-3 mx-2 mb-2 rounded-md"
        style={{ backgroundColor: "#FAF8F0" }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold">30 Kg</Text>
          <Text className="text-sm text-slate-700">Mai 22,2023</Text>
        </View>
        <Text className="text-base">
          description sur l’arrosage ...description sur l’arrosage
          ...description sur l’arrosage ...
        </Text>
      </TouchableOpacity>
    </View>
  );
};
4;

export default Recolt;
