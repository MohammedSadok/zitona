import { createStackNavigator } from "@react-navigation/stack";
import Recolt from "../screens/Recolt";
import Fertilisation from "../screens/Fertilisation";
import Maladie from "../screens/Maladie";
import Traitement from "../screens/Traitement";
import Bosket from "../screens/Bosket";
import TraitementFSTR from "../screens/TraitementFSTR";
import NotificationScreen from "../screens/profile/NotificationScreen";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";

const Stack = createStackNavigator();
const BosketNavigation = () => {
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
        name="Bosket"
        component={Bosket}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recolt"
        component={Recolt}
        options={{ title: "Récolte" }}
      />
      <Stack.Screen name="Fertilisation" component={Fertilisation} />
      <Stack.Screen name="Maladie" component={Maladie} />
      <Stack.Screen name="TraitementFSTR" component={TraitementFSTR} />
      <Stack.Screen
        name="Traitement"
        component={Traitement}
        options={{ title: "Traitement" }}
      />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default BosketNavigation;
