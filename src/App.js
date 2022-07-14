/* eslint-disable */

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const [comments, setComments] = useState([]);

  const id = 15;

  useEffect(() => {
    getPosts();
    getSinglePost();
  }, []);

  const getPosts = async () => {
    const response = await axios
      .get("https://dy6578.pythonanywhere.com/api/posts/")
      .then(response => {
        console.log("전체 글 불러오기 성공", response.data);
        setPosts([...response.data]);
      })
      .catch(error => {
        console.log("전체 글 불러오기 실패", error.message);
      });
  };

  const getSinglePost = async () => {
    const response = await axios
      .get(`https://dy6578.pythonanywhere.com/api/posts/${id}`)
      .then(response => {
        console.log("글 하나 불러오기 성공", response.data);
        setSinglePost(response.data);
        setComments([...response.data.comment]);
      })
      .catch(error => {
        console.log("글 하나 불러오기 실패");
      });
  };

  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState("");

  const PostSubmit = e => {
    e.preventDefault();
    console.log(newPost);
    axios
      .post("https://dy6578.pythonanywhere.com/api/posts/", {
        title: newPost,
        author: 1,
        content: newPost,
      })
      .then(response => {
        console.log("작성 성공", response);
        getPosts();
      })
      .catch(error => {
        console.log("작성 실패");
      });

    setNewPost("");
  };

  const CommentSubmit = e => {
    e.preventDefault();
    axios
      .post("https://dy6578.pythonanywhere.com/api/comments/", {
        post: id,
        author: 1,
        content: newComment,
      })
      .then(response => {
        console.log("댓글 작성 성공");
        getPosts();
        getSinglePost();
      })
      .catch(function (error) {
        console.log("댓글 작성 실패", error);
      });

    setNewPost("");
  };

  const onDelete = id => {
    axios
      .delete(`https://dy6578.pythonanywhere.com/api/posts/${id}`)
      .then(response => {
        console.log("삭제 성공", response);

        getPosts();
      })
      .catch(error => {
        console.log("삭제 실패", error);
      });
  };

  return (
    <div>
      <form onSubmit={PostSubmit}>
        <input
          placeholder="새 게시글 작성하기 "
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
        />{" "}
        <button>작성</button>
      </form>

      {posts.map(post => {
        return (
          <p style={{ border: "1px solid red" }}>
            {post.content}{" "}
            <button onClick={() => onDelete(post.id)}>삭제</button>
          </p>
        );
      })}

      <div style={{ border: "1px solid blue" }}>
        <h1>{singlePost.content}</h1>
        {comments.map(comment => {
          return <p>ㄴ {comment.content}</p>;
        })}

        <form onSubmit={CommentSubmit}>
          <input
            placeholder="댓글 작성하기 "
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />{" "}
          <button>작성</button>
        </form>
      </div>
    </div>
  );
}

export default App;
