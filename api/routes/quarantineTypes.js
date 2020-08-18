const router = require('express').Router();
const { quarantineTypeService } = require('../services');
const { isAuthorized } = require('../helpers/authHelper');
const logger = require('../helpers/logger');

router.get('/', async(req, res) => {
  try {
  const zones = await quarantineTypeService.getAll();
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
  const zone = await quarantineTypeService.getById(id);
  return res.status(200).send(zone);
  } catch(e) {
      logger.error(JSON.stringify(e));
      return res.status(500).json({
          message: e.message
      });
  }
});

module.exports = router;
