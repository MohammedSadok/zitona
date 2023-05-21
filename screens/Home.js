import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import CalendarView from "../components/Calendar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Home = () => {
  const navigation = useNavigation();
  const navigateToProfile = () => {
    navigation.navigate("Arrosage");
  };
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

        <ScrollView>
          <CalendarView />
          <View className="flex-row items-center justify-between mx-4 my-1">
            <Text className="text-xl font-bold">Tâches</Text>
            <FontAwesome5 name="tasks" size={24} color="black" />
          </View>
          <TouchableOpacity
            className="flex-row items-center justify-between px-3 py-2 mx-3 my-1 bg-white rounded-lg"
            style={styles.task}
            onPress={navigateToProfile}
          >
            <View className="">
              <Text className="text-lg font-bold">Arrosage</Text>
              <Text className="">
                description sur l’arrosage ...description sur l’arrosage
                ...description sur l’arrosage ...
              </Text>
            </View>
            <AntDesign name="checkcircleo" size={32} color="#169823" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-between px-3 py-2 mx-3 my-1 bg-white rounded-lg"
            style={styles.task}
          >
            <View className="">
              <Text className="text-lg font-bold">Arrosage</Text>
              <Text className="">
                description sur l’arrosage ...description sur l’arrosage
                ...description sur l’arrosage ...
              </Text>
            </View>
            <AntDesign name="closecircleo" size={32} color="#DD1D1D" />
          </TouchableOpacity>
          {/* <View style={{ height: 300 }}></View> */}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  task: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
export default Home;
