import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Icon,{Icons} from "../../components/general/Icons";
import Colors from "../../constants/Colors";
import MaladeItem from "../../components/MaladeItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteMalade, fetchMalades,sortByDate,sortByMaladie } from "../../redux/maladeSlice";
import { useEffect, useState } from "react";

import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const PortfolioScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { malades, loading, error } = useSelector((state) => state.malades);
  const [visible, setVisible] = useState(false);


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
        // toggleModalUpdate={() =>
        //   setItem((prev) => ({ ...prev, isVisibleAdd: true, id: item.id }))
        // }
        navigation={navigation}
      />
    );
  };
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: Colors.backgroundColor }}
    >
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

        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity
              onPress={() => setVisible(true)}
              className="flex-row items-center justify-between"
            >
              <Text
                className="mr-2 text-xl"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                Trier
              </Text>
              <Feather name="sliders" size={24} color="black" />
            </TouchableOpacity>
          }
          onRequestClose={() => setVisible(false)}
          className="w-24"
        >
          <MenuItem
            onPress={() => {
              dispatch(sortByDate());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Date</Text>
            </View>
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onPress={() => {
              dispatch(sortByMaladie());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Maladie</Text>
            </View>
          </MenuItem>
        </Menu>
      </View>
      <FlatList
        data={malades}
        renderItem={Items}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default PortfolioScreen;
