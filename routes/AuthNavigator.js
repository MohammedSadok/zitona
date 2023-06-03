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
  const { parseil } = useSelector((state) => state.parseils);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkLoggedInUser());
  // }, [dispatch]);
  if (isAuthenticated) {
    if (parseil === null) {
      return <BosketsScreen />;
    } else return <BottomNavigation />;
  } else return <LoginNavigation />;
};
export default MainNavigation;
