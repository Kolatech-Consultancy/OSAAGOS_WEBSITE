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
        alt={`${user.fullname}'s profile`}
      />
      <UserInfo>
        <FullName>{user.fullname}</FullName>
      </UserInfo>
      <MessageButton onClick={() => handleSelectMessage(user.id)}>
        Message
      </MessageButton>
    </UserCard>
  );
}

export default UserList;
