import { View, Text, FlatList } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTraitementPhytosanitaires } from "../redux/maladeSlice";
import Loader from "../components/general/Loader";
import Colors from "../constants/Colors";
import ItemTraitement from "../components/ItemTraitement";
const Traitement = ({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { traitement, loading, error } = useSelector((state) => state.malades);
  useEffect(() => {
    dispatch(fetchTraitementPhytosanitaires(id));
  }, [dispatch]);

  const Items = ({ item }) => {
    return (
      <ItemTraitement
        id={item.id}
        description={item.description}
        nomProduit={item.nomProduit}
        dose={item.dose}
        frequence={item.frequence}
        duree={item.duree}
      />
    );
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: Colors.backgroundColor }}
    >
      <Loader visible={loading} />
      {traitement.length > 0 ? (
        <FlatList
          data={traitement}
          renderItem={Items}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text className="mt-6 text-xl font-bold text-center">Aucun traitement phytosanitaire !</Text>
      )}
    </View>
  );
};

export default Traitement;
