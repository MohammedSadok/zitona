import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import React from "react";
import ModalPopUp from "./ModalPopUp";
import Colors from "../../constants/Colors";
import Input from "../general/Input";
import { useSelector } from "react-redux";
const width = Dimensions.get("screen").width;
const ModalPassword = ({ isVisible, ok, cancel }) => {
  const { user } = useSelector((state) => state.userAuth);
  const [inputs, setInputs] = React.useState({
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (inputs.password !== user.password) {
      handleError("le mot de passe est incorrecte", "password");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      ok();
      cancel();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <ModalPopUp isVisible={isVisible} setIsVisible={cancel} title="Securite">
      <View style={{ width: width * 0.8 }}>
        <Input
          onChangeText={(text) => handleOnchange(text, "password")}
          onFocus={() => handleError(null, "password")}
          iconName="lock-outline"
          label="Mot de Passe"
          placeholder="Entrer le mot de passe"
          error={errors.password}
          password
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
              Vérifier
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalPopUp>
  );
};

export default ModalPassword;
