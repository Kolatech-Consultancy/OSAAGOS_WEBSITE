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
import { format, isToday, isYesterday } from "date-fns";

const GroupPost = ({
  post,
  replyInput,
  setReplyInput,
  nameId,
  setPosts,
  posts,
}) => {
  const [replies, setReplies] = useState([]);
  const [show, setShow] = useState(false);
  const [showReplyDel, setShowReplyDel] = useState({});
  const { user, allUser } = useLoginUser();

  function handleDeletePost(id) {
    axios
      .delete(`/api/${nameId}/posts/${id}`)
      .then(() => {
        toast.success("Post deleted");
        setPosts(posts.filter((post) => post._id !== id));
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "An error occurred while deleting the post."
        );
      });
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
  function fetchUserById(id) {
    const user = allUser.filter((element) => {
      return element._id === id;
    });
    return user[0]?.profilePicture;
  }
  function fetchUserNameById(id) {
    const user = allUser.filter((element) => {
      return element._id === id;
    });
    return user[0]?.name;
  }
  async function getReplies() {
    if (post._id) {
      try {
        const res = await axios.get(`/api/${nameId}/posts/${post._id}/replies`);
        setReplies(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    getReplies();
  }, [post._id, nameId]);

  const handleReplySubmit = async () => {
    if (!replyInput) return;

    try {
      await axios.post(`/api/${nameId}/posts/${post._id}/replies`, {
        content: replyInput,
      });
      setReplyInput("");
      getReplies();
      toast.success("Reply posted");
    } catch (error) {
      toast.error(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred while posting the reply."
      );
    }
  };

  const toggleReplyDeletePanel = (replyId) => {
    setShowReplyDel((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  const formattedDate = post.timestamp
    ? format(new Date(post.timestamp), "dd MMM yyyy")
    : "";
  return (
    <PostContainer>
      <div className="flex justify-between items-center">
        <UserInfo>
          Posted by{" "}
          {post.author?.name
            ? post.author?.name
            : fetchUserNameById(post.author)}
        </UserInfo>
        {post.author?._id === user || post.author === user ? (
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
        ) : (
          <div></div>
        )}
      </div>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
      <div>Posted on {formattedDate}</div>
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
                <ReplyImage src={fetchUserById(reply.author._id)} alt="User" />
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
