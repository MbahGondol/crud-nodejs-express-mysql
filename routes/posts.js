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

router.get('/create', function (req, res, next) {
    res.render('posts/create', {
        title: '',
        content: ''
    })
})

router.post('/store', function (req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    let errors = false;

    if (title.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('posts/create', {
            title: title,
            content: content
        });
    }

    // if no error
    if (!errors) {
       let formData = {
        title: title,
        content: content
    }

    // insert query
    connection.query('INSERT INTO tbl_39_post SET ?', formData, function (err, result) {
        // if (err) throw err
        if (err) {
            req.flash('error', err);

            // render to add.ejs
            res.render('posts/create', {
                title: formData.title,
                content: formData.content
            });
        } else {
            req.flash('success', 'Data Berhasil Disimpan Njir!');
            res.redirect('/posts');
        }
    })
    }
})

// Edit Post
router.get('/edit/(:id)', function (req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM tbl_39_post WHERE id = ' + id, function (err, rows, fields) {
        if(err) throw err

        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan ID ' + id +  "Tidak Ditemukan");
            res.redirect('/posts');
        } 
        // if book found
        else {
            // render to edit.ejs
            res.render('posts/edit', {
                id: rows[0].id,
                title: rows[0].title,
                content: rows[0].content
            })
        }
    })
})

// Update Post
router.post('/update/:id', function (req, res, next) {
    let id = req.params.id;
    let title = req.body.title;
    let content = req.body.content;
    let errors = false;

    if (title.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('posts/edit', {
            id: req.params.id,
            title: title,
            content: content
        })
    }

    if(content.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('posts/edit', {
            id: req.params.id,
            title: title,
            content: content
        })
    }

    // if no error
    if (!errors) {

        let formData = {
            title: title,
            content: content
    }

    // update query
    connection.query('UPDATE tbl_39_post SET ? WHERE id = ' + id, formData, function (err, result) {
        // if (err) throw err
        if (err) {
            // set flash message
            req.flash('error', err);
            // render to edit.ejs
            res.render('posts/edit', {
                id: req.params.id,
                title: formData.title,
                content: formData.content
            })
        } else {
            req.flash('success', 'Data Berhasil Diupdate Bjir!');
            res.redirect('/posts');
        }
    })
    }
})

module.exports = router;