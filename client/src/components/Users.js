import React, { useState, useEffect } from "react";
import DeleteUser from "./DeleteUser";
import * as apiClient from "../apiClient";


//create a new file and copy this into api client
function Users() {

  const handleDeleteButton = e => {
    e.preventDefault();
    apiClient.deleteUser(deleteId);
    apiClient.getUsers().then((res) => setUsers(res));;
  }


  useEffect(() => {
    apiClient.getUsers().then((res) => setUsers(res));; // useEffect will run getUsers() every time this component loads, as opposed to just the first time it is rendered.
  }, []);

  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  //keeps track of all form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const postUser = (newUser) => {
    fetch("http://localhost:3000/users", {method:"POST", body: JSON.stringify(newUser), headers: {"content-type": "application/json"}})
      .then(res => { return res.json()})
      .then((res) => setUsers(res));
  };

  const handleAddUser = e => {
    e.preventDefault();
    const newUser = {name: name, email: email};
    postUser(newUser);
    // setUsers([...users, newUser]);
    setName('');
    setEmail('');
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
        <form id="add-user" action="#" >
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
          <input type="submit" value="Add" onClick={handleAddUser}/>
        </form>
      </div>
      <DeleteUser deleteId={deleteId} setDeleteId={setDeleteId} handleDeleteButton={handleDeleteButton}/>
    </section>
  );
}

export default Users;
