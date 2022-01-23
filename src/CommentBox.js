import React, { useState } from "react";
import Plus from "./images/icon-plus.svg";
import Minus from "./images/icon-minus.svg";

function CommentBox({
  avatar,
  voteCount,
  username,
  createdAt,
  content,
  replies,
}) {
  const [replyText, setReplyText] = useState("");
  const handleOpenReply = (e) => {
    const t =
      e.target.parentElement.parentElement.parentElement.nextElementSibling;
    t.classList.add("reply-box-visible");
  };
  const handleSendReply = (e) => {
    const t = e.target.parentElement;
    setReplyText("");
    t.classList.remove("reply-box-visible");
  };
  return (
    <>
      <div className="comment-box">
        <div className="vote">
          <img src={Plus} alt="+" />
          <p className="vote-count">{voteCount}</p>
          <img src={Minus} alt="-" />
        </div>
        <div className="comment-right">
          <div className="comment-right-top">
            <img
              className="avatar"
              src={require(`./images/avatars/${avatar.slice(17)}`)}
              alt=""
            />
            <div className="comment-autor-name">{username}</div>
            <div className="comment-timestamp">{createdAt}</div>
            <div className="reply" onClick={handleOpenReply}>
              Reply
            </div>
          </div>
          <div className="comment">{content}</div>
        </div>
      </div>
      <div className="reply-box">
        <img
          className="avatar"
          style={{ marginRight: 0, width: 40, height: 40 }}
          src={require(`./images/avatars/${localStorage.getItem(
            "authAvatar"
          )}`)}
          alt=""
        />
        <textarea
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button onClick={handleSendReply}>REPLY</button>
      </div>
      <div className="replies">
        {replies.map((reply) => {
          return (
            <div className="comment-box comment-reply" key={reply.id}>
              <div className="vote">
                <img src={Plus} alt="+" />
                <p className="vote-count">{reply.score}</p>
                <img src={Minus} alt="-" />
              </div>
              <div className="comment-right">
                <div className="comment-right-top">
                  <img
                    className="avatar"
                    src={require(`./images/avatars/${reply.user.image.webp.slice(
                      17
                    )}`)}
                    alt=""
                  />
                  <div className="comment-autor-name">
                    {reply.user.username}
                  </div>
                  <div className="comment-timestamp">{reply.createdAt}</div>
                  <div className="reply">Reply</div>
                </div>
                <div className="comment">
                  <span className="handle">{`@${reply.user.username} `}</span>
                  {reply.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CommentBox;
