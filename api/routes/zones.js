const router = require('express').Router();
const { zoneService } = require('../services');

router.get('/', async(req, res) => {
  try {
  const zones = await zoneService.getAll();
  return res.send(zones).status(200);
  } catch(e) {
      return res.json({
          message: e.message
      }).status(500);
  }
});

router.get('/:id', async(req, res) => {
  const { id } = req.params;
  try {
  const zone = await zoneService.getById(id);
  return res.send(zone).status(200);
  } catch(e) {
      return res.json({
          message: e.message
      }).status(500);
  }
});

module.exports = router;