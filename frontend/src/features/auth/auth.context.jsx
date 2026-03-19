import { createContext,  useState } from "react";


export let authContext = createContext();

export let AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true); 

  return (
    <authContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </authContext.Provider>
  );
};