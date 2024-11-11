const express = require('express');
const router = express.Router();
const favouritesModel = require('../models/favouritesModel');

router.post("/", async function (req, res) {
  try {
    const { userId, jobId } = req.body;
    if (!userId || !jobId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    await favouritesModel.add(userId, jobId);
    const favouriteIds = await favouritesModel.getByUserId(userId);
    return res.json(favouriteIds);
  } catch (error) {
    console.error('Error adding favourite:', error);
    res.status(500).json({ error: 'Failed to add favourite' });
  }
});

router.delete("/", async function (req, res) {
  try {
    const { userId, jobId } = req.body;
    if (!userId || !jobId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await favouritesModel.remove(userId, jobId);
    const favouriteIds = await favouritesModel.getByUserId(userId);
    return res.json(favouriteIds);
  } catch (error) {
    console.error('Error removing favourite:', error);
    res.status(500).json({ error: 'Failed to remove favourite' });
  }
});

router.get('/:userId', async function(req, res) {
  try {
    const userId = req.params.userId;
    const favouriteIds = await favouritesModel.getByUserId(userId);
    return res.json(favouriteIds);
  } catch (error) {
    console.error('Error getting favourites:', error);
    res.status(500).json({ error: 'Failed to get favourites' });
  }
});

module.exports = router;
