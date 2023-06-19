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
      handleError("Veuillez entrer email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Veuillez entrer un mail valide", "email");
      isValid = false;
    }
    if (inputs.email != inputs.emailConfirmation) {
      handleError(
        "L'email et la confirmation de l'email ne correspondent pas.",
        "emailConfirmation"
      );
      isValid = false;
    }
    if (!inputs.phone) {
      handleError("Veuillez entrer le numéro de téléphone", "phone");
      isValid = false;
    }
    if (isValid) {
      navigation.navigate("PasswordScreen", {
        user: { email: inputs.email, telephone: inputs.phone, ...user },
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
      {/* <Loader visible={loading} /> */}
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: Colors.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: Colors.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "emailConfirmation")}
            onFocus={() => handleError(null, "emailConfirmation")}
            iconName="email-outline"
            label="Email Confirmation"
            placeholder="Enter your email address"
            error={errors.emailConfirmation}
          />
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            iconName="phone-outline"
            label="Numéro de téléphone"
            placeholder="Enter votre numéro de téléphone"
            error={errors.phone}
          />
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MailAndPhoneScreen", {
                  user: { ...user }
                })
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
            Vous avez déjà un compte ? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MailAndPhoneScreen;
