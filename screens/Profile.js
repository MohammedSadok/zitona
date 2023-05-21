import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Item from "../components/Item";
import { SafeAreaView } from "react-native-safe-area-context";
const Profile = () => {
  return (
    <SafeAreaView className="flex-col items-center flex-1 px-2 bg-white">
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
      <View className="w-full p-2 rounded-lg bg-slate-100 h-1/4">
        <Text>3 boskets</Text>
      </View>
      <Item
        title={"Transaction List"}
        text={"Transactions You Have"}
        image={require("../assets/profile/List.png")}
        width={17}
        height={20}
        color={"#E0FFF0"}
        // handleClick={() => navigation.navigate("Transactions")}
      />
      <Text className="w-full ml-4 text-lg font-semibold text-left">
        Settings
      </Text>
      <View className="justify-between w-full h-2/6">
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
          handleClick={() => toggleModal()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
