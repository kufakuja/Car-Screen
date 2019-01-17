const express = require('express');
const router = express.Router();

var pass = "password";

/* Home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* Adding to schedule page. */
router.get('/schedule/add', function(req, res, next) {
    res.render('addSchedule');

});



module.exports = router;
