var express = require('express');
var router = express.Router();
var connection = require('../library/database');

router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM tbl_39_post ORDER BY id DESC', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('posts/index', { data: [], messages: req.flash() });
        } else {
            res.render('posts/index', { data: rows, messages: req.flash() });
        }
    });
});

module.exports = router;