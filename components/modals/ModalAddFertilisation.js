import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from "react";
import ModalPopUp from "./ModalPopUp";
import Colors from "../../constants/Colors";
import Input from "../general/Input";
import Icon, { Icons } from "../general/Icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { useDispatch, useSelector } from "react-redux";
import {
  createFertilisation,
  updateFertilisation,
} from "../../redux/fertilisationSlice";
import { formatDate } from "../../utils/dateHandlers";

const width = Dimensions.get("screen").width;

const ModalAddFertilisation = ({
  isVisible,
  ok,
  cancel,
  id,
  toggleModalDelete,
}) => {
  const dispatch = useDispatch();
  const fertilisation = useSelector((state) =>
    state.fertilisations.fertilisations.find((element) => element.id === id)
  );
  const { token } = useSelector((state) => state.userAuth);
  const { parcelle } = useSelector((state) => state.parcelles);
  const [inputs, setInputs] = useState({
    date: new Date(),
    commentaire: null,
    quantite: "",
    typeDengrais: "",
    cout: "",
    parcelle: {
      id: parcelle.id,
    },
  });

  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (fertilisation && id !== 0) {
      setInputs({
        ...fertilisation,
        parcelle: {
          id: parcelle.id,
        },
      });
      setDate(new Date(inputs.date));
    } else {
      setInputs({
        date: new Date(),
        commentaire: null,
        quantite: "",
        typeDengrais: "",
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
    if (!inputs.quantite) {
      handleError("Vous devez entrer la quantite", "quantite");
      isValid = false;
    }
    if (!inputs.commentaire) {
      handleError("Vous devez entrer un commentaire", "commentaire");
      isValid = false;
    }
    if (!inputs.typeDengrais) {
      handleError(
        "Vous devez entrer un commentaire type dengrais !",
        "typeDengrais"
      );
      isValid = false;
    }
    if (!inputs.cout) {
      handleError("Vous devez entrer le cout", "cout");
      isValid = false;
    }
    if (isValid) {
      inputs.date = formatDate(date);
      if (fertilisation && id !== 0) 
        dispatch(updateFertilisation({ fertilisation: inputs, token: token }));
       else dispatch(createFertilisation({ fertilisation: inputs, token: token }));
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
    <ModalPopUp isVisible={isVisible} setIsVisible={cancel} title="Fertilisation">
      <ScrollView className="px-1" style={{ width: width * 0.85 }}>
        <View className="w-full">
          <Input
            onChangeText={(text) => handleOnchange(text, "typeDengrais")}
            onFocus={() => handleError(null, "typeDengrais")}
            label="type dengrais "
            placeholder="Enter le type dengrais"
            error={errors.typeDengrais}
            value={inputs.typeDengrais + ""}
          />
          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "quantite")}
            onFocus={() => handleError(null, "quantite")}
            label="La quantité "
            placeholder="Enter quantité en kg..."
            error={errors.quantite}
            value={inputs.quantite + ""}
          />

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
            {fertilisation && (
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

export default ModalAddFertilisation;
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
