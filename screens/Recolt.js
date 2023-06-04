import { View, Text, FlatList } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import AddNew from "../components/AddNew";
import BarChartView from "../components/charts/BarChart";
import RecoltItem from "../components/RecoltItem";
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
  useEffect(() => {
    dispatch(fetchRecolts());
  }, [dispatch]);
  const data = {
    labels: recolts.map((recolt) => recolt.date_recolte),
    datasets: [
      {
        data: recolts.map((recolt) => recolt.quantite_recoltee_kg),
      },
    ],
  };
  const Items = ({ item }) => {
    return (
      <RecoltItem
        id={item.id}
        date={item.date_recolte}
        quantite={item.quantite_recoltee_kg}
        methode={item.methode_recolte}
        qualite={item.qualite}
        commentaire={item.commentaire}
      />
    );
  };

  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: Colors.backgroundColor }}
    >
      <AddNew />

      <View className="mx-2 mt-2 h-1/3 rounded-xl">
        <BarChartView color={"blue"} data={data} />
      </View>
      <View className="flex-row items-center justify-between mx-3 mt-1 mb-2">
        <Text className="text-xl font-bold">Historique</Text>
        <View className="flex-row items-center justify-between space-x-2">
          <Feather name="sliders" size={24} color="black" />
          <Text className="">Sort/Filter</Text>
        </View>
      </View>
      <FlatList
        data={recolts}
        renderItem={Items}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Recolt;
