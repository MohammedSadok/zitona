import { TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
const AddNew = ({open}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#5FA88C",
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 18,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.0,
        elevation: 24,
      }}
      onPress={open}
      className="absolute z-10 p-3 rounded-full bottom-5 right-6 w-min"
    >
      <Entypo name="plus" size={36} color="white" />
    </TouchableOpacity>
  );
};

export default AddNew;
