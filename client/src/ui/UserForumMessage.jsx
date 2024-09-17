import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GroupPost from "./GroupPost";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import { useGroup } from "../components/context/MessagesContext";
import toast from "react-hot-toast";

const GroupContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f4f6f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    margin: 10px;
  }
`;

const GroupHeader = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const GroupName = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 5px;
`;

const GroupDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
`;

const CreatePostContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const UserInfo = styled.div`
  font-size: 0.9rem;
  color: #007bff;
  margin-bottom: 20px;
`;

export const PostContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const PostTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

export const PostContent = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 10px;
`;

export const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #f0f2f5;
    color: #0056b3;
  }
`;

export const ReplyContainer = styled.div`
  margin-top: 15px;
  padding: 10px;
  border-top: 1px solid #eee;
`;

export const ReplyInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const ReplyButton = styled.button`
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ReplyList = styled.div`
  margin-top: 10px;
`;

export const ReplyItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #f0f2f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #333;
  position: relative;
`;

export const ReplyImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const ReplyContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReplyUser = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
  color: #007bff;
`;

const GroupPage = () => {
  const { id } = useParams();
  const { groupData } = useGroup();
  const [group, setGroup] = useState({ name: "", description: "" });
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [replyInput, setReplyInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;

    const newPostData = {
      replies: [],
      ...newPost,
    };
    axios
      .post(`/api/forums/${id}/post`, { content: newPost.content })
      .then((result) => {
        const createdPost = result.data;
        if (!createdPost.author) {
          toast.error("Author information is missing in the response");
        }
        toast.success("Posted successfully");
        setPosts([...posts, createdPost]);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "An error occurred while deleting the post."
        );
      });
    setPosts([newPostData, ...posts]);
    setNewPost({ title: "", content: "" });
  };

  useEffect(() => {
    async function getPost() {
      try {
        const res = await axios.get(`/api/forums/${id}/posts`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
        toast.error(
          error.response ? error.response.data.message : error.message
        );
      }
    }

    const data = groupData.filter((element) => {
      return element._id === id;
    });
    setGroup(data);
    getPost();
  }, [id, groupData]);

  return (
    <GroupContainer>
      <GroupHeader>
        <GroupName>{group.name}</GroupName>
        <GroupDescription>{group.description}</GroupDescription>
      </GroupHeader>

      <CreatePostContainer>
        <Input
          type="text"
          placeholder="Post Title"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <Textarea
          rows="4"
          placeholder="Post Content"
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
        />
        <SubmitButton onClick={handleCreatePost}>Post</SubmitButton>
      </CreatePostContainer>
      {posts.length < 1 && (
        <p className="text-3xl text-center mt-4"> There are no post yet</p>
      )}
      {posts.map((post, index) => (
        <GroupPost
          key={post._id ? post._id : index}
          post={post}
          replyInput={replyInput}
          setReplyInput={setReplyInput}
          nameId="forums"
          setPosts={setPosts}
          posts={posts}
        />
      ))}
    </GroupContainer>
  );
};

export default GroupPage;
