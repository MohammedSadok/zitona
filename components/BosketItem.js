import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import Icon, { Icons } from "./general/Icons";
import { SelectParseil, deleteParseil } from "../redux/parseilSlice";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const BosketItem = ({
  id,
  title,
  nombreDarbre,
  varieter,
  date_de_plantations,
  type_darossage,
  debit,
  localisation,
  backgroundColor,
  image,
  toggleModalUpdate,
  toggleModalDelete,
}) => {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const dispatch = useDispatch();
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity
      className="flex-row mb-2 overflow-hidden bg-white border-4 rounded-lg"
      style={[styles.container, { borderColor: backgroundColor }]}
      onPress={() => dispatch(SelectParseil(id))}
    >
      <View className="flex-col justify-between w-4/6 px-2 pb-2">
        <Text style={{ fontFamily: "Mulish_700Bold" }} className="h-8 text-2xl">
          {title}
        </Text>
        <View className="flex-row items-baseline justify-between">
          <Text style={{ fontFamily: "Mulish_400Regular" }} className="text-xl">
            {nombreDarbre}{" "}
            <Icon
              type={Icons.FontAwesome}
              name={"tree"}
              color={"green"}
              size={18}
            />{" "}
            {varieter}
          </Text>
          <Text className="text-xs text-slate-700">{date_de_plantations}</Text>
        </View>
        <Text>
          Arrosage {type_darossage} debit {debit} m3/min
        </Text>
        <Text className="text-sm text-slate-600">{localisation}</Text>
      </View>
      <View className="relative flex-col items-center justify-center w-2/6 overflow-hidden">
        <View className="self-end mr-1">
          <Menu
            visible={visible}
            anchor={
              <TouchableOpacity
                onPress={showMenu}
                className="relative top-1 right-1"
              >
                <Icon
                  type={Icons.Feather}
                  name={"settings"}
                  color={Colors.green}
                  size={20}
                />
              </TouchableOpacity>
            }
            onRequestClose={hideMenu}
          >
            <MenuItem
              onPress={() => {
                hideMenu();
                toggleModalUpdate();
              }}
            >
              <View className="flex-row items-center justify-between">
                <Icon
                  type={Icons.MaterialIcons}
                  name={"edit"}
                  color={Colors.blue}
                  size={24}
                />
                <Text style={styles.option}>Edit portfolio</Text>
              </View>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onPress={() => {
                hideMenu();
                toggleModalDelete();
              }}
            >
              <View className="flex-row items-center justify-between">
                <Icon
                  type={Icons.MaterialCommunityIcons}
                  name={"delete"}
                  color={Colors.red}
                  size={20}
                />
                <Text style={styles.option}>Remove portfolio</Text>
              </View>
            </MenuItem>
          </Menu>
        </View>
        <Image className="w-full h-5/6" resizeMode="cover" source={image} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 130,
    borderColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  option: {
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
    marginLeft: 5,
  },
});
export default BosketItem;
