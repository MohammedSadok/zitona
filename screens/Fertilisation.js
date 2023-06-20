import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import BarChartView from "../components/charts/BarChart";
import { Feather } from "@expo/vector-icons";
import PieChart from "../components/charts/PieChart";
import Colors from "../constants/Colors";
import AddNew from "../components/general/AddNew";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import {
  fetchFertilisations,
  deleteFertilisation,
  sortByCout,
  sortByDate,
  sortByQuantite,
  sortByTypeDengrais,
} from "../redux/fertilisationSlice";
import FertilisationItem from "../components/Items/FertilisationItem";
import Loader from "../components/general/Loader";
import ModalAddFertilisation from "../components/modals/ModalAddFertilisation";
import ModalDeleteParseil from "../components/modals/ModalDeleteParseil";
const Fertilisation = ({ navigation }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({
    isVisibleDelete: false,
    id: 0,
    isVisibleAdd: false,
  });
  const { fertilisations, loading, error } = useSelector(
    (state) => state.fertilisations
  );
  const { parcelle } = useSelector((state) => state.parcelles);
  const { token } = useSelector((state) => state.userAuth);
  useEffect(() => {
    dispatch(fetchFertilisations({ id: parcelle.id, token: token }));
  }, [dispatch]);

  const Items = ({ item }) => {
    return (
      <FertilisationItem
        id={item.id}
        date={item.date}
        quantite={item.quantite}
        commentaire={item.commentaire}
        cout={item.cout}
        typeDengrais={item.typeDengrais}
        toggleModalUpdate={() =>
          setItem((prev) => ({ ...prev, isVisibleAdd: true, id: item.id }))
        }
      />
    );
  };

  return (
    <View
      className="flex-1 pt-2"
      style={{ backfaceVisibility: Colors.backgroundColor }}
    >
      <Loader visible={loading} />
      <AddNew
        open={() => setItem((prev) => ({ ...prev, isVisibleAdd: true, id: 0 }))}
      />
      <ModalDeleteParseil
        isVisible={item.isVisibleDelete}
        cancel={() => setItem((prev) => ({ ...prev, isVisibleDelete: false }))}
        ok={() => {
          dispatch(deleteFertilisation({ id: item.id, token: token }));
          setItem((prev) => ({ ...prev, isVisibleDelete: false }));
        }}
      />

      <ModalAddFertilisation
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
      {/* <View className="mx-auto">
        <BarChartView color={"#2DA779"} />
      </View> */}
      <View className="flex-row items-center justify-between mx-3 mb-2">
        <Text className="mt-2 text-xl font-bold">Historique</Text>
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
              dispatch(sortByTypeDengrais());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Engrais</Text>
            </View>
          </MenuItem>
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
        </Menu>
      </View>

      {fertilisations.length > 0 ? (
        <FlatList
          data={fertilisations}
          renderItem={Items}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text className="mt-6 text-xl font-bold text-center">
          Aucune fertilisations enregistrer !
        </Text>
      )}
    </View>
  );
};

export default Fertilisation;
