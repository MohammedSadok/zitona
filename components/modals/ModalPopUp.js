import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const ModalPopUp = ({ isVisible, setIsVisible, children, title }) => {
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
        className="absolute z-10 justify-center bg-black opacity-50"
        style={{ width: width, height: height }}
      >
        <Modal animationType={"fade"} transparent={true} visible={isVisible}>
          <View className="p-3 m-auto bg-white rounded-xl">
            <View className="flex-row items-center justify-between mt-1 mb-2">
              <Text
                className="text-2xl"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                {title}
              </Text>
              <TouchableOpacity onPress={setIsVisible}>
                <AntDesign name="close" size={32} color="gray" />
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </Modal>
      </View>
    )
  );
};
export default ModalPopUp;
