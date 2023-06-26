import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import Colors from "../../constants/Colors";
import Input from "../../components/general/Input";
import messaging from "@react-native-firebase/messaging";
import { useDispatch,useSelector } from "react-redux";
import { register } from "../../redux/authSlice";
import Loader from "../../components/general/Loader";
const PasswordScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userAuth);
  const [inputs, setInputs] = React.useState({
    password: "",
    confirmation: "",
    deviceToken: "",
  });
  
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // };
  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging()
  //       .getToken()
  //       .then((token) => {
  //         setInputs((prevState) => ({ ...prevState, deviceToken: token }));
  //       });
  //   } else {
  //     console.log("Authorization status:", authStatus);
  //   }
  // }, []);

  const [errors, setErrors] = React.useState({});
  const { user } = route.params;

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length <= 5) {
      handleError(
        "La longueur minimale du mot de passe est de 6 caractères.",
        "password"
      );
      isValid = false;
    }
    if (!inputs.confirmation) {
      handleError("Please confirm your password", "confirmation");
      isValid = false;
    } else if (inputs.password != inputs.confirmation) {
      handleError("password and confirm password do not match", "confirmation");
      isValid = false;
    }

    if (isValid) {
      dispatch(
        register({
          ...user,
          role: "USER",
          password: inputs.password,
          // deviceToken: inputs.deviceToken,
        })
      );
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <Loader visible={loading}/>
      {/* <Loader visible={loading} /> */}
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: Colors.black, fontSize: 40, fontWeight: "bold" }}>
          S'inscrire
        </Text>
        <Text style={{ color: Colors.grey, fontSize: 16, marginVertical: 10 }}>
          Entrez votre coordonnées pour vous inscrire
        </Text>
        <View style={{ marginVertical: 10 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Mot de Passe"
            placeholder="Entrer un mot de passe"
            error={errors.password}
            password
            pwd
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "confirmation")}
            onFocus={() => handleError(null, "confirmation")}
            iconName="lock-outline"
            label="Confirmation"
            placeholder="Confirmer le mot de passe"
            error={errors.confirmation}
            password
            pwd
          />
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MailAndPhoneScreen", { user: { ...user } })
              }
              className="flex-row items-center justify-center px-12 py-3 my-3 rounded-lg"
              style={{ backgroundColor: Colors.red }}
            >
              <Text className="text-xl font-bold text-white text-c">
                Retoure
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={validate}
              className="flex-row items-center justify-center px-12 py-3 my-3 rounded-lg"
              style={{ backgroundColor: Colors.green }}
            >
              <Text className="text-xl font-bold text-white text-c">
                Suivant
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: Colors.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Vous avez déjà un compte ? Se connecter
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PasswordScreen;
