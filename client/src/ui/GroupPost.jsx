import React, { useEffect, useState } from "react";
import {
  // ActionButton,
  // ActionsContainer,
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

const GroupPost = ({ post, handleReplySubmit, replyInput, setReplyInput }) => {
  const [replies, setReplies] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {    
    async function getReplies() {
      const res = await axios.get(`/api/groups/posts/${post._id}/replies`);
      setReplies(res.data);
    }
    getReplies();
  }, [post._id]);


  return (
    <PostContainer>
      <UserInfo>Posted by {post.author?.name}</UserInfo>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
      {/* <ActionsContainer>
        <ActionButton>Like</ActionButton>
        <ActionButton onClick={handleCommentClick}>Comment</ActionButton>{" "}
        <ActionButton>Share</ActionButton>
      </ActionsContainer> */}

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
            <ReplyItem key={index}>
              <ReplyImage src={reply.profilePicture} alt="User" />
              <ReplyContent>
                <ReplyUser>{reply.author?.name}</ReplyUser>
                {reply.content}
              </ReplyContent>
            </ReplyItem>
          ))}
        </ReplyList>
      </ReplyContainer>
    </PostContainer>
  );
};

export default GroupPost;
