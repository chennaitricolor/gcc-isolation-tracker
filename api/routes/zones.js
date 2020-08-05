const router = require('express').Router();
const { zoneService } = require('../services');
const logger = require('../helpers/logger');

router.get('/', async(req, res) => {
  try {
  const zones = await zoneService.getAll();
  return res.status(200).send(zones);
  } catch(e) {
      logger.error(JSON.stringify(e));
      return res.status(500).json({
          message: e.message
      });
  }
});

router.get('/:id', async(req, res) => {
  const { id } = req.params;
  try {
  const zone = await zoneService.getById(id);
  return res.status(200).send(zone);
  } catch(e) {
      logger.error(JSON.stringify(e));
      return res.status(500).json({
          message: e.message
      });
  }
});

module.exports = router;
