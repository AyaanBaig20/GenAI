import { useContext } from "react";
import { authContext } from "../auth.context";
import { Login, Signup, Logout, Getme } from "../services/auth.api";
import { useEffect } from "react";

export const useAuth = () => {
  const context = useContext(authContext);
  let { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    let res = await Login({ email, password });

    const userData = res.user;

    setUser(userData);

    console.log(userData);
    setLoading(false);
  };
  const handleSignup = async ({ username, email, password }) => {
    setLoading(true);
    let res = await Signup({ username, email, password });
    setUser(res.user);
    setLoading(false);
  };
  const handleLogout = async () => {
    setLoading(true);
    let res = await Logout();
    setUser(null);
    setLoading(false);
  };
  useEffect(() => {
    let getme = async () => {
      try {
        let res = await Getme();
        setUser(res.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getme();
  }, []);
  return { user, loading, handleLogin, handleLogout, handleSignup };
};
