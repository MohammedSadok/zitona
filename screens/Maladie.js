import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import PieChart from "../components/charts/PieChart";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import AddNew from "../components/AddNew";
const Maladie = ({ navigation }) => {
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
      <AddNew />
      <View className="flex-row items-center justify-between p-2 mx-2">
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
              <View className="flex-row items-center p-1 space-x-6" key={index}>
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
      <View className="flex-row items-center justify-between mx-3 mb-2">
        <Text className="text-xl font-bold">Historique</Text>
        <View className="flex-row items-center justify-between space-x-2">
          <Feather name="sliders" size={24} color="black" />
          <Text className="">Sort/Filter</Text>
        </View>
      </View>
      <ScrollView>
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
              <Text className="text-2xl font-bold">5</Text>
              <FontAwesome5 name="tree" size={24} color="#76B39C" />
              <Text className="text-lg font-bold">Maladie</Text>
            </View>
            <Text className="text-sm text-slate-700">Mai 22,2023</Text>
          </View>
          <Text className="text-base">
            description sur l’arrosage ...description sur l’arrosage
            ...description sur l’arrosage ...
          </Text>
        </TouchableOpacity>
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
              <Text className="text-2xl font-bold">5</Text>
              <FontAwesome5 name="tree" size={24} color="#76B39C" />
              <Text className="text-lg font-bold">Maladie</Text>
            </View>
            <Text className="text-sm text-slate-700">Mai 22,2023</Text>
          </View>
          <Text className="text-base">
            description sur l’arrosage ...description sur l’arrosage
            ...description sur l’arrosage ...
          </Text>
        </TouchableOpacity>
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
              <Text className="text-2xl font-bold">5</Text>
              <FontAwesome5 name="tree" size={24} color="#76B39C" />
              <Text className="text-lg font-bold">Maladie</Text>
            </View>
            <Text className="text-sm text-slate-700">Mai 22,2023</Text>
          </View>
          <Text className="text-base">
            description sur l’arrosage ...description sur l’arrosage
            ...description sur l’arrosage ...
          </Text>
        </TouchableOpacity>
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
              <Text className="text-2xl font-bold">5</Text>
              <FontAwesome5 name="tree" size={24} color="#76B39C" />
              <Text className="text-lg font-bold">Maladie</Text>
            </View>
            <Text className="text-sm text-slate-700">Mai 22,2023</Text>
          </View>
          <Text className="text-base">
            description sur l’arrosage ...description sur l’arrosage
            ...description sur l’arrosage ...
          </Text>
        </TouchableOpacity>
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
              <Text className="text-2xl font-bold">5</Text>
              <FontAwesome5 name="tree" size={24} color="#76B39C" />
              <Text className="text-lg font-bold">Maladie</Text>
            </View>
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

export default Maladie;
