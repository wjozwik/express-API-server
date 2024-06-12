const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const db = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TO BE REMOVED
app.get('/', (req, res) => {
  res.send('<h1>HOME PAGE</h1>');
});

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

app.get('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const testimonial = db.testimonials.find((item) => item.id === id);
  if (!testimonial) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  res.json(testimonial);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const newTestimonial = {
    id: uuidv4(),
    author,
    text,
  };
  db.testimonials.push(newTestimonial);
  res.status(201).json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const index = db.testimonials.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  db.testimonials[index] = { ...db.testimonials[index], ...req.body, id: db.testimonials[index].id };
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const index = db.testimonials.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  const deleted = db.testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

