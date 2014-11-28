var assert = require('assert'),
    fs = require('fs'),
    bibtexParse = require('../zotero-bibtex-parse');

console.log('starting test');

var goodFiles = fs.readdirSync('./test/good');
goodFiles.forEach(function (file) {
    console.log(file)
    console.log('-----------------------------------------------');
    var bibTexStr = fs.readFileSync('./test/good/' + file, 'utf8');
    //console.log(bibTexStr);

    var bibTexJson = bibtexParse.toJSON(bibTexStr);
    console.log(bibTexJson);
    assert(bibTexJson.length > 0);

    var bibTexJson2 = bibtexParse.toJSON(bibtexParse.toBibtex(bibTexJson));
    assert.equal(JSON.stringify(bibTexJson),JSON.stringify(bibTexJson2));

    console.log();
    console.log();
});

var badFiles = fs.readdirSync('./test/bad');
badFiles.forEach(function (file) {
    console.log(file);
    console.log('-----------------------------------------------');
    var bibTexStr = fs.readFileSync('./test/bad/' + file, 'utf8');
    //console.log(bibTexStr);

    try {
        var bibTexJson = bibtexParse.toJSON(bibTexStr);
    } catch (err) {
        console.log('expected error ' + err);
        bibTexJson = [];
    }
    console.log(bibTexJson);
    assert(bibTexJson.length == 0);
    console.log();
    console.log();
});

// testing that properties set on collection for input to toBibtex are ignored
file = 'sample.bib';
console.log(file);
console.log('-----------------------------------------------');
var bibTexStr = fs.readFileSync('./test/good/' + file, 'utf8');
var bibTexJson = bibtexParse.toJSON(bibTexStr);
bibTexJson.randomProperty = true; // added property should be ignored
console.log(bibTexJson);
assert(bibTexJson.length == 1);
var bibTexJson2 = bibtexParse.toJSON(bibtexParse.toBibtex(bibTexJson));
assert.equal(JSON.stringify(bibTexJson),JSON.stringify(bibTexJson2));
console.log();
console.log();

console.log('test complete');
