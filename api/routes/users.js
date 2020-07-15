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

// router.get('/:id', isAuthorized, async(req, res) => {
//   const { id } = req.params;
//   try {
//   const zone = await userService.getById(id);
//   return res.send(zone).status(200);
//   } catch(e) {
//       return res.json({
//           message: e.message
//       }).status(500);
//   }
// });

router.get('/:login', isAuthorized, async(req, res) => {
    const { login } = req.params;
    try {
        const user = await userService.getByLogin(login);
        return res.send(user).status(200);
    } catch(e) {
        return res.json({
            message: e.message
        }).status(500);
    }
});

router.get('/:id/persons', isAuthorized, async(req, res) => {
    try {
        const { id } = req.params;
        const persons = await userService.getPersonsByUser(id);
        const personslist = persons.map(p => p._person);
        return res.send(personslist).status(200);
    } catch(e) {
        return res.json({
            message: e.message
        }).status(500);
    }
});

router.post('/', isAuthorized, async(req, res) => {
    const payload = req.body;
    try {
        const [record, created] = await userService.upsert(payload);
        return res.send(record).status(200);
    } catch(e) {
        return res.json({
            message: e.message
        }).status(500);
    }
});

router.post('/persons/transfer', isAuthorized, async(req, res) => {
    try {
        const payload = req.body;
        const persons = await userService.transferPersonsToUser(payload);
        return res.send(persons).status(200);
    } catch(e) {
        return res.json({
            message: e.message
        }).status(500);
    }
});

router.delete('/:id', isAuthorized, async(req, res) => {
    const { id } = req.params;
    try {
        await userService.deleteUserById(id);
        return res.json({}).status(200);
    } catch(e) {
        return res.json({
            message: e.message
        }).status(500);
    }
});

module.exports = router;