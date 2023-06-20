import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import ModalDeleteParseil from "../../components/modals/ModalDeleteParseil";
import ModalAddBosket from "../../components/modals/ModalAddBosket";
import ModalMap from "../../components/modals/ModalMap";
import Icon, { Icons } from "../../components/general/Icons";
import Loader from "../../components/general/Loader";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import BosketItem from "../../components/Items/BosketItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchParcelles, deleteParcelle } from "../../redux/parcelleSlice";
import { useEffect, useState } from "react";

const BosketsScreen = () => {
  var randomImages = [
    require("../../assets/background-parcelle/0.png"),
    require("../../assets/background-parcelle/1.png"),
    require("../../assets/background-parcelle/2.png"),
    require("../../assets/background-parcelle/3.png"),
    require("../../assets/background-parcelle/4.png"),
    require("../../assets/background-parcelle/5.png"),
    require("../../assets/background-parcelle/6.png"),
    require("../../assets/background-parcelle/7.png"),
    require("../../assets/background-parcelle/8.png"),
    require("../../assets/background-parcelle/9.png"),
  ];

  const dispatch = useDispatch();
  const [item, setItem] = useState({
    isVisibleDelete: false,
    id: null,
    isVisibleAdd: false,
    isVisibleMap: false,
  });
  const { parcelles, loading, parcelle } = useSelector(
    (state) => state.parcelles
  );
  const { token, user } = useSelector((state) => state.userAuth);

    let totalDarbre = 0;
    parcelles.forEach(item => totalDarbre += item.nombreDarbre);
  const [marker, setMarker] = useState(null);
  const [error, setError] = useState(false);

  const initializeMarker = (location) => setMarker(location);
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarker({
      coordinate,
    });
  };
  const check = () => {
    if (marker === null) {
      resultError = true;
    } else {
      resultError = false;
      setItem((prev) => ({ ...prev, isVisibleMap: false }));
    }

    setError(resultError);
  };

  useEffect(() => {
    dispatch(fetchParcelles({ token: token, ...user }));
  }, [dispatch]);

  const Items = ({ item }) => {
    const backgroundColor =
      item.id === parcelle.id ? Colors.green : Colors.white;
    return (
      <BosketItem
        latitude={item.latitude}
        longitude={item.longitude}
        id={item.id}
        title={item.nom}
        nombreDarbre={item.nombreDarbre}
        varieter={item.varieter}
        date_de_plantations={item.dateDePlantation}
        type_darossage={item.type_darossage}
        debit={item.debit}
        localisation={item.localisation}
        backgroundColor={backgroundColor}
        toggleModalDelete={() => {
          if (item.id === parcelle.id) {
            Alert.alert(
              "Error",
              "Vous ne pouvez pas supprimer un parcelle sélectionné"
            );
          } else
            setItem((prev) => ({
              ...prev,
              isVisibleDelete: true,
              id: item.id,
            }));
        }}
        toggleModalUpdate={() => {
          setItem((prev) => ({ ...prev, isVisibleAdd: true, id: item.id }));
        }}
        image={randomImages[item.id%10]}
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
      style={{
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        paddingTop: parcelle.id ? 0 : "9%",
      }}
      className="p-2 px-3"
    >
      <Loader visible={loading} />
      <ModalDeleteParseil
        isVisible={item.isVisibleDelete}
        cancel={() => setItem((prev) => ({ ...prev, isVisibleDelete: false }))}
        ok={() => {
          dispatch(deleteParcelle({ id: item.id, token: token }));
          setItem((prev) => ({ ...prev, isVisibleDelete: false }));
        }}
      />
      <ModalAddBosket
        marker={marker}
        id={item.id}
        isVisible={item.isVisibleAdd}
        cancel={() => setItem((prev) => ({ ...prev, isVisibleAdd: false }))}
        ok={() => {
          setItem((prev) => ({ ...prev, isVisibleAdd: false }));
        }}
        toggleModalMap={() =>
          setItem((prev) => ({ ...prev, isVisibleMap: true }))
        }
        initializeMarker={initializeMarker}
      />
      <ModalMap
        marker={marker}
        error={error}
        check={check}
        handleMapPress={handleMapPress}
        changeVisibility={() =>
          setItem((prev) => ({ ...prev, isVisibleMap: false }))
        }
        isVisible={item.isVisibleMap}
      />
      <View className="">
        <Text
          style={{ fontFamily: "Mulish_700Bold" }}
          className="text-3xl font-bold"
        >
          {parcelles.length} Boskets
        </Text>
        <Text className="text-base">{totalDarbre} Arbre</Text>
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
        <Text className="ml-6 text-lg font-bold">
          Créer un nouveau parcelle
        </Text>
      </TouchableOpacity>
      <FlatList
        data={parcelles}
        renderItem={Items}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BosketsScreen;
