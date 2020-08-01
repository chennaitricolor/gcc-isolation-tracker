const router = require('express').Router();
const { wardService } = require('../services');

router.get('/', async(req, res) => {
    try {
        const wards = await wardService.getAll();
        const map = new Map();
        wards.forEach(ward => {
            const key = ward._zone.name;
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [ward]);
            } else {
                collection.push(ward);
            }
        });
        const wardsResponse = [];
        map.forEach((values, key) => {
            wardsResponse.push({
                name: key,
                wards: values,
            })
        });
        return res.status(200).send(wardsResponse);
    } catch(e) {
        return res.status(500).json({
            message: e.message
        });
    }
});

module.exports = router;
