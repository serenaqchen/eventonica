var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/* options */);
var db = pgp("postgres://localhost:5432/eventonica");

async function addEvent(data) {
  // note: this returns a Promise
  const newEvent = await db.one(
    "INSERT INTO events (name, time, date, category, location, description) values ($1, $2, $3, $4, $5, $6) RETURNING *",
    [data.name, data.time, data.date, data.category, data.location, data.description]
  );
  return newEvent;
}

async function deleteEvent(id) {
  // note: this returns a Promise
  await db.one("DELETE FROM events WHERE id = $1 RETURNING *", id);
}



/* GET events listing. */
router.get("/", async function (req, res, next) {
  const events = await db.any("SELECT * FROM events");
  res.json(events);
});

router.post("/", async function (req, res, next) {
  // save request data to a variable in routes/events.js
  console.log("body", req.body)
  return await addEvent(req.body).then(async () => {
    const events = await db.any("SELECT * FROM events");
    return res.json(events);
  });
});

// Delete event
router.delete("/:eventId", async function (req, res) {
  // save request data to a variable in routes/events.js
  const eventId = req.params.eventId;
  return await deleteEvent(eventId).then(async () => {
    const events = await db.any("SELECT * FROM events");
    return res.json(events);
  });
});

/* GET filtered events listing. */
router.get("/:filteredCategory", async function (req, res, next) {
  const filteredCategory = req.params.filteredCategory
  const events = await db.any("SELECT * FROM events WHERE category = $1", filteredCategory);
  res.json(events);
});

module.exports = router;