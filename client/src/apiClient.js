export const getUsers = () => {
  return fetch("http://localhost:3000/users").then((res) => res.json());
};

export const deleteUser = (deleteName) => {
  return fetch(`http://localhost:3000/users/${deleteName}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

export const postUser = (newUser) => {
  return fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: { "content-type": "application/json" },
  }).then((res) => res.json());
};

export const getEvents = () => {
  return fetch("http://localhost:3000/events").then((res) => res.json())
};

export const postEvent = async (newEvent) => {
  if(parseInt(newEvent.time.slice(0,2)) > 12 ){
    const formatedTime = `${parseInt(newEvent.time.slice(0,2)) - 12}${newEvent.time.slice(2,5)} PM`
    newEvent.time = formatedTime
  } else {
    newEvent.time = `${newEvent.time.slice(0,5)} AM`
  }
  console.log('front end', JSON.stringify(newEvent))
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(newEvent),
    headers: { "content-type": "application/json"},
  });
  return response.json();
};
