import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import ModalPopUp from "./ModalPopUp";
import Colors from "../../constants/Colors";
import SelectDropdown from "react-native-select-dropdown";
import Input from "../general/Input";
const countries = ["Egypt", "Canada", "Australia", "Ireland"];
const ModalAddBosket = ({ isVisible, ok, cancel }) => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    console.log(formatDate(currentDate));
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
    if (!inputs.firstName) {
      handleError("Please input firstName", "firstName");
      isValid = false;
    }
    if (!inputs.lastName) {
      handleError("Please input lastName", "lastName");
      isValid = false;
    }
    if (isValid) {
      // register();
      console.log(inputs);
    }
  };
  return (
    <ModalPopUp
      isVisible={isVisible}
      setIsVisible={cancel}
      title="Creer un Parseil"
    >
      <View className="w-11/12 px-3 h-5/6">
        {/* <Text className="">Vouler vous vraiement quitter l'application</Text> */}
        {/* <View className="flex-row items-center justify-between mt-5 mb-3 space-x-6">
          <TouchableOpacity
            className="px-6 py-2.5 bg-red-600 rounded-md"
            onPress={ok}
          >
            <Text
              className="text-xl text-white"
              style={{ fontFamily: "Mulish_700Bold" }}
            >
              Oui
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-6 py-2.5 bg-slate-300 rounded-md"
            onPress={cancel}
          >
            <Text className="text-xl" style={{ fontFamily: "Mulish_700Bold" }}>
              Annuler
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={{ marginVertical: 20 }} className="w-72">
          <Input
            onChangeText={(text) => handleOnchange(text, "firstName")}
            onFocus={() => handleError(null, "firstName")}
            label="Prénom"
            placeholder="Entrer votre prénom"
            error={errors.firstName}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "lastName")}
            onFocus={() => handleError(null, "lastName")}
            label="Nom"
            placeholder="Entrer votre nom"
            error={errors.firstName}
          />
          <Text className="my-2">Varieter</Text>
          <SelectDropdown
            data={countries}
            // defaultValueByIndex={1}
            // defaultValue={'England'}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
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
                  color={"#FFF"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
          <Button title="Select Date" onPress={showDatePickerHandler} />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={handleDateChange}
            />
          )}
          <Text>{formatDate(date)}</Text>
          {/* <RNDateTimePicker mode="date" value={new Date()}/> */}
          {/* 
          <TouchableOpacity
            onPress={() => navigation.navigate("MailAndPhoneScreen")}
            className="flex-row items-center justify-center px-12 py-3 my-3 rounded-lg"
            style={{ backgroundColor: Colors.green }}
          >
            <Text className="text-xl font-bold text-white text-c">Suivant</Text>
          </TouchableOpacity> */}

          {/* <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: Colors.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Already have account ?Login
          </Text> */}
        </View>
      </View>
    </ModalPopUp>
  );
};

export default ModalAddBosket;

const styles = StyleSheet.create({
  dropdown2BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.blue,
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: Colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: {
    backgroundColor: Colors.blue,
    borderRadius: 12,
  },
  dropdown2RowStyle: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.blue,
  },
  dropdown2RowTxtStyle: {
    color: Colors.blue,
    textAlign: "center",
    fontWeight: "bold",
  },
});
