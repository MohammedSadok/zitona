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
  const [loading, setLoading] = React.useState(false);

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
      handleError("Please input firstName", "firstName");
      isValid = false;
    }
    if (!inputs.lastName) {
      handleError("Please input lastName", "lastName");
      isValid = false;
    }
    if (isValid) {
      // register();
      console.log(inputs);
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.backgroundColor,
      }}
      className='flex-1 px-5 pt-10'
    >
      <Text style={{ color: Colors.black, fontSize: 40, fontWeight: "bold" }}>
        Register
      </Text>
      <Text style={{ color: Colors.grey, fontSize: 18, marginVertical: 10 }}>
        Entrer Ton Nom et Prenom
      </Text>
      <View style={{ marginVertical: 20 }}>
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
          error={errors.firstName}
        />

        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack(null)}
            className="flex-row items-center justify-center px-12 py-3 my-3 rounded-lg"
            style={{ backgroundColor: Colors.red }}
          >
            <Text className="text-xl font-bold text-white text-c">Retoure</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MailAndPhoneScreen")}
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
          Already have account ?Login
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default NameScreen;
