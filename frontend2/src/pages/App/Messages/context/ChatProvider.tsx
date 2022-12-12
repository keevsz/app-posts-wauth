import { getChatService } from "@/services/chat.services";
import { createContext, useContext, useState } from "react";

export const ChatContext = createContext([] as any);

export const ChatProvider = ({ children }: any) => {
  const [selectedChat, setSelectedChat] = useState("");

  const setSelectedChatFunc = (value: any) => {
    setSelectedChat(value);
  };

  const getChat = async (value: any) => {
    if (value === "") return;
    const response = await getChatService(value);
    setSelectedChatFunc(response.data._id);
    console.log(response.data);
  };


  return (
    <ChatContext.Provider
      value={{ selectedChat, setSelectedChatFunc, getChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext undefined here");
  }
  return context;
};
