import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useEffect } from "react";
import ModalPopUp from "../ModalPopUp";
import Colors from "../../../constants/Colors";
import Input from "../../general/Input";
const width = Dimensions.get("screen").width;
import Loader from "../../general/Loader";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileName } from "../../../redux/authSlice";
const ModalName = ({ isVisible, changeVisibility }) => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector(
    (state) => state.userAuth
  );
  const [errors, setErrors] = React.useState({});
  const [inputs, setInputs] = React.useState({
    firstName: "",
    lastName: "",
  });
  useEffect(() => {
    setInputs({
      firstName: user.nom,
      lastName: user.prenom,
    });
  }, [user.nom, user.prenom]);
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
      dispatch(
        updateProfileName({
          id: user.id,
          nom: inputs.lastName,
          prenom: inputs.firstName,
          token: token,
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
    <ModalPopUp
      isVisible={isVisible}
      setIsVisible={changeVisibility}
      title="Changer l'adresse mail"
    >
      <View style={{ width: width * 0.8 }}>
        <Input
          onChangeText={(text) => handleOnchange(text, "firstName")}
          onFocus={() => handleError(null, "firstName")}
          iconName="account-outline"
          label="Prénom"
          placeholder="Entrer votre prénom"
          error={errors.firstName}
          value={inputs.firstName + ""}
        />
        <Input
          onChangeText={(text) => handleOnchange(text, "lastName")}
          onFocus={() => handleError(null, "lastName")}
          iconName="account-outline"
          label="Nom"
          placeholder="Entrer votre nom"
          error={errors.lastName}
          value={inputs.lastName + ""}
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

export default ModalName;
