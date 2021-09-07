import React, {useState} from "react";
import DeleteUser from "./DeleteUser";


function Users() {
  const marlin = { name: "Marlin", email: "marlin@gmail.com", id: "1" };
  const nemo = { name: "Nemo", email: "nemo@gmail.com", id: "2" };
  const dory = { name: "Dory", email: "dory@gmail.com", id: "3" };

  const [users, setUsers] = useState([marlin, nemo, dory])
  //keeps track of all form fields 
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {id: id, name: name, email: email};
    setUsers([...users, newUser]);
    setName('');
    setId('')
    setEmail('')
  };

  const deleteUser = (deleteId) => {
    const newUsers = users.filter(i=>i.id !== deleteId)
    setUsers(newUsers)
  };

  return (
    <section className="user-management">
      <h2>User Management</h2>

      <ul id="users-list">
        {/* display all existing Users here */}
        {users.map((user, index) => <li key={index}>{user.name} - {user.email}</li>)}
      </ul>

      <div>
        <h3>Add User</h3>
        <form id="add-user" action="#" onSubmit={onSubmit}>
          <fieldset>
            <label>Name</label>
            <input type="text" id="add-user-name" value={name} onChange={(e) => setName(e.target.value)}/>
            <label>ID</label>
            <input type="text" id="add-user-id" value={id} onChange={(e) => setId(e.target.value)} />
            <label>Email</label>
            <input type="text" id="add-user-email" value={email} onChange={(e)=> setEmail(e.target.value)} />
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
