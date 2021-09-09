import React, { useState, useEffect } from "react";
import DeleteUser from "./DeleteUser";

function Users() {
  const getUsers = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((res) => setUsers(res));
  };

  useEffect(() => {
    getUsers(); // useEffect will run getUsers() every time this component loads, as opposed to just the first time it is rendered.
  }, []);

  const [users, setUsers] = useState([]);
  //keeps track of all form fields
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const deleteUser = (deleteId) => {
    const newUsers = users.filter((i) => i.id !== deleteId);
    setUsers(newUsers);
  };

  return (
    <section className="user-management">
      <h2>User Management</h2>

      <ul id="users-list">
        {/* display all existing Users here */}
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <div>
        <h3>Add User</h3>
        <form id="add-user" action="http://localhost:3000/users" method="POST">
          <fieldset>
            <label>
              Name
              <input
                name="name"
                type="text"
                id="add-user-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              ID
              <input
                name="id"
                type="text"
                id="add-user-id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="text"
                id="add-user-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </fieldset>
          {/* Add more form fields here */}
          <input type="submit" value="Add" />
        </form>
      </div>
      <DeleteUser deleteUser={deleteUser} />
    </section>
  );
}

export default Users;
