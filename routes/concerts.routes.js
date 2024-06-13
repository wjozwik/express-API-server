const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.concerts.length);
  res.json(db.concerts[randomIndex]);
});

router.route('/concerts/:id').get((req, res) => {
  const id = req.params.id;
  const concert = db.concerts.find((item) => item.id === id);
  if (!concert) {
    return res.status(404).json({ message: 'concert not found' });
  }
  res.json(concert);
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newconcert = {
    id: uuidv4(),
    performer,
    genre,
    price,
    day,
    image,
  };
  db.concerts.push(newconcert);
  res.status(201).json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const id = req.params.id;
  const index = db.concerts.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'concert not found' });
  }
  db.concerts[index] = {
    ...db.concerts[index],
    ...req.body,
    id: db.concerts[index].id,
  };
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;
  const index = db.concerts.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'concert not found' });
  }
  const deleted = db.concerts.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;