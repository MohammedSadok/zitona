import { createStackNavigator } from "@react-navigation/stack";
import MailAndPhoneScreen from "../screens/Registration/MailAndPhoneScreen";
import NameScreen from "../screens/Registration/NameScreen";
import PasswordScreen from "../screens/Registration/PasswordScreen";
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

const LoginNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NameScreen" component={NameScreen} />
        <Stack.Screen
          name="MailAndPhoneScreen"
          component={MailAndPhoneScreen}
        />
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;
