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
    //finding the list of current users for validation
    const currentUsers = []
    for (let obj of users){
      currentUsers.push( obj.name )
    }
    //if user is valid --> delete from database
    if (currentUsers.includes(deleteName)){
      apiClient.deleteUser(deleteName).then((res) => setUsers(res));
      //reset delete input
      setDeleteName('')
      setValidUser(true)
    } else {
      //if user is not valid show error message
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
            </label>
            <input
                name="name"
                type="text"
                id="add-user-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            <br/><br/>
            <label>
              Email
            </label>
            <input
                name="email"
                type="text"
                id="add-user-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
