const cheerio  = require('cheerio');
const mustache = require('./js/mustache.js');
const fs       = require('fs');
const stores   = require('./stores.json');

fs.readFile('./index.html', function (err, data) {
  if (err) { throw err; }
  const $ = cheerio.load(data);

  stores.sort(
    function(a, b) {
      var aname = a.name.toLowerCase();
      var bname = b.name.toLowerCase();
      return aname === bname ? 0 : +(aname > bname) || -1;
    }
  );

  $('#Stores').html(mustache.render($('#Table').html(), {rows: stores}));

  fs.writeFile('./index.html', $.html(), (err) => {
    if (err) throw err;
    console.log('Default view updated.');
  });
});