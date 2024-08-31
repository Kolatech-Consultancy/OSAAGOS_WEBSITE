import React from "react";
import {
  FullName,
  MessageButton,
  ProfilePicture,
  UserCard,
  UserInfo,
} from "./UserChat";
import { useNavigate } from "react-router-dom";

function UserList({ user }) {
  const navigate = useNavigate();
  function handleSelectMessage(id) {
    navigate(`${id}`);
  }
  return (
    <UserCard>
      <ProfilePicture
        src={user.profilePicture}
        alt={`${user.name}'s profile`}
      />
      <UserInfo>
        <FullName>{user.name}</FullName>
      </UserInfo>
      <MessageButton onClick={() => handleSelectMessage(user._id)}>
        Message
      </MessageButton>
    </UserCard>
  );
}

export default UserList;
