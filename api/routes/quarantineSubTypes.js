const router = require('express').Router();
const { quarantineSubTypeService } = require('../services');

router.get('/', async(req, res) => {
  try {
  const quarantineSubTypes = await quarantineSubTypeService.getAll();
  return res.send(quarantineSubTypes).status(200);
  } catch(e) {
      return res.json({
          message: e.message
      }).status(500);
  }
});

router.get('/:id', async(req, res) => {
  const { id } = req.params;
  try {
  const quarantineSubType = await quarantineSubTypeService.getById(id);
  return res.send(quarantineSubType).status(200);
  } catch(e) {
      return res.json({
          message: e.message
      }).status(500);
  }
});

router.get('/by-type/:id', async(req, res) => {
  const { id } = req.params;
  try {
  const quarantineSubTypes = await quarantineSubTypeService.getByQuarantineTypeId(id);
  return res.send(quarantineSubTypes).status(200);
  } catch(e) {
      return res.json({
          message: e.message
      }).status(500);
  }
});

module.exports = router;