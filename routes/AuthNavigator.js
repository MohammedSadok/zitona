import BosketsScreen from "../screens/profile/BosketsScreen";
import BottomNavigation from "./BottomNavigation";
import LoginNavigation from "./LoginNavigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedInUser } from "../services/UserService";
const MainNavigation = () => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const { parcelle } = useSelector((state) => state.parcelles);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkLoggedInUser());
  // }, [dispatch]);
  if (isAuthenticated) {
    if (parcelle.id === 0) {
      return <BosketsScreen />;
    } else return <BottomNavigation />;
  } else return <LoginNavigation />;
};
export default MainNavigation;
