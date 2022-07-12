import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [loading, isLoading] = useState(false);

  const getPosts = async () => {
    const response = await axios
      .get("https://dy6578.pythonanywhere.com/api/posts")
      .then(response => {
        setPosts([...response.data]);
      })
      .catch(error => {
        console.log("전체 글 오류", error.message);
      });
  };

  const getSinglePost = async () => {
    isLoading(true);
    const response = await axios
      .get("https://dy6578.pythonanywhere.com/api/posts/6")
      .then(response => {
        console.log(response.data);
        setPost(response.data);
        isLoading(false);
      })
      .catch(error => {
        console.log("글 하나 오류", error);
      });
  };

  useEffect(() => {
    getPosts();
    getSinglePost();
  }, []);

  return (
    <div>
      {posts.map(post => {
        return <p style={{ border: "1px solid red" }}>{post.content}</p>;
      })}

      <h1>{post.content}</h1>
      <p>댓글 : {post.comment[0].content}</p>
    </div>
  );
}

export default App;
