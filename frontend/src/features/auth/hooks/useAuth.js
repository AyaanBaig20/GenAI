import { Login, Signup, Logout, Getme } from "../services/auth.api";
import { useEffect } from "react";
import { setLoading, setUser } from "../../redux/Slices/authSlices";
import { useSelector, useDispatch } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handleLogin = async ({ email, password }) => {
    dispatch(setLoading(true));
    try {
      const res = await Login({ email, password });

      if (res.success) {
        dispatch(setUser(res.user));
      }

      return res;
    } catch (err) {
      return { success: false, message: "Login failed" };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSignup = async ({ username, email, password }) => {
    dispatch(setLoading(true));
    try {
      const res = await Signup({ username, email, password });

      if (res.success) {
        dispatch(setUser(res.user));
      }

      return res;
    } catch (err) {
      return { success: false, message: "Signup failed" };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      const res = await Logout();
      dispatch(setUser(null));
      return res;
    } catch (err) {
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const getme = async () => {
      try {
        const res = await Getme();
        dispatch(setUser(res.user));
      } catch {
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    getme();
  }, []);

  return { handleLogin, handleLogout, handleSignup };
};