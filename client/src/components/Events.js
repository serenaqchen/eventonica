import React, { useState, useReducer } from "react";
import DeleteEvent from "./DeleteEvent";

const event1 = {
  id: 1,
  name: "Birthday",
  time: "10:00",
  date: "2021-09-01",
  description: "A birthday party for my best friend",
  category: "in-person",
  location: "my house",
};

const event2 = {
  id: 2,
  name: "Graduation",
  time: "10:00",
  date: "2021-08-01",
  description: "The class of 2021 graduates from East High",
  category: "in-person",
  location: "UC Berkeley",
};

const event3 = {
  id: 3,
  name: "JS Study Session",
  time: "10:00",
  date: "2021-10-01",
  description: "A chance to practice Javascript interview questions",
  category: "online",
  location: "Zoom",
};

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
    default:
      return state;
  }
}

function Events() {
  const [events, setEvents] = useState([event1, event2, event3]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "editId" });
    setEvents((events) => [...events, state]);
  };

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
              Event Id: {e.id} <br/>
              {e.time} {e.date} <br />
              Description: {e.description} <br />
              Location: {e.location} <br />
              {e.category}
            </li>
          ))}
        </ul>

        <h3>Add Event</h3>
        <form id="add-event" action="#" onSubmit={onSubmit}>
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
      <DeleteEvent />
    </section>
  );
}

export default Events;
