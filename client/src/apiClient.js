export const getUsers = () => {
  return fetch("http://localhost:3000/users")
    .then((res) => res.json())
};

export const deleteUser = (deleteId) => {
  return fetch(`http://localhost:3000/users/${deleteId}`,{method: 'DELETE'})
  .then(response => response.json())
}

export const getEvents = () => {
  return fetch("http://localhost:3000/events")
    .then((res) => res.json())
};

export const addEvent = async (name) => {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return response.json();
};