import BosketsScreen from "../screens/profile/BosketsScreen";
import BottomNavigation from "./BottomNavigation";
import LoginNavigation from "./LoginNavigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUserIfExist } from "../redux/authSlice";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const { parcelle } = useSelector((state) => state.parcelles);
  const { user, token } = useSelector((state) => state.userAuth);
  useEffect(() => {
    dispatch(checkUserIfExist());
  }, [dispatch]);
  if (user) {
    if (parcelle.id === 0) {
      return <BosketsScreen />;
    } else {
      return <BottomNavigation />;
    }
  } else {
    return <LoginNavigation />;
  }
};
export default MainNavigation;
