import React, { useState, useEffect } from "react";
import DeleteUser from "./DeleteUser";
import * as apiClient from "../apiClient";


//create a new file and copy this into api client
function Users() {

  useEffect(() => {
    apiClient.getUsers().then((res) => setUsers(res));; // useEffect will run getUsers() every time this component loads, as opposed to just the first time it is rendered.
  }, []);

  const [users, setUsers] = useState([]);
  const [deleteName, setDeleteName] = useState('');
  //keeps track of all form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validUser, setValidUser] = useState(true)

  const handleAddUser = e => {
    e.preventDefault();
    const newUser = {name: name, email: email};
    apiClient.postUser(newUser).then((res) => setUsers(res));
    setName('');
    setEmail('');
  };

  const handleDeleteUser = e => {
    e.preventDefault();
    const currentUsers = []
    for (let obj of users){
      currentUsers.push( obj.name )
    }
    if (currentUsers.includes(deleteName)){
      apiClient.deleteUser(deleteName).then((res) => setUsers(res));
      setDeleteName('')
      setValidUser(true)
    } else {
      setValidUser(false)
    }
  }


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
        <form id="add-user" action="#" onSubmit={handleAddUser}>
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
            <br/><br/>
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
          <input type="submit" value="Add"/>
        </form>
      </div>
      <DeleteUser deleteName={deleteName} setDeleteName={setDeleteName} handleDeleteUser={handleDeleteUser} validUser={validUser}/>
    </section>
  );
}

export default Users;
