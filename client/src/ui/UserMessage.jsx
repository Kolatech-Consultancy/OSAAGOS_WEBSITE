import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Is_authorized from "../utils/authorization";
import toast from "react-hot-toast";

// Container for the whole chat window
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  max-height: 100vh;
  background-color: #f4f6f9;
`;

// Chat messages section
const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

// Individual message bubble
const MessageBubble = styled.div`
  max-width: 60%;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 18px;
  color: white;
  position: relative;
  font-size: 16px;

  ${(props) =>
    props.isOwnMessage
      ? `
    background-color: #007bff;
    align-self: flex-end;
    border-bottom-right-radius: 0;
  `
      : `
    background-color: #e4e6eb;
    align-self: flex-start;
    color: #333;
    border-bottom-left-radius: 0;
  `}
`;

// Message input container fixed at the bottom
const MessageInputContainer = styled.div`
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  position: sticky;
  bottom: 0;
`;

// Message input styling
const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-right: 10px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

// Send button styling
const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MessagingApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how are you?", sender: "other" },
    { id: 2, text: "I'm good, thanks! How about you?", sender: "self" },
    { id: 3, text: "I'm doing well, working on a project.", sender: "other" },
    { id: 4, text: "That's awesome! Good luck!", sender: "self" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    const token = Is_authorized();

    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, text: newMessage, sender: "self" },
    ]);

    const sentData = axios.post(
      "https://osaagos-api-alumni-website.onrender.com/",
      newMessage,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("message sent successfully");
    setNewMessage("");
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            isOwnMessage={message.sender === "self"}
          >
            {message.text}
          </MessageBubble>
        ))}
      </MessagesContainer>
      <MessageInputContainer>
        <MessageInput
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </MessageInputContainer>
    </ChatContainer>
  );
};

export default MessagingApp;
