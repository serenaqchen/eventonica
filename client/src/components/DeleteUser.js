import React, {useState} from 'react'

function DeleteUser({deleteUser}) {
  const [deleteId, setDeleteId] = useState('');

  return (
    <div>
    <h3>Delete User</h3>
    <form id="delete-user" action="#" onSubmit={(e)=> deleteUser(deleteId)}>
      <fieldset>
        <label>User ID</label>
        <input type="text" id="delete-user-id" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
      </fieldset>
      <input type="submit" />
    </form>
  </div>
  )
}

export default DeleteUser
