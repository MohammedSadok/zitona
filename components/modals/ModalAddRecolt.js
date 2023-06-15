import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from "react-native";
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
import { createRecolt, updateRecolt } from "../../redux/recoltSlice";
import { formatDate } from "../../utils/dateHandlers";

const width = Dimensions.get("screen").width;
var methodesRecolte = [
  "Manuelle",
  "Mécanique",
  "Combinée",
  "À peigne",
  "À secouage manuel",
  "À secouage pneumatique",
];

const ModalAddRecolt = ({ isVisible, ok, cancel, id, toggleModalDelete }) => {
  const dispatch = useDispatch();
  const recolt = useSelector((state) =>
    state.recolts.recolts.find((element) => element.id === id)
  );

  const { parcelle } = useSelector((state) => state.parcelles);
  const [inputs, setInputs] = useState({
    date: new Date(),
    commentaire: "",
    quantite: "",
    methode: "",
    qualite: "Vierge",
    cout: "",
    parcelle: {
      id: parcelle.id,
    },
  });

  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (recolt && id !== 0) {
      setInputs({
        ...recolt,
        parcelle: {
          id: parcelle.id,
        },
      });
      setDate(new Date(inputs.date));
    } else {
      setInputs({
        date: new Date(),
        commentaire: "",
        quantite: "",
        methode: "",
        qualite: "Vierge",
        cout: "",
        parcelle: {
          id: parcelle.id,
        },
      });
      setErrors({});
      setDate(new Date());
    }
  }, [id, isVisible]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.quantite) {
      handleError("Vous devez entrer la quantite", "quantite");
      isValid = false;
    }
    if (!inputs.commentaire) {
      handleError("Vous devez entrer un commentaire", "commentaire");
      isValid = false;
    }
    if (!inputs.methode) {
      handleError("Vous devez choisir une méthodes de récolte !", "methode");
      isValid = false;
    }
    if (!inputs.cout) {
      handleError("Vous devez entrer le cout", "cout");
      isValid = false;
    }
    if (isValid) {
      inputs.date = formatDate(date);
      if (recolt && id !== 0) dispatch(updateRecolt(inputs));
      else dispatch(createRecolt(inputs));
      ok();
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
      title="Récolt"
      className="w-11/12"
    >
      <ScrollView className="px-1">
        <View className="w-full">
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "quantite")}
            onFocus={() => handleError(null, "quantite")}
            label="La quantité "
            placeholder="Enter quantité recolter en kg..."
            error={errors.quantite}
            value={inputs.quantite + ""}
          />
          <Text className="mb-2">Méthodes de récolt</Text>
          <SelectDropdown
            data={methodesRecolte}
            defaultValue={inputs.methode}
            onSelect={(selectedItem, index) => {
              setInputs((prevState) => ({
                ...prevState,
                methode: selectedItem,
              }));
              setErrors((prevState) => ({ ...prevState, methode: "" }));
            }}
            defaultButtonText={"Sélectionner la methode"}
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
          {errors.methode && (
            <Text className="text-xs text-red-500">{errors.methode}</Text>
          )}
          <Text className="my-1">Date</Text>
          <TouchableOpacity
            className="flex-row items-center justify-between p-2 mb-1 border-black rounded-md"
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
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "cout")}
            onFocus={() => handleError(null, "cout")}
            label="Le cout "
            placeholder="Enter le Cout en DH..."
            error={errors.cout}
            value={inputs.cout + ""}
          />
          <Input
            height={80}
            multiline
            onChangeText={(text) => handleOnchange(text, "commentaire")}
            onFocus={() => handleError(null, "commentaire")}
            label="Commentaire"
            placeholder="commentaire ..."
            error={errors.commentaire}
            value={inputs.commentaire}
          />
          <View className="flex-row-reverse justify-between">
            <TouchableOpacity
              onPress={validate}
              className="flex-row items-center justify-center px-2 py-3 my-3 rounded-lg"
              style={{ backgroundColor: Colors.blue }}
            >
              <Icon
                type={Icons.Feather}
                name={"save"}
                color={"white"}
                size={32}
              />
              <Text
                className="ml-1 text-base text-white"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                Enregistrer
              </Text>
            </TouchableOpacity>
            {recolt && (
              <TouchableOpacity
                onPress={toggleModalDelete}
                className="flex-row items-center justify-center px-2 py-3 my-3 mr-2 rounded-lg"
                style={{ backgroundColor: Colors.red }}
              >
                <Icon
                  type={Icons.AntDesign}
                  name={"delete"}
                  color={"white"}
                  size={28}
                />
                <Text
                  className="ml-1 text-base text-white"
                  style={{ fontFamily: "Mulish_700Bold" }}
                >
                  Supprimer
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </ModalPopUp>
  );
};

export default ModalAddRecolt;
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
