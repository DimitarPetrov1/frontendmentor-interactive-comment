import React, { useState, useEffect } from "react";
import "./App.css";
import CommentBox from "./CommentBox";
import data from "./data.json";

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const authUser = data.currentUser.username;
    const authAvatar = data.currentUser.image.webp;

    if (localStorage.getItem("data") === null) {
      localStorage.setItem("data", JSON.stringify(data));
      console.log("updated local storage");
    }
    localStorage.setItem("authUser", authUser);
    localStorage.setItem("authAvatar", authAvatar.slice(17));
    setLoaded(true);
  }, []);

  return (
    <div className="app">
      {loaded
        ? JSON.parse(localStorage.getItem("data")).comments.map((comment) => {
            return (
              <CommentBox
                key={comment.id}
                avatar={comment.user.image.webp}
                voteCount={comment.score}
                username={comment.user.username}
                createdAt={comment.createdAt}
                content={comment.content}
                replies={comment.replies}
              />
            );
          })
        : "Loading"}
    </div>
  );
}

export default App;
