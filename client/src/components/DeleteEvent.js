// import React, {useState} from 'react'

function DeleteEvent({deleteId, setDeleteId, handleDeleteEvents}) {

  return (
    <div>
      <h3>Delete Event</h3>
          {/* <form id="delete-event" action="#" onSubmit={handleDeleteEvents}>
            <fieldset>
              <label>Event ID</label>
              <input type="number" min="1" id="delete-event-id" value={deleteId} onChange={ () => setDeleteId(e.target.value)} />
            </fieldset>
            <input type="submit" />
          </form> */}
    </div>
  )
}

export default DeleteEvent
