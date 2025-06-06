const express = require('express');
const staffmodel = require('../models/staff.js');
const deptmodel = require('../models/dept.js');
var router = express.Router();


/* insert a staff, should have used POST instead of GET */
router.get('/add/:id/:name/:code', async function(req, res, next) {
    // res.send(`TODO`); // TODO: Fixme
    const { id, name, code } = req.params;
    const insertStaff = new staffmodel.Staff(id, name, code, new Date());
    await staffmodel.insertMany([insertStaff]);
    const staffs = await staffmodel.all();
    console.log(staffs);
    res.send(`${JSON.stringify(staffs)}`);
});

/* GET staff listing. */
router.get('/all/', async function(req, res, next) {
    // res.send(`TODO`); // TODO: Fixme
    const allStaff = await staffmodel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(allStaff)}`);
});


module.exports = router;
