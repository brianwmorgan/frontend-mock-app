import React, { useState, useEffect } from "react";
import "./App.css";

function UserListAndPostTitlesApp() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showUserPosts, setShowUserPosts] = useState({});

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      const users = await response.json();
      setUsers(users.slice(0,5));
    }
    loadUsers();
  }, []);

  useEffect(() => {
    async function loadPosts() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      setPosts(await response.json());
    }
    loadPosts();
  }, []);

  const handleUserClick = (event) => {
    event.preventDefault();
    const userName = event.target.innerText;
    const userPreviousValue = showUserPosts[userName]
    setShowUserPosts({
      ...showUserPosts,
      [userName]: !userPreviousValue
    });
  };

  const userList = users.map((user) => {
    return (
      <li key={user.id}>
        <a href="#" onClick={handleUserClick}>
          {user.name}
        </a>
        {showUserPosts[user.name] ? posts.map((post) => {
          if (post.userId === user.id) {
            return <li key={post.id}>{post.title}</li>;
          }
        }) : null}
      </li>
    );
  });


  return (
    <div>
      <h1>Frontend Practice - React App</h1>
      <h2>Goals of this app:</h2>
      <p>1 - Use JSON Placeholder to load a list of the first five users</p>
      <p>
        2 - Clicking a user displays their first three post titles beneath their
        name
      </p>
      <p>3 - Clicking a user a second time hides the post titles</p>
      <ul>{userList}</ul>
    </div>
  );
}

export default UserListAndPostTitlesApp;
