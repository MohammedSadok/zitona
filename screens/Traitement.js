import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import AddNew from "../components/general/AddNew";
import PieChart from "../components/charts/PieChart";
import ItemTritement from "../components/Items/ItemTritement";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ModalAddTraitement from "../components/modals/ModalAddTraitement";
import ModalDeleteParseil from "../components/modals/ModalDeleteParseil";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import Loader from "../components/general/Loader";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import {
  fetchTraitements,
  deleteTraitement,
  sortByDate,
} from "../redux/traitementSlice";
const Traitement = ({ navigation }) => {
  const dispatch = useDispatch();
  const { traitements, loading, error } = useSelector(
    (state) => state.traitements
  );
  const { token } = useSelector((state) => state.userAuth);
  const { parcelle } = useSelector((state) => state.parcelles);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({
    isVisibleDelete: false,
    id: 0,
    isVisibleAdd: false,
  });
  useEffect(() => {
    dispatch(fetchTraitements({ id: parcelle.id, token: token }));
  }, [dispatch]);

  const counts = {};
  traitements.forEach((item) => {
    const typeTraitement = item.typeTraitement;
    counts[typeTraitement] = (counts[typeTraitement] || 0) + 1;
  });

  const totalCount = Object.values(counts).reduce(
    (acc, count) => acc + count,
    0
  );

  const Table = Object.keys(counts).map((typeTraitement) => {
    const count = counts[typeTraitement];
    const percentage = (count / totalCount) * 100;
    let color;
    if (typeTraitement === "Élagage") color = "#264653";
    else if (typeTraitement === "Gestion des mauvaises herbes")
      color = "#2a9d8f";
    else if (typeTraitement === "Traitement phytosanitaire") color = "#e9c46a";
    else color = "#f4a261";

    return {
      percentage: percentage.toFixed(2),
      value: counts[typeTraitement],
      label: typeTraitement,
      color,
    };
  });

  const Items = ({ item }) => {
    return (
      <ItemTritement
        id={item.id}
        date={item.date}
        cout={item.cout}
        typeTraitement={item.typeTraitement}
        description={item.description}
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
          dispatch(deleteTraitement({ id: item.id, token: token }));
          setItem((prev) => ({ ...prev, isVisibleDelete: false }));
        }}
      />
      <ModalAddTraitement
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
      {Table.length > 0 && (
        <View
          horizontal
          className="flex-row items-center justify-between p-2 pb-0 mx-2"
        >
          <PieChart data={Table} />
          <View className="">
            <View>
              {Table.map((item, index) => (
                <View
                  key={index}
                  className="flex-col items-center justify-center py-1 mb-1 rounded-xl"
                  style={{ backgroundColor: item.color }}
                >
                  <Text
                    className="text-xs text-white"
                    style={{ fontFamily: "Mulish_700Bold" }}
                  >
                    {item.percentage} %
                  </Text>
                  <Text
                    className="px-2 text-xs text-white"
                    style={{ fontFamily: "Mulish_700Bold" }}
                  >
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
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
              // dispatch(sortByQuality());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Qualite</Text>
            </View>
          </MenuItem>
          <MenuItem
            onPress={() => {
              // dispatch(sortByCout());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Cout</Text>
            </View>
          </MenuItem>
          <MenuItem
            onPress={() => {
              // dispatch(sortByQuantite());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Quantite</Text>
            </View>
          </MenuItem>
          <MenuItem
            onPress={() => {
              // dispatch(sortByMethode());
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
        data={traitements}
        renderItem={Items}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Traitement;
