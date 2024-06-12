const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.seats.length);
  res.json(db.seats[randomIndex]);
});

router.route('/seats/:id').get((req, res) => {
  const id = req.params.id;
  const seat = db.seats.find((item) => item.id === id);
  if (!seat) {
    return res.status(404).json({ message: 'seat not found' });
  }
  res.json(seat);
  db;
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newseat = {
    id: uuidv4(),
    day,
    seat,
    client,
    email,
  };
  db.seats.push(newseat);
  res.status(201).json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const id = req.params.id;
  const index = db.seats.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'seat not found' });
  }
  db.seats[index] = {
    ...db.seats[index],
    ...req.body,
    id: db.seats[index].id,
  };
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;
  const index = db.seats.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'seat not found' });
  }
  const deleted = db.seats.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;