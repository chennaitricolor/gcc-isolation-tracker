const router = require('express').Router();
const { dashboardService } = require('../services');

router.get('/reports/gcc-dashboard', (req, res) => {
  try {
    dashboardService.getReport().then((response, err) => {
      return res.send(response);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e.message,
    });
  }
});

module.exports = router;