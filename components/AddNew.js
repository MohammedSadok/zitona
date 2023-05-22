import { TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
const AddNew = () => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: "#5FA88C" }}
      // onPress={() => navigation.goBack()}
      className="absolute z-10 p-3 rounded-full bottom-4 right-4 w-min"
    >
      <Entypo name="plus" size={36} color="white" />
    </TouchableOpacity>
  );
};

export default AddNew;
