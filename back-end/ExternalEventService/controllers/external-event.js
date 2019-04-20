const db = require("../database/controller");
const services = require("../services/service");

exports.home = (req, res) => {
  res.send({ status: "UP Testttttt" });
};

exports.getEvents = async (req, res) => {
  let limit = parseInt(req.query.limit);
  let startAt = req.query.startAt;
  let events;
  try {
    if (limit && startAt) {
      events = await db.getEventsHaveLimit(startAt, limit);
    } else {
      events = await db.getEvents();
    }
    res.send(events);
  } catch (err) {
    res.status(500).send({ error: `${err}` });
  }
};

exports.getEventsByType = (req, res) => {
  db.getEventByType(req.params.type)
    .then(events => {
      res.send(events);
    })
    .catch(err => {
      res.status(500).send({ error: `${err}` });
    });
};

exports.updateEvents = (req, res) => {
  services
    .updateEventToDatabase()
    .then(out => {
      res.status(201).send({ count: out });
    })
    .catch(err => {
      res.status(500).send({ error: `${err}` });
    });
};
