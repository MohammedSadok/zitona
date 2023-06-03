import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import BarChartView from "../components/charts/BarChart";
import { Feather } from "@expo/vector-icons";
import PieChart from "../components/charts/PieChart";
import Colors from "../constants/Colors";
import AddNew from "../components/AddNew";
const Fertilisation = ({ navigation }) => {
  return (
    <View
      className="flex-1 pt-2"
      style={{ backfaceVisibility: Colors.backgroundColor }}
    >
      <AddNew />
      <View className="mx-auto">
        <BarChartView color={"#2DA779"} />
      </View>
      <View className="flex-row items-center justify-between mx-3 mb-2">
        <Text className="mt-2 text-xl font-bold">Historique</Text>
        <View className="flex-row items-center justify-between space-x-2">
          <Feather name="sliders" size={24} color="black" />
          <Text className="">Sort/Filter</Text>
        </View>
      </View>
      <ScrollView>
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
      </ScrollView>
    </View>
  );
};
4;

export default Fertilisation;
