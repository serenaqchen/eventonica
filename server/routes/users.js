var express = require("express");
var router = express.Router();
var pgp = require("pg-promise")(/* options */);
var db = pgp("postgres://localhost:5432/eventonica");

async function addUser(data) {
  // note: this returns a Promise
  const newUser = await db.one(
    "INSERT INTO users (name, email) values ($1, $2) RETURNING id, name, email",
    [data.name, data.email]
  );
  console.log("New User:", newUser);
  return newUser;
}

async function deleteUser(name) {
  // note: this returns a Promise
  await db.one("DELETE FROM users WHERE name = $1 RETURNING *", name);
}

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await db.any("SELECT * FROM users");
  res.json(users);
});

router.post("/", async function (req, res, next) {
  // save request data to a variable in routes/users.js
  return await addUser(req.body).then(async () => {
    const users = await db.any("SELECT * FROM users");
    return res.json(users);
  });
});

// Delete user
router.delete("/:userName", async function (req, res) {
  // save request data to a variable in routes/users.js
  const userName = req.params.userName;
  return await deleteUser(userName).then(async () => {
    const users = await db.any("SELECT * FROM users");
    return res.json(users);
  });
});

module.exports = router;
