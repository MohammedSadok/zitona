import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import Icon, { Icons } from "../../components/general/Icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
const NotificationScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <View
      style={{ backgroundColor: Colors.backgroundColor }}
      className="h-screen"
    >
      <View className="flex-row items-center justify-between p-2 px-3">
        <View className="flex-row items-center justify-center">
          <Text
            style={{ fontFamily: "Mulish_700Bold" }}
            className="mr-2 text-xl"
          >
            Notification
          </Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.primary }}
            thumbColor={isEnabled ? Colors.primary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
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
              <Icon
                type={Icons.Feather}
                size={24}
                color={"black"}
                name={"sliders"}
              />
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
      <View className="p-2 mx-2 bg-white rounded-lg" style={styles.container}>
        <Text style={{ fontFamily: "Mulish_700Bold" }} className="mb-1 text-lg">
          Object
        </Text>
        <Text
          style={{ fontFamily: "Mulish_400Regular" }}
          className="mb-0.5 text-sm"
        >
          DescriptionDescriptionDescriptionDescriptionDescription...{" "}
        </Text>
        <Text
          className="text-xs text-right text-gray-400"
          style={{ fontFamily: "Mulish_400Regular" }}
        >
          12-5-2022
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});
export default NotificationScreen;
