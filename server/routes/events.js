var express = require('express');
var router = express.Router();

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

let events = [event1, event2, event3]


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(events);
});


module.exports = router;