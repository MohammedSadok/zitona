import AuthNavigator from "./routes/AuthNavigator";
import { Provider } from "react-redux";
import { store } from "./redux";
export default function App() {


  return (

    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
}
