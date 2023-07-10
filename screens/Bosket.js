import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigate from "../components/Navigate";
import Colors from "../constants/Colors";
import Icon, { Icons } from "../components/general/Icons";
import Task from "../components/Task";
import { useEffect } from "react";
import Loader from "../components/general/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getTotalDepence, getTotalRecolte } from "../redux/parcelleSlice";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const slides = {
  fertilisation: require("../assets/navigation/fertiliser.png"),
  arrosage: require("../assets/navigation/arrosage.png"),
  maladie: require("../assets/navigation/maladie.png"),
  recolt: require("../assets/navigation/recolt.png"),
};

const Bosket = ({ navigation }) => {
  const dispatch = useDispatch();
  const { parcelle, totalRecolte, totalCoutDepence, loading } = useSelector(
    (state) => state.parcelles
  );
  const { user,token } = useSelector((state) => state.userAuth);
  useEffect(() => {
    dispatch(getTotalDepence({ token: token, id: parcelle.id }));
    dispatch(getTotalRecolte({ token: token, id: parcelle.id }));
  }, [dispatch]);

  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.backgroundColor }]}
    >
      <Loader visible={loading} />
      <View className="flex-row items-center justify-between h-20 p-2 px-4">
        <View className="flex-row items-center space-x-3">
          <Image
            className="w-16"
            resizeMode="center"
            source={require("../assets/profile/user.png")}
          />
          <View>
            <Text>{user.nom}</Text>
            <Text>{user.prenom}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Icon
            type={Icons.Ionicons}
            name="notifications-outline"
            size={24}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      <Text
        className="mt-0 ml-3 text-xl"
        style={{ fontFamily: "Mulish_700Bold" }}
      >
        Outils
      </Text>
      <View
        horizontal
        className="flex-row items-center justify-around py-1"
        style={styles.scrollable}
      >
        <Navigate
          title="Fertilisation"
          navigation={navigation}
          img={slides.fertilisation}
        />
        <Navigate
          title="Maladie"
          navigation={navigation}
          img={slides.maladie}
        />
        <Navigate title="Recolt" navigation={navigation} img={slides.recolt} />
        <Navigate title="Traitement" navigation={navigation} add={true} />
      </View>

      <View
        className="flex-col justify-between p-2 m-2 bg-white rounded-md"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1,
        }}
      >
        <Text className="mb-2 text-xl" style={{ fontFamily: "Mulish_700Bold" }}>
          {parcelle.title}
        </Text>
        <View className="flex-row items-center justify-between px-3">
          <View className="flex-col items-center justify-between space-y-1">
            <Icon
              color={"#606C38"}
              name={"tree"}
              type={Icons.FontAwesome5}
              size={30}
            />
            <Text style={styles.text}>{parcelle.varieter}</Text>
            <Text style={styles.textBold}>{parcelle.nombreDarbre}</Text>
          </View>
          <View className="flex-col items-center justify-between space-y-1">
            <Icon
              color={"#228BB8"}
              name={"water-sharp"}
              type={Icons.Ionicons}
              size={30}
            />
            <Text style={styles.text}>arrosage</Text>
            <View className="flex-row">
              <Text style={styles.textBold}>{parcelle.debit} m</Text>
              <Text className="text-xs relatives bottom-1">3</Text>
              <Text style={styles.textBold}>/h</Text>
            </View>
          </View>
          <View className="flex-col items-center justify-between space-y-1">
            <Icon
              color={"#6247aa"}
              name={"fruit-cherries"}
              type={Icons.MaterialCommunityIcons}
              size={30}
            />
            <Text style={styles.text}>la récolte</Text>
            <Text style={styles.textBold}>{totalRecolte} kg</Text>
          </View>
          <View className="flex-col items-center justify-between space-y-1">
            <Icon
              color={"#ffd60a"}
              name={"dollar-sign"}
              type={Icons.FontAwesome5}
              size={30}
            />
            <Text style={styles.text}>la dépense</Text>
            <Text style={styles.textBold}>{totalCoutDepence} dh</Text>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between mx-3 my-1">
        <Text className="text-xl font-bold">Activités</Text>
        <Icon
          color={"black"}
          name={"tasks"}
          type={Icons.FontAwesome5}
          size={24}
        />
      </View>
      <ScrollView>
        <Task object={"Traitement phytosanitaire"} />
        <Task object={"Recolte"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bosket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: "Mulish_400Regular",
  },
  textBold: {
    fontFamily: "Mulish_700Bold",
  },
});
