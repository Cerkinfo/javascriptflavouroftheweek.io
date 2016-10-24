const ts = require('typescript');
const fs = require('fs');

const render = (callback) => {
    fs.readFile('./client.ts', 'utf8', (err, data) => {
        callback(ts.transpile(data));
    });
}

module.exports = render
