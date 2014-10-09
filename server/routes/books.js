var express = require('express');
var fs = require('fs');
var file = 'data/books.json';
var router = express.Router();

/* GET books listing. */
router.get('/', function(req, res) {

    fs.readFile(file, 'utf8', function(err, data) {

        if (err) {
            console.log('Error: ' + err);
            res.send('error getting books');
        }

        data = JSON.parse(data);
        //console.log(JSON.stringify(data, null, 4));
        res.send(data);
    });
});




router.get('/:id', function(req, res) {

    console.log('requested book id: ' + req.params.id);

    fs.readFile(file, 'utf8', function(err, data) {

        if (err) {
            console.log('Error: ' + err);
            res.send('error getting books');
        }

        data = JSON.parse(data);

        var book = data.filter(function(item) {
            if(item.book_id == req.params.id) {
                return true;
            } else {
                return false;
            }
        });

        res.send(book[0]);
    });
});

router.post('/:id', function(req, res) {

    console.log('requested book id: ' + req.params.id);

    fs.readFile(file, 'utf8', function(err, data) {

        if (err) {
            console.log('Error: ' + err);
            res.send('error getting books');
        }

        data = JSON.parse(data);

        var book = data.filter(function(item) {
            if(item.book_id == req.params.id) {
                return true;
            } else {
                return false;
            }
        });

        res.send(book[0]);
    });
});


module.exports = router;
