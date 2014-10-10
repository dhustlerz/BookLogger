var express = require('express');
var fs = require('fs');
var file = 'data/books.json';
var router = express.Router();

// example of using middleware
//router.use(function(req, res, next) {
//
//    // log each request to the console
//    console.log('Logging the request: ' + req.method, req.url);
//
//    // continue doing what we were doing and go to the route
//    next();
//});


/* GET books listing. */
router.route('/')
    .get(function(req, res) {

        fs.readFile(file, 'utf8', function(err, data) {

            if (err) {
                console.log('Error: ' + err);
                res.send('error getting books');
            }

            data = JSON.parse(data);
            //console.log(JSON.stringify(data, null, 4));
            res.send(data);
        });
    })

    .post(function(req, res) {

        console.log('POSTing something');

        fs.readFile(file, 'utf8', function (err, data) {

            if (err) {
                console.log('Error: ' + err);
                res.send('error getting books');
            }

            data = JSON.parse(data);
            var nextID = getNextAvailableID(data);

            var newBook = {
                book_id: nextID,
                title: req.body.title,
                author: req.body.author,
                year_published: req.body.year_published
            };

            data.push(newBook);

            var allBooks = JSON.stringify(data, null, 4);

            fs.writeFile(file, allBooks, function (err) {
                if (err) {
                    console.log(err);
                }
            });

            res.set('Content-Type', 'application/json');
            res.status(201).send(newBook);

        });
    });


router.route('/:id')

    .get(function(req, res) {

        var data = getBookData();

        var book = data.filter(function(item) {
            if(item.book_id == req.params.id) {
                return true;
            } else {
                return false;
            }
        });

        res.send(book[0]);
    })

    .delete(function(req, res) {

        console.log('deleting something with id ' + req.params.id);
        var idtype = typeof req.params.id;
        console.log('id type: ' + idtype);

        var data = getBookData();

        var pos = data.map(function(e) {
            return e.book_id;
        }).indexOf(parseInt(req.params.id, 10));

        console.log('pos = ' + pos);

        if (pos > -1) {
            data.splice(pos, 1);
        }

        var allBooks = JSON.stringify(data, null, 4);

        fs.writeFile(file, allBooks, function (err) {
            if (err) {
                console.log(err);
            }
        });


        res.sendStatus(204);

    });

function getNextAvailableID(allBooks) {

    var maxID = 0;

    allBooks.forEach(function(element, index, array) {

        if(element.book_id > maxID) {
            maxID = element.book_id;
        }

    });

    return ++maxID;

};

function getBookData() {
    var datafile = 'data/books.json';
    var data = fs.readFileSync(datafile, 'utf8');
    return JSON.parse(data);
};

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
