const { Router } = require('express');
const { Character } = require('../models/Character');



module.exports = Router()
  .get('/', async (req, res) => {
    const chars = await Character.getAll();
    res.send(chars);
  });


