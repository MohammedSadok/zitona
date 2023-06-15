import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from "react";
import ModalPopUp from "./ModalPopUp";
import Colors from "../../constants/Colors";
import SelectDropdown from "react-native-select-dropdown";
import Input from "../general/Input";
import Icon, { Icons } from "../general/Icons";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/dateHandlers";
import {
  createTraitement,
  updateTraitement,
} from "../../redux/traitementSlice";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from "react-native";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";

const width = Dimensions.get("screen").width;
const typesTraitements = [
  "Élagage",
  "Gestion des mauvaises herbes",
  "Traitement phytosanitaire",
  "autre",
];
const ModalAddTraitement = ({
  isVisible,
  ok,
  cancel,
  id,
  toggleModalDelete,
}) => {
  const dispatch = useDispatch();
  const parcelle = useSelector((state) => state.parcelles.parcelle);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const traitement = useSelector((state) =>
    state.traitements.traitements.find((element) => element.id === id)
  );
  
  const [inputs, setInputs] = useState({
    date: new Date(),
    description: "",
    typeTraitement: "",
    cout: "",
    parcelle: {
      id: parcelle.id,
    },
  });

  useEffect(() => {
    if (traitement && id !== 0) {
      setDate(new Date(inputs.date));
      setInputs({
        ...traitement,
        parcelle: {
          id: parcelle.id,
        },
      });
    } else {
      setInputs({
        date: new Date(),
        comdescriptionmentaire: "",
        typeTraitement: "",
        cout: "",
        parcelle: {
          id: parcelle.id,
        },
      });
      setErrors({});
      setDate(new Date());
    }
  }, [id, isVisible]);
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.description) {
      handleError("Vous devez entrer une description", "description");
      isValid = false;
    }
    if (!inputs.cout) {
      handleError("Vous devez entrer le cout", "cout");
      isValid = false;
    }
    if (!inputs.typeTraitement) {
      handleError(
        "Vous devez choisir un  type de traitement !",
        "typeTraitement"
      );
      isValid = false;
    }
    if (isValid) {
      inputs.date = formatDate(date);
      if (traitement && id !== 0) dispatch(updateTraitement(inputs));
      else dispatch(createTraitement(inputs));
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
      title="Traitement"
      className="w-11/12"
    >
      <ScrollView className="px-1">
        <View className="w-full">
          <Text className="mb-2">Traitement</Text>
          <SelectDropdown
            data={typesTraitements}
            defaultValue={inputs.typeTraitement}
            onSelect={(selectedItem, index) => {
              setInputs((prevState) => ({
                ...prevState,
                typeTraitement: selectedItem,
              }));
              setErrors((prevState) => ({ ...prevState, typeTraitement: "" }));
            }}
            defaultButtonText={"Sélectionner le type de traitement"}
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
                <Icon
                type={Icons.FontAwesome}
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
          {errors.typeTraitement && (
            <Text className="text-xs text-red-500">
              {errors.typeTraitement}
            </Text>
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
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "cout")}
            onFocus={() => handleError(null, "cout")}
            label="Le cout "
            placeholder="Enter le Cout en DH..."
            error={errors.cout}
            value={inputs.cout + ""}
          />

          <Input
            height={100}
            multiline
            onChangeText={(text) => handleOnchange(text, "description")}
            onFocus={() => handleError(null, "description")}
            label="Description"
            placeholder="description ..."
            error={errors.description}
            value={inputs.description}
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
            {traitement && (
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

export default ModalAddTraitement;
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
