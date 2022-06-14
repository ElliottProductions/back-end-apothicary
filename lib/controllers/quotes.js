const { Router } = require('express');
const { Quote } = require('../models/Quote');

module.exports = Router()
  .post('/', async (req, res) => {
    const { episode_id, character_id, detail } = req.body;
    const quote = await Quote.insert({ episode_id, character_id, detail });
    res.send(quote);
  });
