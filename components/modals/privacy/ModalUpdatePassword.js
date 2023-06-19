import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import React from "react";
import ModalPopUp from "../ModalPopUp";
import Colors from "../../../constants/Colors";
import Input from "../../general/Input";
const width = Dimensions.get("screen").width;

const ModalUpdatePassword = ({ isVisible, changeVisibility }) => {
  const [inputs, setInputs] = React.useState({
    password: "",
    confirmation: "",
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (!inputs.password.length < 6) {
      handleError("min length 6 car", "password");
      isValid = false;
    }
    if (!inputs.confirmation) {
      handleError("min length 6 car", "confirmation");
      isValid = false;
    } else if (inputs.password != inputs.confirmation) {
      handleError("password and confirm password do not match", "confirmation");
      isValid = false;
    }
    if (isValid) {
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
    <ModalPopUp
      isVisible={isVisible}
      setIsVisible={changeVisibility}
      title="Securite"
    >
      <View style={{ width: width * 0.8 }}>
        <Input
          onChangeText={(text) => handleOnchange(text, "password")}
          onFocus={() => handleError(null, "password")}
          iconName="lock-outline"
          label="Mot de Passe"
          placeholder="Entrer le mot de passe"
          error={errors.password}
          password
          pwd
          className
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
        <View className="flex-row-reverse items-center justify-between ">
          <TouchableOpacity
            className="px-4 py-2.5  rounded-md"
            onPress={validate}
            style={{ backgroundColor: Colors.blue }}
          >
            <Text
              className="text-xl text-white"
              style={{ fontFamily: "Mulish_700Bold" }}
            >
              Enregistrer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalPopUp>
  );
};

export default ModalUpdatePassword;
