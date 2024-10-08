import React, { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f6f9;
`;

const GroupForm = styled.form`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const CreateButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CreateGroup = ({ setCreate, url, nameId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || description.trim() === "") {
      toast.error("Please fill in all fields");
      return;
    }

    const groupData = {
      name,
      description,
    };

    try {
      const res = await axios.post(url, groupData);
      console.log(res);

      toast.success(`${nameId} created successfully"`);
      setName("");
      setDescription("");
      setCreate(false);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <GroupContainer>
      <GroupForm onSubmit={handleSubmit}>
        <h2>Create a {nameId}</h2>
        <InputField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`${nameId} name`}
        />
        <TextArea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={`${nameId} Description"`}
        />
        <CreateButton type="submit">Create {nameId}</CreateButton>
      </GroupForm>

      <div className="flex justify-center items-center mt-4">
        <p
          className="cursor-pointer text-center text-lg font-medium border-black border-2 mb-6 px-4 py-2 hover:text-white hover:bg-black transition-all duration-200"
          onClick={() => setCreate(false)}
        >
          Back to {nameId}
        </p>
      </div>
    </GroupContainer>
  );
};

export default CreateGroup;
