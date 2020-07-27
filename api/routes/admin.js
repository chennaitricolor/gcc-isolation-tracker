const router = require('express').Router();
const { userService } = require('../services');

router.get('/users/:login', async(req, res) => {
    const { login } = req.params;
    console.log(login);
    try {
        const user = await userService.getByLogin(login);
        return res.send(user).status(200);
    } catch(e) {
        return res.json({
            message: e.message
        }).status(500);
    }
});

router.post('/users', async(req, res) => {
    const payload = req.body;
    try {
        const [record] = await userService.upsert(payload);
        return res.send(record).status(200);
    } catch(e) {
        return res.json({
            message: e.message
        }).status(500);
    }
});

router.delete('/users/:id', async(req, res) => {
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

router.get('/users/:id/persons', async(req, res) => {
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

router.post('/users/persons/transfer', async(req, res) => {
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

module.exports = router;