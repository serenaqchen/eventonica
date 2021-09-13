import React from "react";

function DeleteUser({deleteName, setDeleteName, handleDeleteUser, validUser}) {
  
  return (
    <div>
    <h3>Delete User</h3>
    <form id="delete-user" action="#" onSubmit={handleDeleteUser}>
      <fieldset>
        <label>Name</label>
        <input type="text" id="delete-user-id" value={deleteName} onChange={(e) => setDeleteName(e.target.value)} />
        {!validUser && <p>Error: Please input valid user.</p> }
      </fieldset>
      <input type="submit" />
    </form>
  </div>
  )
}

export default DeleteUser
