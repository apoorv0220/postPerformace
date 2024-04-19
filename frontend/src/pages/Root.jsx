import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import MainNavigation from "../components/MainNavigation";
import { checkAuth } from "../apiServices/apiActions";

export default function Root() {
    const dispatch = useDispatch()
    useEffect(() => {
      const authenticationStatus = async () => {
        try {
            const user = await checkAuth();
            dispatch(authActions.isAuthenticated(user));
        } catch (error) {
          console.error(
            "An error occurred while checking authentication status:",
            error
          );
        }
      };
  
      authenticationStatus();
    }, []);
    return (
        <>
            <MainNavigation />
            <Outlet />
        </>
    )
}