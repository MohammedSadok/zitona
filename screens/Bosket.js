import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigate from "../components/Navigate";
import Colors from "../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BarChartView from "../components/BarChart";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetRefProps } from "../components/BottomSheet";

const slides = {
  fertilisation: require("../assets/navigation/fertiliser.png"),
  arrosage: require("../assets/navigation/arrosage.png"),
  maladie: require("../assets/navigation/maladie.png"),
  recolt: require("../assets/navigation/recolt.png"),
};
const Bosket = ({ navigation }) => {
  const ref = useRef(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(-500);
    } else {
      ref?.current?.scrollTo(-500);
    }
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View className="flex-row items-center justify-between h-20 p-2 px-4">
          <View className="flex-row items-center space-x-3">
            <Image
              className="w-16"
              resizeMode="center"
              source={require("../assets/profile/user.png")}
            />
            <View>
              <Text>Sadok</Text>
              <Text>Mohammed</Text>
            </View>
          </View>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.black}
          />
        </View>
        <Text className="ml-3 font-bold underline ">Tools</Text>
        <View
          horizontal
          className="flex-row items-center justify-around py-2"
          style={styles.scrollable}
        >
          <Navigate
            title="Fertilisation"
            navigation={navigation}
            img={slides.fertilisation}
          />
          <Navigate
            title="Arrosage"
            navigation={navigation}
            img={slides.arrosage}
          />
          <Navigate
            title="Maladie"
            navigation={navigation}
            img={slides.maladie}
          />
          <Navigate
            title="Recolt"
            navigation={navigation}
            img={slides.recolt}
          />
        </View>
        <View className="mx-2">
          <BarChartView color={Colors.green}/>
        </View>
        <View className="flex-col justify-between p-3 m-2 bg-white rounded-md h-52">
          <Text className="text-lg font-bold">About</Text>
          <Text className="">
            des information generale sur le bosquet localisation ...des
            information generale sur le bosquet localisation ...
          </Text>
          <View className="flex-row items-center justify-between p-2 m-3">
            <View className="flex-col items-center justify-between space-y-1">
              <FontAwesome5 name="tree" size={30} color="#606C38" />
              <Text className="">arbre d'olivier</Text>
              <Text className="">15</Text>
            </View>
            <View className="flex-col items-center justify-between space-y-1">
              <Ionicons name="water-sharp" size={30} color="#228BB8" />
              <Text className="">arrosage</Text>
              <Text className="">3 m3</Text>
            </View>
            <View className="flex-col items-center justify-between space-y-1">
              <MaterialCommunityIcons
                name="fruit-cherries"
                size={30}
                color="#7A5E7E"
              />
              <Text className="">la récolte</Text>
              <Text className="">100 kg</Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center justify-between mx-5 mt-5">
          <TouchableOpacity
            className="px-12 py-3 rounded-lg bg-slate-200"
            style={{ backgroundColor: "#76B39C" }}
            onPress={onPress}
          >
            <Text className="text-lg font-bold text-white">Ajouter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-12 py-3 rounded-lg bg-slate-200"
            style={{ backgroundColor: "#7A5E7E" }}
            onPress={onPress}
          >
            <Text className="text-lg font-bold text-white">Modifier</Text>
          </TouchableOpacity>
        </View>
        <BottomSheet ref={ref}>
          <View style={{ flex: 1, backgroundColor: "lightblue" }} >
            <Text>Hello</Text>
          </View>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Bosket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: "white",
    opacity: 0.6,
  },
});