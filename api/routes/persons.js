const router = require('express').Router();
const { personService, personIsolationService } = require('../services');
const { isAuthorized } = require('../helpers/authHelper');

router.post('/', isAuthorized, async (req, res) => {
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
    return res.status(500).json({
      message: e.message
    });
  }
});

router.put('/:id', isAuthorized, async (req, res) => {
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
      return res.status(500).json({
        message: e.message
      });
    }
  });

router.put('/:id/closeCase', isAuthorized, async (req, res) => {
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
    const closedPerson = await personService.closeCase(person_id);
    if (closedPerson) {
      return res.send(closedPerson);
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
});

router.get('/', isAuthorized, async(req, res) => {
    try {
    let persons = [];  
    persons= await personService.getAll(req.session.user);
    return res.send(persons).status(200);
    } catch(e) {
        return res.json({
            message: e.message
        }).status(500);
    }
});

router.get('/:id', isAuthorized, async(req, res) => {
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

router.post('/:id/isolation_enquiries', isAuthorized, async (req, res) => {
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
    return res.status(500).json({
      message: e.message
    });
  }
});

router.get('/:id/isolation_enquiries/last_check_day', isAuthorized, async (req, res) => {
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
    return res.status(500).json({
      message: e.message
    });
  }
});

router.get('/:id/isolation_enquiries/day/:day', isAuthorized, async (req, res) => {
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
    return res.status(500).json({
      message: e.message
    });
  }
});

module.exports = router;