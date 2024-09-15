import React, { useEffect, useState } from "react";
import {
  PostContainer,
  PostContent,
  PostTitle,
  ReplyButton,
  ReplyContainer,
  ReplyContent,
  ReplyImage,
  ReplyInput,
  ReplyItem,
  ReplyList,
  ReplyUser,
  UserInfo,
} from "./UserGroupMessage";
import axios from "../utils/axios";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useLoginUser } from "../components/context/LoginUserContext";
import toast from "react-hot-toast";

const GroupPost = ({
  post,
  handleReplySubmit,
  replyInput,
  setReplyInput,
  nameId,
}) => {
  const [replies, setReplies] = useState([]);
  const [show, setShow] = useState(false);
  const [showReplyDel, setShowReplyDel] = useState({});
  const { user } = useLoginUser();

  function handleDeletePost(id) {
    const postFilter = post._id === id;
    if (postFilter) {
      axios
        .delete(`/api/${nameId}/posts/${id}`)
        .then(() => {
          toast.success("Post deleted");
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : "An error occurred while deleting the post."
          );
        });
    } else {
      toast.error("Post not found");
    }
  }

  function handleDeleteReply(id) {
    if (nameId === "forums") {
      axios
        .delete(`/api/${nameId}/posts/replies/${id}`)
        .then(() => {
          toast.success("Reply deleted");
          setReplies(replies.filter((reply) => reply._id !== id));
        })
        .catch((error) =>
          toast.error(
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : "An error occurred while deleting the post."
          )
        );
    } else {
      axios
        .delete(`/api/${nameId}/replies/${id}`)
        .then(() => {
          toast.success("Reply deleted");
          setReplies(replies.filter((reply) => reply._id !== id));
        })
        .catch((error) =>
          toast.error(
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : "An error occurred while deleting the post."
          )
        );
    }
  }

  useEffect(() => {
    async function getReplies() {
      try {
        const res = await axios.get(`/api/${nameId}/posts/${post._id}/replies`);
        setReplies(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getReplies();
  }, [post._id, nameId]);

  const toggleReplyDeletePanel = (replyId) => {
    setShowReplyDel((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  return (
    <PostContainer>
      <div className="flex justify-between items-center">
        <UserInfo>Posted by {post.author?.name}</UserInfo>
        {post.author?._id === user && (
          <div
            className="cursor-pointer relative"
            onClick={() => setShow(!show)}
          >
            <HiOutlineDotsVertical />
            {show && (
              <article className="border shadow-lg bg-white p-2 rounded-sm absolute whitespace-nowrap right-full">
                <p
                  className="flex justify-center items-center"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete Post <MdDelete />
                </p>
              </article>
            )}
          </div>
        )}
      </div>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>

      <ReplyContainer>
        <ReplyInput
          type="text"
          placeholder="Write a reply..."
          value={replyInput}
          onChange={(e) => setReplyInput(e.target.value)}
        />
        <ReplyButton onClick={() => handleReplySubmit(post._id)}>
          Reply
        </ReplyButton>

        <ReplyList>
          {replies.map((reply, index) => (
            <ReplyItem key={reply._id}>
              <div className="flex items-start">
                <ReplyImage src={reply.profilePicture} alt="User" />
                <ReplyContent>
                  <ReplyUser>{reply.author?.name}</ReplyUser>
                  {reply.content}
                </ReplyContent>
              </div>
              {reply.author._id === user && (
                <div
                  className="cursor-pointer relative flex justify-end"
                  onClick={() => toggleReplyDeletePanel(reply._id)}
                >
                  <HiOutlineDotsVertical />
                  {showReplyDel[reply._id] && (
                    <article className="border shadow-lg bg-white p-2 rounded-sm absolute whitespace-nowrap right-full">
                      <p
                        className="flex justify-center items-center"
                        onClick={() => handleDeleteReply(reply._id)}
                      >
                        Delete Reply <MdDelete />
                      </p>
                    </article>
                  )}
                </div>
              )}
            </ReplyItem>
          ))}
        </ReplyList>
      </ReplyContainer>
    </PostContainer>
  );
};

export default GroupPost;
