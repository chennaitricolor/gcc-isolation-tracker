const router = require('express').Router();
const { userService } = require('../services');
const logger = require('../helpers/logger');

router.get('/users/:login', async(req, res) => {
    const { login } = req.params;
    try {
        const region = req.headers.region ? req.headers.region : 'GCC';
        const user = await userService.getByLogin(login, region);
        return res.status(200).send(user);
    } catch(e) {
        logger.error(JSON.stringify(e));
        return res.status(500).json({
            message: e.message
        });
    }
});

router.post('/users', async(req, res) => {
    const payload = req.body;
    try {
        const [record, created] = await userService.upsert(payload);
        console.log(record, created);
        return res.status(200).send(record);
    } catch(e) {
        logger.error(JSON.stringify(e));
        return res.status(500).json({
            message: e.message
        });
    }
});

router.delete('/users/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const region = req.headers.region ? req.headers.region : 'GCC';
        await userService.deleteUserById(id, region);
        return res.status(200).json({});
    } catch(e) {
        logger.error(JSON.stringify(e));
        return res.status(500).json({
            message: e.message
        });
    }
});

router.get('/users/:id/persons', async(req, res) => {
    try {
        const { id } = req.params;
        const persons = await userService.getPersonsByUser(id);
        const personslist = persons.map(p => p._person);
        return res.status(200).send(personslist);
    } catch(e) {
        logger.error(JSON.stringify(e));
        return res.status(500).json({
            message: e.message
        });
    }
});

router.post('/users/persons/transfer', async(req, res) => {
    try {
        const payload = req.body;
        const persons = await userService.transferPersonsToUser(payload);
        return res.status(200).send(persons);
    } catch(e) {
        logger.error(JSON.stringify(e));
        return res.status(500).json({
            message: e.message
        });
    }
});

module.exports = router;
