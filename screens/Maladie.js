import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PieChart from "../components/charts/PieChart";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
const Maladie = ({ navigation }) => {
  const data = [
    { value: 241, color: "#283618" },
    { value: 372, color: "#606C38" },
    { value: 188, color: "#DDA15E" },
    { value: 100, color: "#BC6C25" },
  ];

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <TouchableOpacity
        style={{ backgroundColor: "#7A5E7E" }}
        onPress={() => navigation.goBack()}
        className="absolute p-1 rounded-md top-8 left-5 w-min"
      >
        <AntDesign name="arrowleft" size={36} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "#7A5E7E" }}
        // onPress={() => navigation.goBack()}
        className="absolute p-3 rounded-full bottom-10 right-10 w-min"
      >
        <Entypo name="plus" size={36} color="white" />
      </TouchableOpacity>
      <Text className="my-2 text-2xl font-bold text-center">Maladie</Text>
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
      <TouchableOpacity className="p-3 mx-2 mb-2 rounded-md" style={{backgroundColor: '#FAF8F0'}}>
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
      <TouchableOpacity className="p-3 mx-2 mb-2 rounded-md" style={{backgroundColor: '#FAF8F0'}}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Text className="text-2xl font-bold">5</Text>
            <FontAwesome5 name="tree" size={24} color="#DDA15E" />
            <Text className="text-lg font-bold">Maladie</Text>
          </View>
          <Text className="text-sm text-slate-700">Mai 22,2023</Text>
        </View>
        <Text className="text-base">
          description sur l’arrosage ...description sur l’arrosage
          ...description sur l’arrosage ...
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-3 mx-2 mb-2 rounded-md" style={{backgroundColor: '#FAF8F0'}}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Text className="text-2xl font-bold">5</Text>
            <FontAwesome5 name="tree" size={24} color="#283618" />
            <Text className="text-lg font-bold">Maladie</Text>
          </View>
          <Text className="text-sm text-slate-700">Mai 22,2023</Text>
        </View>
        <Text className="text-base">
          description sur l’arrosage ...description sur l’arrosage
          ...description sur l’arrosage ...
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Maladie;
