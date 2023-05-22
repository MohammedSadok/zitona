import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import BarChartView from "../components/BarChart";
import { Feather } from "@expo/vector-icons";
import PieChart from "../components/charts/PieChart";
import Colors from "../constants/Colors";
// import AddNew from "../components/addNew";
import { ScrollView } from "react-native-gesture-handler";
const Fertilisation = ({ navigation }) => {
  const data = [
    { value: 241, color: "#264653" },
    { value: 372, color: "#2a9d8f" },
    { value: 188, color: "#e9c46a" },
    { value: 100, color: "#f4a261" },
    { value: 80, color: "#e76f51" },
    { value: 80, color: "#fefae0" },
    { value: 80, color: "#606c38" },
  ];

  return (
    <View
      className="flex-1"
      style={{ backfaceVisibility: Colors.backgroundColor }}
    >
      {/* <AddNew /> */}
      <ScrollView horizontal>
        <BarChartView color={"#2DA779"} />
        <View className="flex-row items-center justify-between p-2 mx-2 bg-white rounded-lg 6">
            <PieChart data={data} />
          <View className="">
            <View className="flex-row items-center space-x-7">
              <View className="w-5 h-5"></View>
              <Text className="text-gray-600">Label</Text>
              <Text className="text-gray-600">Value</Text>
              <Text className="text-gray-600">%</Text>
            </View>
            <View>
              {data.map((item, index) => (
                <View
                  className="flex-row items-center p-1 space-x-6"
                  key={index}
                >
                  <View
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></View>
                  <Text className="text-gray-600">Label 1</Text>
                  <Text className="font-bold">{item.value}</Text>
                  <Text className="font-bold">22%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
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
