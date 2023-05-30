import Colors from "../constants/Colors";
import BosketNavigation from "./BosketNavigation";
import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileNavigation from "./ProfileNavigation";
import Icon, { Icons } from "../components/general/Icons";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Entypo,
    icon: "home",
    component: Home,
  },
  {
    route: "BosketNavigation",
    label: "Bosket",
    type: Icons.MaterialIcons,
    icon: "agriculture",
    component: BosketNavigation,
  },
  {
    route: "ProfileNavigation",
    label: "Profile",
    type: Icons.FontAwesome,
    icon: "user-circle-o",
    component: ProfileNavigation,
  },
];

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.gray,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                headerShown: false,
                tabBarIconStyle: {
                  padding: 0,
                  marginBottom: 0,
                },
                tabBarLabelStyle: {
                  fontFamily: "Mulish_700Bold",
                  marginBottom: 4,
                },
                tabBarLabel: item.label,
                tabBarIcon: ({ color }) => (
                  <Icon
                    type={item.type}
                    name={item.icon}
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default BottomNavigation;
