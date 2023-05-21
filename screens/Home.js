import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import CalendarView from "../components/Calendar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Home = () => {
  const navigation = useNavigation();
  const navigateToProfile = () => {
    navigation.navigate("Arrosage");
  };
  return (
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
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
      </View>
      <CalendarView />
      <Text className="mx-3 my-2 text-xl font-bold">Tâches</Text>
      <TouchableOpacity
        className="flex-row items-center justify-between px-3 py-2 mx-3 my-1 rounded-lg bg-stone-100"
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
      <TouchableOpacity className="flex-row items-center justify-between px-3 py-2 mx-3 my-1 rounded-lg bg-stone-100">
        <View className="">
          <Text className="text-lg font-bold">Arrosage</Text>
          <Text className="">
            description sur l’arrosage ...description sur l’arrosage
            ...description sur l’arrosage ...
          </Text>
        </View>
        <AntDesign name="closecircleo" size={32} color="#DD1D1D" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
export default Home;
