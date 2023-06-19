import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import AddNew from "../components/general/AddNew";
import BarChartView from "../components/charts/BarChart";
import RecoltItem from "../components/Items/RecoltItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ModalAddRecolt from "../components/modals/ModalAddRecolt";
import ModalDeleteParseil from "../components/modals/ModalDeleteParseil";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import Loader from "../components/general/Loader";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import {
  fetchRecolts,
  deleteRecolt,
  sortByCout,
  sortByDate,
  sortByMethode,
  sortByQuality,
  sortByQuantite,
} from "../redux/recoltSlice";
const Recolt = ({ navigation }) => {
  const dispatch = useDispatch();
  const { recolts, loading, error } = useSelector((state) => state.recolts);
  const { parcelle } = useSelector((state) => state.parcelles);
  const { token } = useSelector((state) => state.userAuth);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({
    isVisibleDelete: false,
    id: 0,
    isVisibleAdd: false,
  });
  useEffect(() => {
    dispatch(fetchRecolts({ id: parcelle.id, token: token }));
  }, [dispatch]);
  const data = {
    labels: recolts.map((recolt) =>
      recolt.date.substring(2).replace(/-/g, "/")
    ),
    datasets: [
      {
        data: recolts.map((recolt) => recolt.quantite),
      },
    ],
  };
  const Items = ({ item }) => {
    return (
      <RecoltItem
        id={item.id}
        date={item.date}
        quantite={item.quantite}
        methode={item.methode}
        qualite={item.qualite}
        commentaire={item.commentaire}
        cout={item.cout}
        toggleModalUpdate={() =>
          setItem((prev) => ({ ...prev, isVisibleAdd: true, id: item.id }))
        }
      />
    );
  };

  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <View
      className="flex-1"
      style={{ backgroundColor: Colors.backgroundColor }}
    >
      <AddNew
        open={() => setItem((prev) => ({ ...prev, isVisibleAdd: true, id: 0 }))}
      />
      <Loader visible={loading} />
      <ModalDeleteParseil
        isVisible={item.isVisibleDelete}
        cancel={() => setItem((prev) => ({ ...prev, isVisibleDelete: false }))}
        ok={() => {
          dispatch(deleteRecolt({ id: item.id, token: token }));
          setItem((prev) => ({ ...prev, isVisibleDelete: false }));
        }}
      />
      <ModalAddRecolt
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
      {recolts.length > 0 && (
        <View className="mx-2 mt-2 h-1/3 rounded-xl">
          <BarChartView color={"blue"} data={data} />
        </View>
      )}
      <View className="flex-row items-center justify-between mx-3 mt-1 mb-2">
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
              dispatch(sortByQuality());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Qualite</Text>
            </View>
          </MenuItem>
          <MenuItem
            onPress={() => {
              dispatch(sortByCout());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Cout</Text>
            </View>
          </MenuItem>
          <MenuItem
            onPress={() => {
              dispatch(sortByQuantite());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Quantite</Text>
            </View>
          </MenuItem>
          <MenuItem
            onPress={() => {
              dispatch(sortByMethode());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Methode</Text>
            </View>
          </MenuItem>
        </Menu>
      </View>
      <FlatList
        data={recolts}
        renderItem={Items}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Recolt;
