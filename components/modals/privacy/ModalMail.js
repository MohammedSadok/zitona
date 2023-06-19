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

const ModalMail = ({ isVisible, changeVisibility }) => {
  const [errors, setErrors] = React.useState({});
  const [inputs, setInputs] = React.useState({
    email: "",
    emailConfirmation: "",
  });
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Veuillez entrer votre email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Veuillez entrer un mail valide", "email");
      isValid = false;
    }
    if (inputs.email != inputs.emailConfirmation) {
      handleError("L'email et la confirmation de l'email ne correspondent pas.", "emailConfirmation");
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
      title="Changer l'adresse mail"
    >
      <View style={{ width: width * 0.8 }}>
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

export default ModalMail;
