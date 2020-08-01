const router = require('express').Router();
const { quarantineSubTypeService } = require('../services');
const { isAuthorized } = require('../helpers/authHelper');

router.get('/', isAuthorized, async(req, res) => {
  try {
  const quarantineSubTypes = await quarantineSubTypeService.getAll();
  return res.status(200).send(quarantineSubTypes);
  } catch(e) {
      return res.status(500).json({
          message: e.message
      });
  }
});

router.get('/:id', isAuthorized, async(req, res) => {
  const { id } = req.params;
  try {
  const quarantineSubType = await quarantineSubTypeService.getById(id);
  return res.status(200).send(quarantineSubType);
  } catch(e) {
      return res.status(500).json({
          message: e.message
      });
  }
});

router.get('/by-type/:id', isAuthorized, async(req, res) => {
  const { id } = req.params;
  try {
  const quarantineSubTypes = await quarantineSubTypeService.getByQuarantineTypeId(id);
  return res.status(200).send(quarantineSubTypes);
  } catch(e) {
      return res.status(500).json({
          message: e.message
      });
  }
});

module.exports = router;
