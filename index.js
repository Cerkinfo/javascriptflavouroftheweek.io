const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
var exphbs = require('express-handlebars'); 
app.engine('handlebars', exphbs({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3001);

const FOLDER_ENTRY_POINT = './flavours/';
const COMPILATION_FILE = 'server.js';

app.get('/', (req, res) => {
    // Listing languages
    fs.readdir(FOLDER_ENTRY_POINT, (err, files) => {
        // Picking a language
       const language = files[Math.floor(Math.random() * files.length)];
       fs.readdir(FOLDER_ENTRY_POINT + language, (err, files) => {
            // Picking a framework
            const framework = files[Math.floor(Math.random() * files.length)];
            const render = require(FOLDER_ENTRY_POINT + language + '/' + framework + '/' + COMPILATION_FILE);
            render((js) => {
                res.render('index', {
                    js: js,
                });
            });
       });
    });

});

app.get('/:language/:framework', (req, res) => {
    try {
        const render = require(FOLDER_ENTRY_POINT + req.params.language + '/' + req.params.framework + '/' + COMPILATION_FILE);
        render((js) => {
            res.render('index', {
                js: js,
            });
        });
    } catch (e) {
        res.redirect('404');
    }
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log("Express started on port : " + app.get('port') + " press Ctrl + C to stop.");
});
