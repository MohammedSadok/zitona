import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import ModalDeleteParSeil from "../../components/modals/ModalDeleteParseil";
import ModalAddBosket from "../../components/modals/ModalAddBosket";
import Icon, { Icons } from "../../components/general/Icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import BosketItem from "../../components/BosketItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchParseils, deleteParseil } from "../../redux/parseilSlice";
import { useEffect, useState } from "react";
const BosketsScreen = () => {
  var randomImages = [
    require("../../assets/background-parseil/0.png"),
    require("../../assets/background-parseil/1.png"),
    require("../../assets/background-parseil/2.png"),
    require("../../assets/background-parseil/3.png"),
    require("../../assets/background-parseil/4.png"),
    require("../../assets/background-parseil/5.png"),
    require("../../assets/background-parseil/6.png"),
    require("../../assets/background-parseil/7.png"),
    require("../../assets/background-parseil/8.png"),
  ];

  const dispatch = useDispatch();
  const [item, setItem] = useState({
    isVisibleDelete: false,
    id: null,
    isVisibleAdd: false,
  });
  const { parseils, loading, error, parseil } = useSelector(
    (state) => state.parseils
  );
  useEffect(() => {
    dispatch(fetchParseils());
  }, [dispatch]);

  const Items = ({ item }) => {
    const backgroundColor = item.id === parseil ? Colors.green : Colors.white;
    return (
      <BosketItem
        id={item.id}
        title={item.title}
        nombreDarbre={item.nombreDarbre}
        varieter={item.varieter}
        date_de_plantations={item.date_de_plantations}
        type_darossage={item.type_darossage}
        debit={item.debit}
        localisation={item.localisation}
        backgroundColor={backgroundColor}
        toggleModalDelete={() => {
          if (item.id === parseil) {
            Alert.alert(
              "Error",
              "Vous ne pouvez pas supprimer un Parseil sélectionné"
            );
          } else
            setItem((prev) => ({
              ...prev,
              isVisibleDelete: true,
              id: item.id,
            }));
        }}
        toggleModalUpdate={() =>
          setItem((prev) => ({ ...prev, isVisibleAdd: true, id: item.id }))
        }
        image={randomImages[item.id]}
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
      style={{ backgroundColor: Colors.backgroundColor, flex: 1,paddingTop: parseil ? 0 : "8%"}}
      className="p-2 px-3"
    >
      <ModalDeleteParSeil
        isVisible={item.isVisibleDelete}
        cancel={() => setItem((prev) => ({ ...prev, isVisibleDelete: false }))}
        ok={() => {
          dispatch(deleteParseil(item.id));
          setItem((prev) => ({ ...prev, isVisibleDelete: false }));
        }}
      />
      <ModalAddBosket
        id={item.id}
        isVisible={item.isVisibleAdd}
        cancel={() => setItem((prev) => ({ ...prev, isVisibleAdd: false }))}
        ok={() => {
          setItem((prev) => ({ ...prev, isVisibleAdd: false }));
        }}
      />

      <View className="">
        <Text
          style={{ fontFamily: "Mulish_700Bold" }}
          className="text-3xl font-bold"
        >
          5 Boskets
        </Text>
        <Text className="text-base">10022 Arbre</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          setItem((prev) => ({ ...prev, isVisibleAdd: true, id: 0 }))
        }
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,
          elevation: 14,
        }}
        className="flex-row items-center p-2 my-2 bg-white rounded-lg"
      >
        <Icon
          className="p-1 bg-blue-600 rounded-full"
          type={Icons.Feather}
          name={"plus"}
          color={Colors.white}
          size={26}
        />
        <Text className="ml-6 text-lg font-bold">Créer un nouveau parseil</Text>
      </TouchableOpacity>
      <FlatList
        data={parseils}
        renderItem={Items}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BosketsScreen;
