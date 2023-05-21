import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const Navigate = ({ title, img, navigation }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center px-2 py-1 mx-2 space-x-1 rounded-md bg-slate-100 h-14"
      onPress={() => navigation.navigate(title)}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      }}
    >
      <Image className="w-12 h-12" source={img} resizeMode={"contain"} />
    </TouchableOpacity>
  );
};

export default Navigate;
