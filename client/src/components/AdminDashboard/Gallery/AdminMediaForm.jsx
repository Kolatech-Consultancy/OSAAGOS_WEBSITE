import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Is_authorized from "../../../utils/authorization";
import toast from "react-hot-toast";
import SpinnerMini from "../../SpinnerMini";

// Styled components for the form
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
    type: "image",
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const data = media.find((item) => item._id === editId);
      setFormData(data);
    }
  }, [isEditing, editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("type", formData.type);
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);

    const token = Is_authorized();
    try {
      setSubmiting(true);
      if (isEditing) {
        const response = await axios.put(
          `https://osaagos-api-alumni-website.onrender.com/api/admin/media/:${editId}`,
          uploadData,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
        toast.success("Edited successfully");
        setIsEditing(false);
        setFormData({
          type: "image",
          title: "",
          description: "",
        });
        setSubmiting(false);
      } else {
        setSubmiting(true);

        await axios.post(
          "https://osaagos-api-alumni-website.onrender.com/api/admin/media",
          uploadData,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Uploaded successfully");
        setIsEditing(false);
        setFormData({
          type: "image",
          title: "",
          description: "",
        });
        setFile(null);
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
        <Label htmlFor="file">Upload Image or Video</Label>
        <Input
          type="file"
          id="file"
          accept="image/*, video/*"
          onChange={handleFileChange}
          required
        />

        <Label htmlFor="type">Type</Label>
        <Select
          id="type"
          name="type"
          value={formData.type}
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
