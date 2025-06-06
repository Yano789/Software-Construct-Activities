const express = require('express');
const deptmodel = require('../models/dept.js');
const staffmodel = require('../models/staff.js');
var router = express.Router();


router.get('/add/:code', async function(req, res, next) {
    
    // res.send(`TODO`); // TODO: Fixme
    const code = req.params.code;
    const cd = new deptmodel.Dept(code, new Date());
    await deptmodel.insertMany([cd]);
    const dept = await deptmodel.all();
    res.send(`${JSON.stringify(dept)}`);

});



/* GET dept listing. */

router.get('/all/', async function(req, res, next) {
    // res.send(`TODO`); // TODO: Fixme
    const all = await deptmodel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(all)}`);
});


router.get('/all/withstaff/', async function(req, res, next) {
    // res.send(`TODO`); // TODO: Fixme
    const dept = await deptmodel.all();
    const staff = await staffmodel.all();
    const withstaff = dept.map(d => {
        return {
            code: d.code,
            staff: staff.filter(s => s.dept === d.code)
        };
    });
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(withstaff)}`);
})


module.exports = router;
