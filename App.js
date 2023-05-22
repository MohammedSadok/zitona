import BottomNavigation from "./routes/BottomNavigation";
import LoginNavigation from "./routes/LoginNavigation";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <NavigationContainer>
      <LoginNavigation />
    </NavigationContainer>
  );
}
