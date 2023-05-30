import AuthNavigator from "./routes/AuthNavigator";
import { Provider } from "react-redux";
import { store } from "./redux";
import BosketsScreen from "./screens/profile/BosketsScreen";

export default function App() {
  return (
    <Provider store={store}>
        <BosketsScreen />
    </Provider>
  );
}
