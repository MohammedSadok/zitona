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
import { formatDate } from "../../utils/dateHandlers";

const width = Dimensions.get("screen").width;

const ModalAddMalade = ({ isVisible, ok, cancel, id, toggleModalDelete }) => {
  const dispatch = useDispatch();
  const parcelle = useSelector((state) => state.parcelles.parcelle);
  const { token } = useSelector((state) => state.userAuth);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const malade = useSelector((state) =>
    state.malades.malades.find((element) => element.id === id)
  );
  const listMaladies = useSelector((state) => state.malades.listMaladies);
  const [inputs, setInputs] = useState({
    date: new Date(),
    commentaire: "",
    maladie: {
      nom: "",
    },
    parcelle: {
      id: parcelle.id,
    },
  });

  useEffect(() => {
    if (malade && id !== 0) {
      setDate(new Date(inputs.date));
      setInputs({
        ...malade,
        parcelle: {
          id: parcelle.id,
        },
      });
    } else {
      setInputs({
        date: new Date(),
        commentaire: "",
        maladie: {
          nom: "",
        },
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
    if (!inputs.commentaire) {
      handleError("Vous devez entrer un commentaire", "commentaire");
      isValid = false;
    }
    if (!inputs.maladie) {
      handleError("Vous devez choisir une maladie !", "maladie");
      isValid = false;
    }
    if (isValid) {
      inputs.date = formatDate(date);
      if (malade && id !== 0) dispatch(updateMalade({ malade: inputs, token: token }));
      else dispatch(createMalade({ malade: inputs, token: token }));
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
      title="Parselle malade"
      className="w-11/12"
    >
      <ScrollView className="px-1">
        <View className="w-full">
          <Text className="mb-2">Maladie</Text>
          <SelectDropdown
            data={listMaladies.map((element) => element.nom)}
            defaultValue={inputs.maladie.nom}
            onSelect={(selectedItem, index) => {
              const selectedMaladie = listMaladies.filter(
                (element) => element.nom === selectedItem
              );
              setInputs((prevState) => ({
                ...prevState,
                maladie: selectedMaladie[0],
              }));
              setErrors((prevState) => ({ ...prevState, maladie: "" }));
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
            <Text className="text-xs text-red-500">{errors.maladie}</Text>
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
            height={100}
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
            {malade && (
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
