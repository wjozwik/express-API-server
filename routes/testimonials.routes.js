const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

router.route('/testimonials/:id').get((req, res) => {
  const id = req.params.id;
  const testimonial = db.testimonials.find((item) => item.id === id);
  if (!testimonial) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  res.json(testimonial);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newTestimonial = {
    id: uuidv4(),
    author,
    text,
  };
  db.testimonials.push(newTestimonial);
  res.status(201).json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const id = req.params.id;
  const index = db.testimonials.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  db.testimonials[index] = {
    ...db.testimonials[index],
    ...req.body,
    id: db.testimonials[index].id,
  };
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id;
  const index = db.testimonials.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  const deleted = db.testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;