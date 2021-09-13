import React, { useState, useReducer, useEffect } from "react";
import DeleteEvent from "./DeleteEvent";
import * as apiClient from "../apiClient";
import "./Events.css"

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
  const [validId, setValidId] = useState(true);
  const [filterCategory, setFilterCategory] = useState('')

  useEffect(() => {
    apiClient.getEvents().then((eventData) => {
      //change the format of the date
      for (let obj of eventData) {
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
      for (let obj of data) {
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
    dispatch({ type: "reset" });
  };

  const handleDeleteEvents = (e) => {
    e.preventDefault();
    const currentIds = []
    for (let obj of events){
      currentIds.push( obj.id )
    }
    if (currentIds.includes(Number(deleteId))){
      apiClient.deleteEvent(deleteId).then((res) => setEvents(res))
      setDeleteId('')
      setValidId(true)
    } else {
      setValidId(false)
    }
  }

  const handleShowEvent = (e) => {
    e.preventDefault();
    apiClient.getEvents().then((eventData) => {
      //change the format of the date
      for (let obj of eventData) {
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
  }

  // const handleDeleteAllEvents = (e) => {
  //   e.preventDefault();
  //   setEvents([]);
  // }

  const handleFilterEvent = (e) => {
    e.preventDefault();
    apiClient.filterEventByCategory(filterCategory).then((data) => setEvents(data))
  }


  return (
    <section className="events"> 
      <div className="show-events">
        <h2 className="event-title">Event Management</h2>
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
              {e.category} <br /><br />
            </li> 
          ))}
        </ul>
        <input type="submit" value="Show All Events" onClick={handleShowEvent}/>
        {/* <input type="submit" value="Delete All Events" onClick={handleDeleteAllEvents}/> */}
      </div>
      <div className="event-management">
        <h3>Add Event</h3>
        <form id="add-event" action="#" onSubmit={handleAddEvent}>
          <fieldset>
            <label>Name</label>
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
            <br />
            <br />
            <label>Time</label>
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
            <br />
            <br />
            <label>Date</label>
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
            <br />
            <br />
            <label>Choose a category:</label>
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
            <br />
            <br />
            <label>Location</label>
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
            <br />
            <br />
            <label>Description</label>
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
          </fieldset>
          {/* Add more form fields here */}
          <input type="submit" />
        </form>
        <DeleteEvent deleteId={deleteId} setDeleteId={setDeleteId} handleDeleteEvents={handleDeleteEvents} validId={validId}/>
          <h3>Find Events</h3>
          <form id="search" action="#">
            <fieldset>
              <label htmlFor="date-search">Date</label>
              <input type="text" id="date-search" placeholder="YYYY-MM-DD" />
            </fieldset>
            <fieldset>
            <label>Choose a category:</label>
            <select
              id="category"
              name="category"
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(e.target.value)
              }
            >
              <option value="">--Please choose an option--</option>
              <option value="online">Online</option>
              <option value="in-person">In-person</option>
            </select>
            </fieldset>

            <input type="submit" value="Search" onClick={handleFilterEvent} />
          </form>
      </div>
    </section>
  );
}



export default Events;
