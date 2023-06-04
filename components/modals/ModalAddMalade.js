import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from "react-native";
import Checkbox from "expo-checkbox";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from "react";
import ModalPopUp from "./ModalPopUp";
import Colors from "../../constants/Colors";
import SelectDropdown from "react-native-select-dropdown";
import Input from "../general/Input";
import Icon, { Icons } from "../general/Icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { useDispatch, useSelector } from "react-redux";
import { createMalade, updateMalade } from "../../redux/maladeSlice";
const width = Dimensions.get("screen").width;
const maladiesOlivier = [
  "Verticilliose",
  "Mouche de l'olive (Bactrocera oleae)",
  "Cochenille de l'olivier",
  "Flétrissement bactérien",
  "Graphiose de l'olivier",
  "Fumagine",
  "Phylloxéra de l'olivier",
  "Escarres de l'olivier",
  "Dégénérescence de l'olivier",
  "Tuberculose de l'olivier",
];

const ModalAddMalade = ({ isVisible, ok, cancel, id }) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    id: 5,
    maladie: "",
    date: new Date(),
    commentaire: null,
  });
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // const parseil = useSelector((state) =>
  //   state.parseils.parseils.find((element) => element.id === id)
  // );
  useEffect(() => {
    // if (parseil && id !== 0) {
    //   setInputs(parseil);
    //   if (parseil.type_darossage !== "") {
    //     setDate(new Date(inputs.date_de_plantations));
    //   }
    // } else {
    // }
    setInputs({
      id: 5,
      maladie: "",
      date: new Date(),
      commentaire: "",
    });
    setDate(new Date());
  }, [id]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.commentaire) {
      handleError("Vous devez entrer un commentaire", "commentaire");
      isValid = false;
    }
    if (!inputs.maladie) {
      handleError(
        "Vous devez choisir une maladie !",
        "maladie"
      );
      isValid = false;
    }
    if (isValid) {
      inputs.date = formatDate(date);
      // dispatch(updateParseil(inputs));
      // ok();
      console.log(inputs);
    }
  };

  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <ModalPopUp
      isVisible={isVisible}
      setIsVisible={cancel}
      title="Créer un Parseil"
      className="w-11/12"
    >
      <ScrollView className="px-1">
        <View className="w-full">
          <Text className="mb-2">Maladie</Text>
          <SelectDropdown
            data={maladiesOlivier}
            defaultValue={inputs.maladie + ""}
            onSelect={(selectedItem, index) => {
              setInputs((prevState) => ({
                ...prevState,
                maladie: selectedItem,
              }));
              setErrors((prevState) => ({ ...prevState, maladie: '' }));
            }}
            defaultButtonText={"Sélectionner la maladie"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={Colors.black}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
          {errors.maladie && (
            <Text className="text-sm text-red-500">{errors.maladie}</Text>
          )}
          <Text className="my-2">Date</Text>
          <TouchableOpacity
            className="flex-row items-center justify-between p-2 border-black rounded-md"
            style={{ borderWidth: 0.5 }}
            onPress={showDatePickerHandler}
          >
            <Text
              style={{ fontFamily: "Mulish_700Bold", color: Colors.green }}
              className="m-auto text-lg"
            >
              {formatDate(date)}
            </Text>
            <Icon
              color={Colors.black}
              name={"date"}
              type={Icons.Fontisto}
              size={26}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={handleDateChange}
            />
          )}

          <Input
            onChangeText={(text) => handleOnchange(text, "commentaire")}
            onFocus={() => handleError(null, "commentaire")}
            label="Commentaire"
            placeholder="commentaire ..."
            error={errors.commentaire}
            value={inputs.commentaire}
          />
          <View className="flex-row-reverse">
            <TouchableOpacity
              onPress={validate}
              className="flex-row items-center justify-center px-4 my-3 rounded-lg"
              style={{ backgroundColor: Colors.blue }}
            >
              <Text
                className="text-lg text-white"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                Enregistrer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancel}
              className="flex-row items-center justify-center px-4 py-3 my-3 mr-3 rounded-lg"
              style={{ backgroundColor: Colors.red }}
            >
              <Text
                className="text-lg text-white"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                Annuler
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ModalPopUp>
  );
};

export default ModalAddMalade;
const styles = StyleSheet.create({
  dropdown2BtnStyle: {
    width: width * 0.85,
    height: 45,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderColor: Colors.black,
    borderWidth: 0.5,
  },
  dropdown2BtnTxtStyle: {
    color: Colors.green,
    textAlign: "center",
    fontFamily: "Mulish_700Bold",
    fontSize: 18,
  },
  dropdown2DropdownStyle: {
    borderRadius: 12,
  },
  dropdown2RowStyle: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.black,
  },
  dropdown2RowTxtStyle: {
    color: Colors.black,
    textAlign: "center",
    fontFamily: "Mulish_700Bold",
    fontSize: 18,
  },
});
