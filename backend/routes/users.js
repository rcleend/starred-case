var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await userModel.getAll();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

router.get('/first', async function(req, res, next) {
  try {
    const user = await userModel.getFirst();
    res.json(user);
  } catch (error) {
    console.error('Error getting first user:', error);
    res.status(500).json({ error: 'Failed to get first user' });
  }
});


module.exports = router;
