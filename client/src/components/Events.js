import React, { useState, useReducer, useEffect } from "react";
import DeleteEvent from "./DeleteEvent";
import * as apiClient from "../apiClient";

const initialState = {
  id: 3,
  name: "",
  time: "",
  date: "",
  description: "",
  category: "",
  location: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "editId":
      return { ...state, id: state.id + 1 };
    case "editName":
      return { ...state, name: action.payload };
    case "editTime":
      return { ...state, time: action.payload };
    case "editDate":
      return { ...state, date: action.payload };
    case "editDescription":
      return { ...state, description: action.payload };
    case "editCategory":
      return { ...state, category: action.payload };
    case "editLocation":
      return { ...state, location: action.payload };
    case "reset":
      return {
        ...state,
        name: "",
        time: "",
        date: "",
        description: "",
        category: "",
        location: "",
      };
    default:
      return state;
  }
}

function Events() {
  const [events, setEvents] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    apiClient.getEvents().then((eventData) => {
      //change the format of the date 
      for (let obj of eventData){
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        let dt = new Date(obj.date);
        let fullDate = dt.toLocaleDateString("en-US", options);
        obj.date = fullDate;
      }
      setEvents(eventData);
    });
  }, []);

  const handleAddEvent = (e) => {
    e.preventDefault();
    dispatch({ type: "editId" });
    apiClient.postEvent(state).then((data) => {
      for (let obj of data){
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        let dt = new Date(obj.date);
        let fullDate = dt.toLocaleDateString("en-US", options);
        obj.date = fullDate;
      }
      setEvents(data);
    });
    dispatch({type: "reset"})
  };

  // const handleDeleteEvents = (e) => {
  //   e.preventDefault();

  // }

  return (
    <section className="event-management">
      <h2>Event Management</h2>
      <div>
        <h3>All Events</h3>
        <ul id="events-list">
          {/* Display all Events here */}
          {events.map((e, index) => (
            <li key={index}>
              {e.name} <br />
              Event Id: {e.id} <br />
              {e.date} @ {e.time} <br />
              Description: {e.description} <br />
              Location: {e.location} <br />
              {e.category}
            </li>
          ))}
        </ul>

        <h3>Add Event</h3>
        <form id="add-event" action="#" onSubmit={handleAddEvent}>
          <fieldset>
            <label>
              Name
              <input
                type="text"
                id="add-event-name"
                placeholder="Virtual corgi meetup"
                value={state.name}
                onChange={(e) =>
                  dispatch({
                    type: "editName",
                    payload: e.target.value,
                  })
                }
                required
              />
            </label>
            <br/><br/>
            <label>
              Time
              <input
                id="add-event-time"
                type="time"
                value={state.time}
                onChange={(e) =>
                  dispatch({
                    type: "editTime",
                    payload: e.target.value,
                  })
                }
                required
              />
            </label>
            <br/><br/>
            <label>
              Date
              <input
                id="add-event-date"
                type="date"
                value={state.date}
                onChange={(e) =>
                  dispatch({
                    type: "editDate",
                    payload: e.target.value,
                  })
                }
                required
              />
            </label>
            <br/><br/>
            <label>
              Choose a category:
              <select
                id="category"
                name="category"
                value={state.category}
                onChange={(e) =>
                  dispatch({
                    type: "editCategory",
                    payload: e.target.value,
                  })
                }
              >
                <option value="">--Please choose an option--</option>
                <option value="online">Online</option>
                <option value="in-person">In-person</option>
              </select>
            </label>
            <br/><br/>
            <label>
              Location
              <input
                id="add-event-location"
                type="text"
                value={state.location}
                onChange={(e) =>
                  dispatch({
                    type: "editLocation",
                    payload: e.target.value,
                  })
                }
                required
              />
            </label>
            <br/><br/>
            <label>
              Description
              <input
                id="add-event-description"
                type="text"
                value={state.description}
                onChange={(e) =>
                  dispatch({
                    type: "editDescription",
                    payload: e.target.value,
                  })
                }
                required
              />
            </label>
          </fieldset>
          {/* Add more form fields here */}
          <input type="submit" />
        </form>
      </div>
    </section>
  );
}

//<DeleteEvent deleteId={deleteId} setDeleteId={setDeleteId} handleDeleteEvents={handleDeleteEvents}/>

export default Events;
