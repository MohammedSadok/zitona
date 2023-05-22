import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useState } from "react";
import Item from "../components/Item";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalPopUp from "../components/modals/ModalPopUp";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import Colors from "../constants/Colors";
const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView
      className="flex-col items-center justify-between flex-1 px-2"
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
            <TouchableOpacity className="px-6 py-2.5 bg-red-600 rounded-md">
              <Text
                className="text-xl text-white"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                Oui
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-6 py-2.5 bg-slate-300 rounded-md">
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
      <View className='flex-col items-center justify-between'>
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
        <Text className="my-1 text-2xl font-bold">Mohammed Sadok</Text>
      </View>
      <View className="w-full p-2 rounded-lg bg-slate-100 h-1/4" style={{marginVertical: Dimensions.get("screen").height > 700 ? "5%" : 0,}}>
        <Text>3 boskets</Text>
      </View>
      <ScrollView className="w-full">
        <Item
          title={"Transaction List"}
          text={"Transactions You Have"}
          image={require("../assets/profile/List.png")}
          width={17}
          height={20}
          color={"#E0FFF0"}
          // handleClick={() => navigation.navigate("Transactions")}
        />
        <Item
          title={"Privacy"}
          text={"Change email and password"}
          image={require("../assets/profile/private.png")}
          width={17}
          height={20}
          color={"#E0FDFF"}
        />
        <Item
          title={"Portfolio"}
          text={"Update portfolio settings"}
          image={require("../assets/profile/protfolio.png")}
          width={20}
          height={18}
          color={"#F1E0FF"}
          handleClick={() => navigation.navigate("PortfolioScreen")}
        />
        <Item
          title={"Notifications"}
          text={"Change notification settings"}
          image={require("../assets/profile/notification.png")}
          width={17}
          height={20}
          color={"#FFFCE0"}
        />
        <Item
          title={"Go out"}
          text={"Exit the app"}
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
