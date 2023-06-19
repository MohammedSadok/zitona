import AsyncStorage from "@react-native-async-storage/async-storage";
// Set the user data in localStorage

export const setUserToLocalStorage = async (user) => {
 await AsyncStorage.setItem("userData", JSON.stringify(user));
};

// Remove the user data from localStorage
export const removeUserFromLocalStorage = async() => {
  await AsyncStorage.removeItem("userData");
};



