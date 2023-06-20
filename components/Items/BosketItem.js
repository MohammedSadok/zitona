import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import Icon, { Icons } from "../general/Icons";
import { SelectParcelle } from "../../redux/parcelleSlice";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
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
  latitude,
  longitude,
  debit,
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
      className="flex-row mb-1 overflow-hidden bg-white border-4 rounded-lg"
      style={[styles.container, { borderColor: backgroundColor }]}
      onPress={() => {
        dispatch(
          SelectParcelle({
            id,
            title,
            nombreDarbre,
            varieter,
            date_de_plantations,
            debit,
            latitude,
            longitude,
          })
        );
      }}
    >
      <View className="flex-col justify-between w-4/6 px-2">
        <Text style={{ fontFamily: "Mulish_700Bold" }} className="h-6 text-xl">
          {title}
        </Text>
        <View className="flex-row items-baseline justify-between">
          <Text style={{ fontFamily: "Mulish_400Regular" }} className="text-xl">
            {nombreDarbre}
            <Icon
              type={Icons.MaterialCommunityIcons}
              name={"tree"}
              color={Colors.green}
              size={24}
            />
            {varieter}
          </Text>
        </View>
        <View className="flex-row-reverse items-center justify-between">
          <Text
            className="text-xs text-right text-slate-500"
            style={{ fontFamily: "Mulish_400Regular" }}
          >
            {date_de_plantations}
          </Text>
          {parseInt(debit) > 0 ? (
            <View className="flex-row items-center justify-between">
              <Icon
                type={Icons.MaterialCommunityIcons}
                name={"water"}
                size={24}
                color={Colors.blue}
              />
              <Text
                className="text-xs"
                style={{ fontFamily: "Mulish_700Bold", color: Colors.blue }}
              >
                {debit} m3/min
              </Text>
            </View>
          ) : (
            <Icon
              type={Icons.MaterialCommunityIcons}
              name={"water-off"}
              size={24}
              color={Colors.gray}
            />
          )}
        </View>
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
                  color={Colors.black}
                  size={22}
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
        <Image className="w-full h-5/6" resizeMode="contain" source={image} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 100,
    borderColor: Colors.white,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  option: {
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
    marginLeft: 5,
  },
});
export default BosketItem;
