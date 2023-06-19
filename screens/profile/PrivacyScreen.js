import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import Icon, { Icons } from "../../components/general/Icons";
import ModalMail from "../../components/modals/privacy/ModalMail";
import ModalName from "../../components/modals/privacy/ModalName";
import ModalUpdatePassword from "../../components/modals/privacy/ModalUpdatePassword";
import ModalNumber from "../../components/modals/privacy/ModalNumber";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const PrivacyScreen = () => {
  const [item, setItem] = useState({
    isVisibleName: false,
    id: null,
    isVisibleMail: false,
    isVisiblePassword: false,
    isVisibleNumber: false,
  });
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <View
      className="flex-1 p-1 px-2"
      style={{ backgroundColor: Colors.backgroundColor }}
    >
      <ModalNumber
        isVisible={item.isVisibleNumber}
        changeVisibility={() =>
          setItem((prev) => ({
            ...prev,
            isVisibleNumber: !item.isVisibleNumber,
          }))
        }
      />
      <ModalName
        isVisible={item.isVisibleName}
        changeVisibility={() =>
          setItem((prev) => ({
            ...prev,
            isVisibleName: !item.isVisibleName,
          }))
        }
      />
      <ModalUpdatePassword
        isVisible={item.isVisiblePassword}
        changeVisibility={() =>
          setItem((prev) => ({
            ...prev,
            isVisiblePassword: !item.isVisiblePassword,
          }))
        }
      />
      <ModalMail
        isVisible={item.isVisibleMail}
        changeVisibility={() =>
          setItem((prev) => ({
            ...prev,
            isVisibleMail: !item.isVisibleMail,
          }))
        }
      />
      <View className="flex-col items-center justify-center mt-2">
        <View className="w-24 h-24">
          <ImageBackground
            className="relative flex-1"
            source={require("../../assets/profile/user.png")}
            resizeMode="contain"
          ></ImageBackground>
        </View>
        <Text className="my-2 text-2xl font-bold">Mohammed Sadok</Text>
      </View>
      <TouchableOpacity
        onPress={() => setItem((prev) => ({ ...prev, isVisibleName: true }))}
        className="my-1.5 bg-white rounded-lg p-2 flex-row justify-between items-center pr-5"
        style={styles.container}
      >
        <Text style={{ fontFamily: "Mulish_700Bold" }} className="pl-3 text-xl">
          Nom et prenom
        </Text>
        <Icon
          type={Icons.FontAwesome5}
          name={"chevron-right"}
          size={24}
          color={"black"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="my-1.5 bg-white rounded-lg p-2 flex-row justify-between items-center pr-5"
        style={styles.container}
        onPress={() => setItem((prev) => ({ ...prev, isVisibleMail: true }))}
      >
        <Text style={{ fontFamily: "Mulish_700Bold" }} className="pl-3 text-xl">
          Mail
        </Text>
        <Icon
          type={Icons.FontAwesome5}
          name={"chevron-right"}
          size={24}
          color={"black"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          setItem((prev) => ({ ...prev, isVisiblePassword: true }))
        }
        className="my-1.5 bg-white rounded-lg p-2 flex-row justify-between items-center pr-5"
        style={styles.container}
      >
        <Text style={{ fontFamily: "Mulish_700Bold" }} className="pl-3 text-xl">
          Mot de Passe
        </Text>
        <Icon
          type={Icons.FontAwesome5}
          name={"chevron-right"}
          size={24}
          color={"black"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setItem((prev) => ({ ...prev, isVisibleNumber: true }))}
        className="my-1.5 bg-white rounded-lg p-2 flex-row justify-between items-center pr-5"
        style={styles.container}
      >
        <Text style={{ fontFamily: "Mulish_700Bold" }} className="pl-3 text-xl">
          Numéro de téléphone
        </Text>
        <Icon
          type={Icons.FontAwesome5}
          name={"chevron-right"}
          size={24}
          color={"black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PrivacyScreen;
const styles = StyleSheet.create({
  container: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
});
