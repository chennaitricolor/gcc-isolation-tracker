const router = require('express').Router();
const { personService, personIsolationService } = require('../services');
const { isAuthorized } = require('../helpers/authHelper');
const { person } = require('../models');
const logger = require('../helpers/logger');

router.post('/', async (req, res) => {
  try {
    const existingPerson = await personService.getByNameAndPhoneNumberAndStatusOpen(req.body.name, req.body.phone_number);
    if(existingPerson) {
        return res.status(500).json({
            message: 'Person entry exists already'
          });
    }
    if(req.body.phone_number.length < 7 || req.body.phone_number.length > 10) {
      return res.status(500).json({
        message: 'Phone number should be valid'
      });
    }
    if(req.body.age < 0 || req.body.age > 120) {
      return res.status(500).json({
        message: 'Age should be valid'
      });
    }
    const savedPerson = await personService.save(req.body, req.session.user);
    if (savedPerson) {
      return res.send(savedPerson);
    }
  } catch (e) {
    logger.error(JSON.stringify(e));
    return res.status(500).json({
      message: e.message
    });
  }
});

router.put('/:id', async (req, res) => {
  if(!req.params.id) {
    return res.status(500).json({
      message: 'Invalid request'
    });
  }
  const person_id = req.params.id;
  const existing_person = await personService.getById(person_id);
  if(!existing_person) {
    return res.status(500).json({
      message: 'Invalid request'
    });
  }
    if(!req.body.id) {
        return res.status(500).json({
            message: `Quarantiner entity 'id' is required`
          });
    }
    try {
      const savedPerson = await personService.update(req.body);
      if (savedPerson) {
        return res.send(savedPerson);
      }
    } catch (e) {
      logger.error(JSON.stringify(e));
      return res.status(500).json({
        message: e.message
      });
    }
  });

router.put('/:id/closeCase', async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      message: 'Invalid request',
    });
  }
  const person_id = req.params.id;
  const existing_person = await personService.getById(person_id);
  if (!existing_person) {
    return res.status(500).json({
      message: 'Invalid request',
    });
  }
  try {
    const closedPerson = await personService.closeCase(person_id, req.body.closeReason);
    if (closedPerson) {
      return res.send(closedPerson);
    }
  } catch (e) {
    logger.error(JSON.stringify(e));
    return res.status(500).json({
      message: e.message,
    });
  }
});

router.get('/', async(req, res) => {
    try {
    let persons = [];
    persons= await personService.getAll(req.session.user);
    return res.status(200).send(persons);
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
    const person = await personService.getById(id);
    return res.status(200).send(person);
    } catch(e) {
        logger.error(JSON.stringify(e));
        return res.status(500).json({
            message: e.message
        });
    }
});

router.post('/:id/isolation_enquiries', async (req, res) => {
  const { id } = req.params;
  try {
    const existingPerson = await personService.getById(id);
    if(!existingPerson) {
        return res.status(500).json({
            message: `Invalid person with id ${id}`
          });
    }
    const savedPersonIsolationDetail = await personService.saveIsolationDetail(req.body, req.session.user);
    if (savedPersonIsolationDetail) {
      return res.send(savedPersonIsolationDetail);
    }
  } catch (e) {
    logger.error(JSON.stringify(e));
    return res.status(500).json({
      message: e.message
    });
  }
});

router.get('/:id/isolation_enquiries/last_check_day', async (req, res) => {
  const { id } = req.params;
  try {
    const existingPerson = await personService.getById(id);
    if(!existingPerson) {
        return res.status(500).json({
            message: `Invalid person with id ${id}`
          });
    }
    const savedPersonIsolationDetail = await personIsolationService.getLatestEnquiryForPerson(id);
    if (savedPersonIsolationDetail) {
      return res.send(savedPersonIsolationDetail);
    }
  } catch (e) {
    logger.error(JSON.stringify(e));
    return res.status(500).json({
      message: e.message
    });
  }
});

router.get('/:id/isolation_enquiries/day/:day', async (req, res) => {
  const { id, day } = req.params;
  try {
    const existingPerson = await personService.getById(id);
    if(!existingPerson) {
        return res.status(500).json({
            message: `Invalid person with id ${id}`
          });
    }
    const savedPersonIsolationDetail = await personIsolationService.getEnquirySeqOfDayForPerson(day, id);
    console.log(JSON.stringify(savedPersonIsolationDetail));
    if (savedPersonIsolationDetail) {
      return res.send(savedPersonIsolationDetail);
    }
  } catch (e) {
    logger.error(JSON.stringify(e));
    return res.status(500).json({
      message: e.message
    });
  }
});

router.put('/:id/deleteCase', async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      message: 'Invalid request',
    });
  }
  const person_id = req.params.id;
  const existing_person = await personService.getById(person_id);
  if (!existing_person) {
    return res.status(500).json({
      message: 'Invalid request',
    });
  }
  try {
    const deletedPerson = await personService.deleteCase(person_id, req.body.deleteReason);
    if (deletedPerson) {
      return res.send(deletedPerson);
    }
  } catch (e) {
    logger.error(JSON.stringify(e));
    return res.status(500).json({
      message: e.message,
    });
  }
});

router.post('/:id/duplicate', async (req, res) => {
  const { id } = req.params;
  try {
    const existingPerson = await person.findByPk(id);
    if(!existingPerson) {
      return res.status(500).json({
        message: 'Invalid request',
      });
    }
    await personService.saveDuplicateCase(id, req.body, req.session.user);
    return res.status(200).send({message: 'saved successfully'});
  } catch (e) {
    logger.error(JSON.stringify(e));
    return res.status(500).json({
      message: e.message
    });
  }
});

module.exports = router;
