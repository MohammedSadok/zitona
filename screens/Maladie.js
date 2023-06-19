import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import AddNew from "../components/general/AddNew";
import MaladeItem from "../components/Items/MaladeItem";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMalade,
  fetchMalades,
  sortByDate,
  sortByMaladie,
  fetchListMaladie,
} from "../redux/maladeSlice";
import { useEffect, useState } from "react";
import ModalAddMalade from "../components/modals/ModalAddMalade";
import ModalDeleteParseil from "../components/modals/ModalDeleteParseil";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import Loader from "../components/general/Loader";
const Maladie = ({ navigation }) => {
  const dispatch = useDispatch();
  const { malades, loading, error } = useSelector((state) => state.malades);
  const { parcelle } = useSelector((state) => state.parcelles);
  const { token } = useSelector((state) => state.userAuth);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({
    isVisibleDelete: false,
    id: null,
    isVisibleAdd: false,
  });

  useEffect(() => {
    dispatch(fetchMalades({ id: parcelle.id, token: token }));
    dispatch(fetchListMaladie({ token: token }));
  }, [dispatch]);

  const Items = ({ item }) => {
    return (
      <MaladeItem
        id={item.maladie.id}
        date={item.date}
        maladie={item.maladie.nom}
        commentaire={item.commentaire}
        toggleModalUpdate={() =>
          setItem((prev) => ({ ...prev, isVisibleAdd: true, id: item.id }))
        }
        navigation={navigation}
      />
    );
  };
  return (
    <View
      className="flex-1"
      style={{ backgroundColor: Colors.backgroundColor }}
    >
      <Loader visible={loading} />
      <ModalDeleteParseil
        isVisible={item.isVisibleDelete}
        cancel={() => setItem((prev) => ({ ...prev, isVisibleDelete: false }))}
        ok={() => {
          dispatch(deleteMalade({ id: item.id, token: token }));
          setItem((prev) => ({ ...prev, isVisibleDelete: false }));
        }}
      />
      <ModalAddMalade
        id={item.id}
        isVisible={item.isVisibleAdd}
        cancel={() => setItem((prev) => ({ ...prev, isVisibleAdd: false }))}
        ok={() => {
          setItem((prev) => ({ ...prev, isVisibleAdd: false }));
        }}
        toggleModalDelete={() => {
          setItem((prev) => ({
            ...prev,
            isVisibleAdd: false,
            isVisibleDelete: true,
          }));
        }}
      />
      <AddNew
        open={() => setItem((prev) => ({ ...prev, isVisibleAdd: true, id: 0 }))}
      />
      <View className="flex-row items-center justify-between m-3">
        <Text className="text-xl font-bold">Historique</Text>

        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity
              onPress={() => setVisible(true)}
              className="flex-row items-center justify-between"
            >
              <Text
                className="mr-2 text-xl"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                Trier
              </Text>
              <Feather name="sliders" size={24} color="black" />
            </TouchableOpacity>
          }
          onRequestClose={() => setVisible(false)}
          className="w-24"
        >
          <MenuItem
            onPress={() => {
              dispatch(sortByDate());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Date</Text>
            </View>
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onPress={() => {
              dispatch(sortByMaladie());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Maladie</Text>
            </View>
          </MenuItem>
        </Menu>
      </View>
      <FlatList
        data={malades}
        renderItem={Items}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default Maladie;
