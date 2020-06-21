const router = require('express').Router();
const { personService } = require('../services');

router.post('/', async (req, res) => {
  try {
    const existingPerson = await personService.getByPhoneNumber(req.body.phone_number);
    if(existingPerson) {
        return res.status(500).json({
            message: `Person with phone number '${req.body.phone_number}' already exists`
          });
    }

    const savedPerson = await personService.save(req.body, req.session.user);
    if (savedPerson) {
      return res.send(savedPerson);
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message
    });
  }
});

router.put('/', async (req, res) => {
    if(!req.body.id) {
        return res.status(500).json({
            message: `Quarantiner entity 'id' is required`
          });
    }
    try {
      const savedPerson = await personService.save(req.body);
      if (savedPerson) {
        return res.send(savedPerson);
      }
    } catch (e) {
      return res.status(500).json({
        message: e.message
      });
    }
  });

router.get('/', async(req, res) => {
    const { phone_number } = req.query;
    try {
    let person = [];  
    if(phone_number)
      person = await personService.getByPhoneNumber(phone_number);
    else
      person= await personService.getAll();
    return res.send(person).status(200);
    } catch(e) {
        return res.json({
            message: e.message
        }).status(500);
    }
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
    const person = await personService.getById(id);
    return res.send(person).status(200);
    } catch(e) {
        return res.json({
            message: e.message
        }).status(500);
    }
});

module.exports = router;