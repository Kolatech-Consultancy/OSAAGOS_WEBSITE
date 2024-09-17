import { createContext, useContext, useEffect, useState } from "react";
import { GetOneUser } from "../../services/api";
import axios from "../../utils/axios";

const UserContext = createContext(undefined);

function LoginUserProvider({ children }) {
  const [user, setUser] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [isFetchingUser, setIsFetchingUser] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsFetchingUser(true);
      const data = await GetOneUser();
      const response = await axios.get("/api/users/allUsers");
      setUser(data.data._id);
      setAllUser(response.data);
      setIsFetchingUser(false);
    }
    fetchData();
  }, []);

  function getUserOb() {
    return allUser.filter((users) => users._id === user);
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, allUser, isFetchingUser, getUserOb }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useLoginUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("Filter context was used outside of filter provider");
  return context;
}

export { LoginUserProvider, useLoginUser };
