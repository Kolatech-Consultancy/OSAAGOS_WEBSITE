import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import styled from "styled-components";
import toast from "react-hot-toast";
import SpinnerMini from "../../SpinnerMini";

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminForm = ({ isEditing, setIsEditing, editId, media }) => {
  const [submiting, setSubmiting] = useState(false);
  const [formData, setFormData] = useState({
    fileType: "image",
    title: "",
    fileUrl: "",
    description: "",
  });

  useEffect(() => {
    if (isEditing) {
      const data = media.find((item) => item._id === editId);
      setFormData(data);
    }
  }, [isEditing, editId, media]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fileType: formData.fileType,
      title: formData.title,
      description: formData.description,
      fileUrl: formData.fileUrl,
    };

    try {
      setSubmiting(true);
      if (isEditing) {
        const response = await axios.put(`/api/admin/media/:${editId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response:", response.data);
        toast.success("Edited successfully");
        setIsEditing(false);
        setFormData({
          fileType: "image",
          title: "",
          fileUrl: "",
          description: "",
        });
        setSubmiting(false);
      } else {
        setSubmiting(true);

        await axios.post("/api/admin/media", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Uploaded successfully");
        setIsEditing(false);
        setFormData({
          fileType: "image",
          title: "",
          fileUrl: "",
          description: "",
        });
        setSubmiting(false);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="fileType">Type</Label>
        <Select
          id="fileType"
          name="fileType"
          value={formData.fileType}
          onChange={handleChange}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </Select>

        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Enter the title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Label htmlFor="fileUrl">File Url</Label>
        <Input
          type="text"
          id="fileUrl"
          name="fileUrl"
          placeholder="Enter the fileUrl"
          value={formData.fileUrl}
          onChange={handleChange}
          required
        />

        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          name="description"
          placeholder="Enter the description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <SubmitButton type="submit">
          {submiting ? <SpinnerMini /> : "Submit"}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default AdminForm;
