import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification,sortByDate } from "../../redux/notificationSlice";
import Colors from "../../constants/Colors";
import Icon, { Icons } from "../../components/general/Icons";
import Loader from "../../components/general/Loader";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
const NotificationScreen = () => {
  const dispatch = useDispatch();
  const { parcelle } = useSelector((state) => state.parcelles);
  const { loading, error, notification } = useSelector(
    (state) => state.notifications
  );
  const { token, user } = useSelector((state) => state.userAuth);
  const [isEnabled, setIsEnabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    dispatch(fetchNotification({ token: token, id: parcelle.id }));
  }, [dispatch]);

  const Items = ({ item }) => {
    return (
      <View className="pt-1 px-2 mx-2 bg-white rounded-lg pb-0.5 mb-2" style={styles.container}>
        <Text style={{ fontFamily: "Mulish_700Bold" }} className="text-lg">
          {item.object}
        </Text>
        <Text
          style={{ fontFamily: "Mulish_400Regular" }}
          className="text-sm"
        >
          {item.content}
        </Text>
        <Text
          className="text-xs text-right text-gray-400"
          style={{ fontFamily: "Mulish_400Regular" }}
        >
          {item.date}
        </Text>
      </View>
    );
  };

  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <View
      style={{ backgroundColor: Colors.backgroundColor }}
      className="h-screen"
    >
      <Loader visible={loading} />
      <View className="flex-row items-center justify-between p-2 px-3">
        <View className="flex-row items-center justify-center">
          <Text
            style={{ fontFamily: "Mulish_700Bold" }}
            className="mr-2 text-xl"
          >
            Notification
          </Text>
          <Switch
            trackColor={{ false: Colors.gray, true: Colors.primary }}
            thumbColor={isEnabled ? Colors.primary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity
              onPress={() => setVisible(true)}
              className="flex-row items-center justify-between"
            >
              <Text
                className="mr-2 text-xl"
                style={{ fontFamily: "Mulish_700Bold" }}
              >
                Trier
              </Text>
              <Icon
                type={Icons.Feather}
                size={24}
                color={"black"}
                name={"sliders"}
              />
            </TouchableOpacity>
          }
          onRequestClose={() => setVisible(false)}
          className="w-24"
        >
          <MenuItem
            onPress={() => {
              dispatch(sortByDate());
              setVisible(false);
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text style={{ fontFamily: "Mulish_700Bold" }}>Date</Text>
            </View>
          </MenuItem>
          <MenuDivider />
        </Menu>
      </View>

      {notification.length > 0 ? (
        <FlatList
          data={notification}
          renderItem={Items}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text className="mt-6 text-xl font-bold text-center">
          Aucune notification enregistrer !
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});
export default NotificationScreen;
