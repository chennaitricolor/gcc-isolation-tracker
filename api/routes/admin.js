const router = require('express').Router();
const { personService, userService } = require('../services');

router.get('/persons/:id', async(req, res) => {
    const { id } = req.params;
    try {
    const person = await personService.getById(id);
    res.send(person).status(200);
    } catch(e) {
        res.json({
            message: e.message
        }).status(500);
    }
});

router.get('/users/:id', async(req, res) => {
    const { id } = req.params;
    try {
    const user = await userService.getById(id);
    res.send(user).status(200);
    } catch(e) {
        res.json({
            message: e.message
        }).status(500);
    }
});

module.exports = router;