import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import PieChart from "../components/charts/PieChart";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import AddNew from "../components/AddNew";
import MaladeItem from "../components/MaladeItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMalades } from "../redux/maladeSlice";
import { useEffect, useState } from "react";
import ModalAddMalade from "../components/modals/ModalAddMalade";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const Maladie = ({ navigation }) => {
  const data = [
    { value: 241, color: "#283618" },
    { value: 372, color: "#606C38" },
    { value: 188, color: "#DDA15E" },
    { value: 100, color: "#BC6C25" },
  ];

  const dispatch = useDispatch();
  const { malades, loading, error } = useSelector((state) => state.malades);

  const [item, setItem] = useState({
    isVisibleDelete: false,
    id: null,
    isVisibleAdd: false,
  });

  useEffect(() => {
    dispatch(fetchMalades());
  }, [dispatch]);

  const Items = ({ item }) => {
    return (
      <MaladeItem
        id={item.id}
        date={item.date}
        maladie={item.maladie}
        commentaire={item.commentaire}
      />
    );
  };
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: Colors.backgroundColor }}
    >
      <ModalAddMalade
        id={item.id}
        isVisible={item.isVisibleAdd}
        cancel={() => setItem((prev) => ({ ...prev, isVisibleAdd: false }))}
        ok={() => {
          setItem((prev) => ({ ...prev, isVisibleAdd: false }));
        }}
      />
      <AddNew
        open={() => setItem((prev) => ({ ...prev, isVisibleAdd: true, id: 0 }))}
      />
      {/* <View className="flex-row items-center justify-between p-2 mx-2">
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
      </View> */}
      <View className="flex-row items-center justify-between m-3">
        <Text className="text-xl font-bold">Historique</Text>
        <View className="flex-row items-center justify-between space-x-2">
          <Feather name="sliders" size={24} color="black" />
          <Text className="">Sort/Filter</Text>
        </View>
      </View>
      <FlatList
        data={malades}
        renderItem={Items}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Maladie;
