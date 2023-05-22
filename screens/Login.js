import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import { useState } from "react";

const Login = ({navigation}) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      // loginUser();
      console.log(inputs);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <View style={styles.imageContainer}>
        {/* <Image
          style={styles.image}
          source={require("../assets/logo.png")}
        /> */}
      </View>
      {/* <Loader visible={loading} /> */}
      <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        <Text style={{ color: Colors.black, fontSize: 40, fontWeight: "bold" }}>
          Log In
        </Text>
        <Text style={{ color: Colors.grey, fontSize: 18, marginTop: 5 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <TouchableOpacity
            onPress={validate}
            className="flex-row items-center justify-center px-6 py-3 my-3 rounded-lg"
            style={{ backgroundColor: Colors.green }}
          >
            <Text className="text-xl font-bold text-white text-c">Log In</Text>
          </TouchableOpacity>

          <Text
            onPress={() => navigation.navigate("NameScreen")}
            style={{
              color: Colors.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Don't have account ?Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: 60,
    height: 300,
    resizeMode: "contain",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 150
  },
});
export default Login;
