import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import BosketsScreen from "../screens/profile/BosketsScreen";
import NotificationScreen from "../screens/profile/NotificationScreen";
import PortfolioScreen from "../screens/profile/PortfolioScreen";
import PrivacyScreen from "../screens/profile/PrivacyScreen";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const Stack = createStackNavigator();
const ProfileNavigation = () => {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <Stack.Navigator
      initialRouteName="Bosket"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Mulish_700Bold",
          letterSpacing: 1,
          fontSize: 24,
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Portefeuille" component={PortfolioScreen} />
      <Stack.Screen name="Boskets" component={BosketsScreen} options={{ title: "Parcelles" }}/>
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: "Sécurité" }}/>
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
