import React from "react";

function DeleteUser({deleteId, setDeleteId, handleDeleteButton}) {
  
  return (
    <div>
    <h3>Delete User</h3>
    <form id="delete-user" action="#" onSubmit={handleDeleteButton}>
      <fieldset>
        <label>User ID</label>
        <input type="number" id="delete-user-id" value={deleteId} onChange={(e) => setDeleteId(Number(e.target.value))} />
      </fieldset>
      <input type="submit" />
    </form>
  </div>
  )
}

export default DeleteUser
