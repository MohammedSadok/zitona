import { createStackNavigator } from "@react-navigation/stack";
import Arrosage from "../screens/Arrosage";
import Fertilisation from "../screens/Fertilisation";
import Maladie from "../screens/Maladie";
import Recolt from "../screens/Recolt";
import AnimTab1 from "./BottomNavigation";
const Stack = createStackNavigator();

const BosketNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="AnimTab1"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AnimTab1" component={AnimTab1} />
      <Stack.Screen name="Arrosage" component={Arrosage} />
      <Stack.Screen name="Fertilisation" component={Fertilisation} />
      <Stack.Screen name="Maladie" component={Maladie} />
      <Stack.Screen name="Recolt" component={Recolt} />
    </Stack.Navigator>
  );
};

export default BosketNavigation;
