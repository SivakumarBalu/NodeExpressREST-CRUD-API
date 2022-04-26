const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Subscribers = require('../models/subscriber');

async function getSubscribers(req, res, next) {
  // const subId = req.params.id
  let subscriber;
  try {
    subscriber = await Subscribers.findById(req.params.id);
    if (subscriber == null) {
      res.status(404).json({ message: err.message });
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
}

router.get('/', async (req, res) => {
  // console.log('in right route')
  try {
    const subscribers = await Subscribers.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const newSubs = new Subscribers({
    name: req.body.name,
    channel: req.body.channel,
  });
  try {
    const subs = await newSubs.save();
    res.status(201).json(subs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', getSubscribers, (req, res) => {
  res.json(res.subscriber);
});

router.patch('/:id', getSubscribers, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.channel != null) {
    res.subscriber.channel = req.body.channel;
  }

  try {
    const updated = await res.subscriber.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getSubscribers, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: 'Delete subscriber ' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
