import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ModalPopUp from "./ModalPopUp";
const ModalDeleteParseil = ({ isVisible, ok, cancel }) => {
  return (
    <ModalPopUp isVisible={isVisible} setIsVisible={cancel} title="Quiter">
      <View className="w-4/6 px-3">
        <Text className="">Vouler vous vraiement quitter l'application</Text>
        <View className="flex-row items-center justify-between mt-5 mb-3 space-x-6">
          <TouchableOpacity
            className="px-6 py-2.5 bg-red-600 rounded-md"
            onPress={ok}
          >
            <Text
              className="text-xl text-white"
              style={{ fontFamily: "Mulish_700Bold" }}
            >
              Oui
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-6 py-2.5 bg-slate-300 rounded-md"
            onPress={cancel}
          >
            <Text className="text-xl" style={{ fontFamily: "Mulish_700Bold" }}>
              Annuler
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalPopUp>
  );
};

export default ModalDeleteParseil;
