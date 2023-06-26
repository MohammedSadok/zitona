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

const MailAndPhoneScreen = ({ navigation, route }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    emailConfirmation: "",
    phone: "",
  });

  const [errors, setErrors] = React.useState({});
  const { user } = route.params;

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Veuillez entrer une adresse email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Veuillez entrer une adresse email valide", "email");
      isValid = false;
    }

    if (inputs.email !== inputs.emailConfirmation) {
      handleError(
        "L'adresse email et la confirmation de l'adresse email ne correspondent pas.",
        "emailConfirmation"
      );
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Veuillez entrer le numéro de téléphone", "phone");
      isValid = false;
    }

    if (inputs.phone.trim().length !== 10) {
      handleError("Veuillez entrer un numéro correct", "phone");
      isValid = false;
    }

    if (isValid) {
      navigation.navigate("PasswordScreen", {
        user: { ...user, email: inputs.email, telephone: inputs.phone },
      });
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
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Entrez votre adresse email"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "emailConfirmation")}
            onFocus={() => handleError(null, "emailConfirmation")}
            iconName="email-outline"
            label="Confirmation de l'Email"
            placeholder="Entrez à nouveau votre adresse email"
            error={errors.emailConfirmation}
          />
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            iconName="phone-outline"
            label="Numéro de téléphone"
            placeholder="Entrez votre numéro de téléphone"
            error={errors.phone}
          />

          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("NameScreen", {
                  user: { ...user },
                })
              }
              className="flex-row items-center justify-center px-12 py-3 my-3 rounded-lg"
              style={{ backgroundColor: Colors.red }}
            >
              <Text className="text-xl font-bold text-white text-c">
                Retour
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
              marginTop: 10,
            }}
          >
            Vous avez déjà un compte ? Se connecter
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MailAndPhoneScreen;
