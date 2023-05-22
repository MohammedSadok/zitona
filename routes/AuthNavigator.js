import BottomNavigation from "./BottomNavigation";
import LoginNavigation from "./LoginNavigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedInUser } from "../redux/authSlice";
const AuthNavigator = () => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoggedInUser());
  }, [dispatch]);

  return <>{isAuthenticated ? <BottomNavigation /> : <LoginNavigation />}</>;
};
export default AuthNavigator;
