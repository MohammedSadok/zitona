import { createStackNavigator } from "@react-navigation/stack";
import Recolt from "../screens/Recolt";
import Fertilisation from "../screens/Fertilisation";
import Maladie from "../screens/Maladie";
import NewTask from "../screens/NewTask";
import Bosket from "../screens/Bosket";
import Traitement from "../screens/Traitement";
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
      <Stack.Screen name="Recolt" component={Recolt} />
      <Stack.Screen name="Fertilisation" component={Fertilisation} />
      <Stack.Screen name="Maladie" component={Maladie} />
      <Stack.Screen name="Traitement" component={Traitement} />
      <Stack.Screen
        name="NewTask"
        component={NewTask}
        options={{ title: "Nouvelle Tache" }}
      />
    </Stack.Navigator>
  );
};

export default BosketNavigation;
