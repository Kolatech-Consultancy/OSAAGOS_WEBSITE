import { createContext, useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";

const MessageContext = createContext(undefined);

function MessageProvider({ children }) {
  const [isFetchingMessage, setIsFetchingMessage] = useState(false);

  useEffect(() => {
    async function fetchData() {
        setIsFetchingMessage(true);
        



      setIsFetchingMessage(false);
    }
    fetchData();
  }, []);

  return (
    <MessageContext.Provider
      value={{ isFetchingMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
}

function useMessage() {
  const context = useContext(MessageContext);
  if (context === undefined)
    throw new Error("Filter context was used outside of filter provider");
  return context;
}

export { MessageProvider, useMessage };
