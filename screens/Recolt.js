import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import AddNew from "../components/AddNew";
import BarChartView from "../components/charts/BarChart";
import { RecoltStore } from "../redux/recolt";
import { Provider } from "react-redux";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecolts } from "../redux/recoltSlice";
import { useEffect, useState } from "react";
const Recolt = ({ navigation }) => {
  const dispatch = useDispatch();

  const { recolts, loading, error } = useSelector((state) => state.recolts);
  console.log("=>  file: Recolt.js:22  Recolt  recolts:", recolts);
  useEffect(() => {
    dispatch(fetchRecolts());
  }, [dispatch]);
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={RecoltStore}>
      <View
        className="flex-1 bg-white"
        style={{ backgroundColor: Colors.backgroundColor }}
      >
        <AddNew />

        <View className="mx-2 mt-2 h-1/3 rounded-xl">
          <BarChartView color={"blue"} />
        </View>
        <View className="flex-row items-center justify-between mx-3 mt-1 mb-2">
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
    </Provider>
  );
};
4;

export default Recolt;
