import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigate from "../components/Navigate";
import Colors from "../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon, { Icons } from "../components/general/Icons";
import Task from "../components/Task";
const slides = {
  fertilisation: require("../assets/navigation/fertiliser.png"),
  arrosage: require("../assets/navigation/arrosage.png"),
  maladie: require("../assets/navigation/maladie.png"),
  recolt: require("../assets/navigation/recolt.png"),
};
const Bosket = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState({ add: false, update: false });
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.backgroundColor }]}
    >
      {/* <ModalPopUp
          isVisible={isVisible.add}
          setIsVisible={() => setIsVisible({ ...isVisible, add: false })}
        >
          <Text className="w-56">Ajouter</Text>
        </ModalPopUp>
        <ModalPopUp
          isVisible={isVisible.update}
          setIsVisible={() => setIsVisible({ ...isVisible, update: false })}
        >
          <Text className="w-56">Modifier</Text>
        </ModalPopUp> */}
      <View className="flex-row items-center justify-between h-20 p-2 px-4">
        <View className="flex-row items-center space-x-3">
          <Image
            className="w-16"
            resizeMode="center"
            source={require("../assets/profile/user.png")}
          />
          <View>
            <Text>Sadok</Text>
            <Text>Mohammed</Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
      </View>
      <Text className="ml-3 font-bold underline ">Tools</Text>
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
        <Navigate title="NewTask" navigation={navigation} add={true} />
      </View>

      <View
        className="flex-col justify-between p-2 pb-0 m-2 bg-white rounded-md"
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
        <Text className="text-lg font-bold">About</Text>
        <Text style={{ fontFamily: "Mulish_400Regular" }}>
          des information generale sur le bosquet localisation ...des
          information generale sur le bosquet localisation ...
        </Text>
        <View className="flex-row items-center justify-between p-2 mx-2 mt-1">
          <View className="flex-col items-center justify-between space-y-1">
            <Icon
              color={"#606C38"}
              name={"tree"}
              type={Icons.FontAwesome5}
              size={30}
            />
            <Text style={styles.text}>arbre d'olivier</Text>
            <Text style={styles.textBold}>15</Text>
          </View>
          <View className="flex-col items-center justify-between space-y-1">
            <Icon
              color={"#228BB8"}
              name={"water-sharp"}
              type={Icons.Ionicons}
              size={30}
            />
            <Text style={styles.text}>arrosage</Text>
            <Text style={styles.textBold}>3 m3</Text>
          </View>
          <View className="flex-col items-center justify-between space-y-1">
            <Icon
              color={"#228BB8"}
              name={"fruit-cherries"}
              type={Icons.MaterialCommunityIcons}
              size={30}
            />
            <Text style={styles.text}>la récolte</Text>
            <Text style={styles.textBold}>100 kg</Text>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between mx-3 my-1">
        <Text className="text-xl font-bold">Tâches</Text>
        <Icon
          color={"black"}
          name={"tasks"}
          type={Icons.FontAwesome5}
          size={24}
        />
      </View>
      <ScrollView>
        <Task done={true} />
        <Task done={false} />
        <Task done={false} />
        <Task done={true} />
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
