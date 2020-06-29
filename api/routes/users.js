const router = require('express').Router();
const { userService } = require('../services');
const { isAuthorized } = require('../helpers/authHelper');

router.get('/', isAuthorized, async(req, res) => {
  try {
  const zones = await userService.getAll();
  return res.send(zones).status(200);
  } catch(e) {
      return res.json({
          message: e.message
      }).status(500);
  }
});

router.get('/:id', isAuthorized, async(req, res) => {
  const { id } = req.params;
  try {
  const zone = await userService.getById(id);
  return res.send(zone).status(200);
  } catch(e) {
      return res.json({
          message: e.message
      }).status(500);
  }
});

module.exports = router;