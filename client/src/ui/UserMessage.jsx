import React, { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

import axios from "../utils/axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLoginUser } from "../components/context/LoginUserContext";

// Container for the whole chat window
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  background-color: #f4f6f9;
`;

// Header container for back button and user's name
const Header = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 1rem;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Back button styling
export const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [senderId, setSenderId] = useState("");
  const [receiverName, setReceiverName] = useState("Loading....");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useLoginUser();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setSenderId(user);
        // Fetch receiver's name based on id
        const userResponse = await axios.get(`/api/users/allUsers`);
        const filteredUser = userResponse.data.filter((data) => {
          return data._id === id;
        });

        setReceiverName(filteredUser[0].name);

        const response = await axios.get(
          `/api/messages/messages?contactId=${id}`
        );
        setMessages(response.data);
      } catch (error) {
        toast.error(
          error.response ? error.response.data.message : error.message
        );
      }
    };
    if (id) {
      fetchMessages();
    }
  }, [id,user]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { content: newMessage, sender: senderId }]);

    const data = { receiver: id, content: newMessage };
    try {
      await axios.post("/api/messages/send", data);
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("Failed to send message");
    }

    setNewMessage("");
  };

  return (
    <ChatContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </BackButton>
        <h3>{receiverName}</h3>
      </Header>

      <MessagesContainer>
        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            isOwnMessage={message.sender === senderId}
          >
            {message.content}
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
