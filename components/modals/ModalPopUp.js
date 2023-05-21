import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const ModalPopUp = ({ isVisible, setIsVisible, children, title }) => {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={isVisible}
      style={styles.modal}
    >
      <View style={styles.modal} className="p-3 m-auto bg-white rounded-xl">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-2xl" style={{ fontFamily: "Mulish_700Bold" }}>
            {title}
          </Text>
          <TouchableOpacity onPress={setIsVisible}>
            <AntDesign name="close" size={32} color="gray" />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },
});
export default ModalPopUp;
