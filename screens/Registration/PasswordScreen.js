import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import Input from "../../components/general/Input";

const PasswordScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    password: "",
    confirmation: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

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
      // register();
      console.log(inputs);
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
      {/* <Loader visible={loading} /> */}
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: Colors.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: Colors.grey, fontSize: 18, marginVertical: 10 }}>
          Entrer votre mot de passe
        </Text>
        <View style={{ marginVertical: 20 }}>
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
          <View className='flex-row items-center justify-between'>
            <TouchableOpacity
              onPress={() => navigation.navigate("MailAndPhoneScreen")}
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
            Vous avez deja un compte ?Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PasswordScreen;
