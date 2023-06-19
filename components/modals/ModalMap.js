import { View, Text, Modal, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import Icon, { Icons } from "../general/Icons";
import Colors from "../../constants/Colors";

const ModalPopUp = ({ isVisible, children, title, changeVisibility }) => {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    isVisible && (
      <View
        className="absolute z-20 justify-center bg-black opacity-50"
        style={{ width: width, height: height }}
      >
        <Modal animationType={"fade"} transparent={true} visible={isVisible}>
          <View className="p-2 m-auto bg-white rounded-xl">
            <View className="flex-row items-center justify-between mt-1 mb-2">
              <Text
                className="text-2xl"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                {title}
              </Text>
              <TouchableOpacity onPress={changeVisibility}>
                <AntDesign name="close" size={32} color="gray" />
              </TouchableOpacity>
            </View>
            <View
              style={{ width: width * 0.9, height: height * 0.7 }}
              className="rounded-lg"
            >
              {children}
            </View>
          </View>
        </Modal>
      </View>
    )
  );
};
const ModalMap = ({
  isVisible,
  ok,
  cancel,
  changeVisibility,
  marker,
  error,
  check,
  handleMapPress,
}) => {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <ModalPopUp
      isVisible={isVisible}
      title={"Maps"}
      changeVisibility={changeVisibility}
    >
      <MapView onPress={handleMapPress} className="flex-1 rounded-lg">
        {marker && <Marker coordinate={marker.coordinate} />}
      </MapView>

      {error && (
        <Text
          className="my-2 text-sm text-red-400"
          style={{ fontFamily: "Mulish_400Regular" }}
        >
          Click pour choisire localisation de votre Parcelle
        </Text>
      )}
      <TouchableOpacity
        className="absolute flex-row items-center justify-center px-2 py-3 my-3 mt-2 bg-blue-400 rounded-lg bottom-7 right-2"
        style={{ backgroundColor: Colors.green }}
        onPress={check}
      >
        <Icon type={Icons.Feather} name={"save"} color={"white"} size={24} />
        <Text
          className="ml-1 text-lg text-white"
          style={{ fontFamily: "Mulish_700Bold" }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </ModalPopUp>
  );
};

export default ModalMap;
