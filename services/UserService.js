import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  createAccountStart,
  createAccountSuccess,
  createAccountFailure,
} from "../redux/authSlice";
import axios from "axios";
import ApiUrl from "../constants/ApiUrl";
export const checkLoggedInUser = () => async (dispatch) => {
  console.log("Checking");
  try {
    // Retrieve user data from AsyncStorage
    const userData = await AsyncStorage.getItem("userData");

    if (userData) {
      const user = JSON.parse(userData);
      dispatch(loginSuccess(user));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    dispatch(logout());
  }
};

// Function for logging in
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());

    // Perform your login API call here
    // Example:
    // const response = await api.login(email, password); // Replace api.login with your actual login API call

    // Simulating a successful login
    // const { token, user } = response; // Adjust the response structure to match your API response

    // Store user data in AsyncStorage

    const response = await axios
      .get(
        "https://zitona-production.up.railway.app/users/email/johndoe@example.fr"
      )
      .catch(function (error) {
        console.log(error);
      });
    const user = response.data.data;
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Function for logging out
export const logout = () => async (dispatch) => {
  try {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem("userData");

    dispatch(logoutStart());
  } catch (error) {
    console.log("Error logging out:", error);
  }
};

// Function for registering a new account
export const register = (email, password) => async (dispatch) => {
  try {
    dispatch(createAccountStart());

    // Perform your registration API call here
    // Example:
    // const response = await api.register(email, password); // Replace api.register with your actual registration API call

    // Simulating a successful registration
    //const { token, user } = response; // Adjust the response structure to match your API response

    // Store user data in AsyncStorage
    await AsyncStorage.setItem("userData", JSON.stringify(user));

    dispatch(createAccountSuccess(user));
  } catch (error) {
    dispatch(createAccountFailure(error.message));
  }
};
