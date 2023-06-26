import React from "react";
import { View, Text, Keyboard, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import Input from "../../components/general/Input";
import { SafeAreaView } from "react-native-safe-area-context";

const NameScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.firstName) {
      handleError("Veuillez entrer le prénom", "firstName");
      isValid = false;
    }

    if (!inputs.lastName) {
      handleError("Veuillez entrer le nom", "lastName");
      isValid = false;
    }

    if (isValid) {
      navigation.navigate("MailAndPhoneScreen", {
        user: { prenom: inputs.firstName, nom: inputs.lastName },
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 50,
      }}
    >
      <Text style={{ color: Colors.black, fontSize: 40, fontWeight: "bold" }}>
        S'inscrire
      </Text>
      <Text style={{ color: Colors.grey, fontSize: 16, marginVertical: 10 }}>
        Entrez votre coordonnées pour vous inscrire
      </Text>
      <View style={{ marginVertical: 10 }}>
        <Input
          onChangeText={(text) => handleOnchange(text, "firstName")}
          onFocus={() => handleError(null, "firstName")}
          iconName="account-outline"
          label="Prénom"
          placeholder="Entrer votre prénom"
          error={errors.firstName}
        />
        <Input
          onChangeText={(text) => handleOnchange(text, "lastName")}
          onFocus={() => handleError(null, "lastName")}
          iconName="account-outline"
          label="Nom"
          placeholder="Entrer votre nom"
          error={errors.lastName}
        />

        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack(null)}
            className="flex-row items-center justify-center px-12 py-3 my-3 rounded-lg"
            style={{ backgroundColor: Colors.red }}
          >
            <Text className="text-xl font-bold text-white text-c">Retour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={validate}
            className="flex-row items-center justify-center px-12 py-3 my-3 rounded-lg"
            style={{ backgroundColor: Colors.green }}
          >
            <Text className="text-xl font-bold text-white text-c">Suivant</Text>
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
    </SafeAreaView>
  );
};

export default NameScreen;
