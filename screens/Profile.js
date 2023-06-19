import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import Item from "../components/Items/Item";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalPopUp from "../components/modals/ModalPopUp";
import { logout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import Colors from "../constants/Colors";
import Icon, { Icons } from "../components/general/Icons";
import ModalPassword from "../components/modals/ModalPassword";
const Profile = ({ navigation }) => {
  const { parcelles, loading, error, parcelle } = useSelector(
    (state) => state.parcelles
  );
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleP, setIsVisibleP] = useState(false);
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView
      className="flex-col items-center justify-between flex-1 px-2 "
      style={{ backgroundColor: Colors.backgroundColor }}
    >
      <ModalPopUp
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(false)}
        title="Quiter"
      >
        <View className="w-4/6 px-3">
          <Text className="">Vouler vous vraiement quitter l'application</Text>
          <View className="flex-row items-center justify-between mt-5 mb-3 space-x-6">
            <TouchableOpacity
              className="px-6 py-2.5 bg-red-600 rounded-md"
              onPress={() => dispatch(logout())}
            >
              <Text
                className="text-xl text-white"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                Oui
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-6 py-2.5 bg-slate-300 rounded-md"
              onPress={() => setIsVisible(false)}
            >
              <Text
                className="text-xl"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                Annuler
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopUp>
      <ModalPassword
        cancel={() => setIsVisibleP(false)}
        ok={() => navigation.navigate("Privacy")}
        isVisible={isVisibleP}
      />
      <View className="flex-col items-center justify-center mt-2">
        <View className="w-24 h-24">
          <ImageBackground
            className="relative flex-1"
            source={require("../assets/profile/user.png")}
            resizeMode="contain"
          >
            <TouchableOpacity className="absolute right-0 w-10 h-10 -bottom-2">
              <ImageBackground
                className="flex-1"
                source={require("../assets/profile/modifier.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <Text className="my-2 text-2xl font-bold">Mohammed Sadok</Text>
      </View>
      <View
        className="flex-col justify-between w-full p-2 m-2 bg-white rounded-md"
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
            <Text style={styles.textBold}>100 kg</Text>
          </View>
        </View>
      </View>
      <ScrollView className="w-full">
        <Item
          title={"Parcelles"}
          text={"Liste des parcelles que vous avez"}
          image={require("../assets/profile/List.png")}
          width={17}
          height={20}
          color={"#E0FFF0"}
          handleClick={() => navigation.navigate("Boskets")}
        />
        <Item
          title={"Sécurité"}
          text={"Changer les informations personelle"}
          image={require("../assets/profile/private.png")}
          width={17}
          height={20}
          color={"#E0FDFF"}
          handleClick={() => setIsVisibleP(true)}
        />
        {/* <Item
          title={"Portefeuille"}
          text={"Liste des dépenses"}
          image={require("../assets/profile/protfolio.png")}
          width={20}
          height={18}
          color={"#F1E0FF"}
          handleClick={() => navigation.navigate("Portefeuille")}
        /> */}
        <Item
          title={"Notifications"}
          text={"Liste des notifications"}
          image={require("../assets/profile/notification.png")}
          width={17}
          height={20}
          color={"#FFFCE0"}
          handleClick={() => navigation.navigate("Notifications")}
        />
        <Item
          title={"Log out"}
          text={"Se Déconnecté"}
          image={require("../assets/profile/logout.png")}
          width={21}
          height={21}
          color={"#FFE0E0"}
          handleClick={() => setIsVisible(true)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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
