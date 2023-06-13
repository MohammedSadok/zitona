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
import { createParcelle, updateParcelle } from "../../redux/parcelleSlice";

const width = Dimensions.get("screen").width;
const oliveVarieties = [
  "Picholine",
  "Haouzia",
  "Menara",
  "Dahbia",
  "Moroccan Picholine",
  "Meski",
  "Touhami",
  "Mozafati",
  "Moroccan Amfissa",
];

const ModalAddBosket = ({ isVisible, ok, cancel, id }) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    nom: "",
    nombreDarbre: 0,
    varieter: "Picholine",
    dateDePlantation: new Date(),
    type_darossage: "",
    debit: 0,
    localisation: "",
    user: {
      id: 1
    }
  });

  const [isSelected, setSelection] = useState(false);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const parcelle = useSelector((state) =>
    state.parcelles.parcelles.find((element) => element.id === id)
  );
  useEffect(() => {
    if (parcelle && id !== 0) {
      setInputs(parcelle);
      if (parcelle.type_darossage !== "") {
        setSelection(true);
        setDate(new Date(inputs.dateDePlantation));
      }
    } else {
      setInputs({
        nom: "",
        nombreDarbre: 0,
        varieter: "Picholine",
        dateDePlantation: new Date(),
        type_darossage: "",
        debit: 0,
        localisation: "",
        user: {
          id: 1
        }
      });
      setDate(new Date());
      setSelection(false);
    }
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
    if (!inputs.nom) {
      handleError("Entrer le titre", "nom");
      isValid = false;
    }
    if (!inputs.nombreDarbre) {
      handleError("Entrer le nombre d'arbre", "nombreDarbre");
      isValid = false;
    }
    if (!inputs.localisation) {
      handleError("Entrer localisation", "localisation");
      isValid = false;
    }
    if (!inputs.debit && isSelected) {
      handleError("Entrer le Debit d'arossage", "debit");
      isValid = false;
    }
    if (isValid) {
      if (parcelle) {
        inputs.dateDePlantation = formatDate(date);
        dispatch(updateParcelle(inputs));
        ok();
      } else {
        inputs.type_darossage = "goute a goutte";
        inputs.dateDePlantation = formatDate(date);
        dispatch(createParcelle(inputs));
        ok();
      }
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
          <Input
            onChangeText={(text) => handleOnchange(text, "nom")}
            onFocus={() => handleError(null, "nom")}
            label="Titre"
            placeholder="Entrer un titre "
            error={errors.nom}
            value={inputs.nom + ""}
          />
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "nombreDarbre")}
            onFocus={() => handleError(null, "nombreDarbre")}
            label="Nombre d'arbre"
            placeholder="0"
            error={errors.nombreDarbre}
            value={inputs.nombreDarbre + ""}
          />
          <Text className="mb-2">Varieter</Text>
          <SelectDropdown
            data={oliveVarieties}
            defaultValue={inputs.varieter + ""}
            onSelect={(selectedItem, index) => {
              setInputs((prevState) => ({
                ...prevState,
                varieter: selectedItem,
              }));
            }}
            defaultButtonText={"Sélectionner la variété"}
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
          <Text className="my-2">Date de Plantation</Text>
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
          <View className="flex-row items-center my-2">
            <Checkbox
              className="w-6 h-6 rounded-md"
              value={isSelected}
              onValueChange={setSelection}
              color={isSelected ? Colors.green : undefined}
            />
            <Text
              className="ml-2 text-lg"
              style={{ fontFamily: "Mulish_700Bold" }}
            >
              L 'arossage?
            </Text>
          </View>
          {isSelected && (
            <Input
              keyboardType="numeric"
              onChangeText={(text) => handleOnchange(text, "debit")}
              onFocus={() => handleError(null, "debit")}
              label="Debit"
              placeholder="0.00"
              error={errors.debit}
              value={inputs.debit + ""}
            />
          )}
          <Input
            onChangeText={(text) => handleOnchange(text, "localisation")}
            onFocus={() => handleError(null, "localisation")}
            label="Adresse"
            placeholder="Adresse du parseil d'oliviers ..."
            error={errors.localisation}
            value={inputs.localisation}
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

export default ModalAddBosket;

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
