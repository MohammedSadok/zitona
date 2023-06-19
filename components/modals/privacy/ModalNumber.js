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

const ModalNumber = ({ isVisible, changeVisibility }) => {
  const [errors, setErrors] = React.useState({});
  const [inputs, setInputs] = React.useState({
    phone: "",
  });
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.phone) {
      handleError("Veuillez entrer le numéro de téléphone", "phone");
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
      title="Changer le numéro"
    >
      <View style={{ width: width * 0.8 }}>
        <Input
          keyboardType="numeric"
          onChangeText={(text) => handleOnchange(text, "phone")}
          onFocus={() => handleError(null, "phone")}
          iconName="phone-outline"
          label="Numéro de téléphone"
          placeholder="Enter votre numéro de téléphone"
          error={errors.phone}
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

export default ModalNumber;
