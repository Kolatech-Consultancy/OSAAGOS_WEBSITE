import { createContext, useContext, useEffect, useState } from "react";
import { getAllGroups } from "../../services/api";

const GroupContext = createContext(undefined);

function GroupProvider({ children }) {
  const [isFetchingMessage, setIsFetchingMessage] = useState(false);
  const [groupData, setGroupData] = useState([]);


 async function fetchData() {
   setIsFetchingMessage(true);
   try {
     const response = await getAllGroups();
     const data = response.data;
     setGroupData(data);
   } catch (error) {
     throw new Error(
       error.response ? error.response.data.message : error.message
     );
   } finally {
     setIsFetchingMessage(false);
   }
 }

 useEffect(() => {
   fetchData();
 }, []);


  return (
    <GroupContext.Provider
      value={{ isFetchingMessage,groupData }}
    >
      {children}
    </GroupContext.Provider>
  );
}

function useGroup() {
  const context = useContext(GroupContext);
  if (context === undefined)
    throw new Error("Filter context was used outside of filter provider");
  return context;
}

export { GroupProvider, useGroup };
