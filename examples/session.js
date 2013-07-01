var bogart = require('../lib/bogart');

var router = bogart.router();

router.get('/', function (req) {
  var html = '<html><head><title>Bogart Session Demo</title></head><body>';

  html += '<section>'
  html += '<h1>Session Values</h1>';
  html += '<ul>';

  req.session.keys().forEach(function (key) {
    html += '<li>'+key+': '+req.session(key)+'</li>';
  });

  html += '</ul></section>';

  html += '<section><h1>Add to Session</h1>';
  html += '<form method="post" action="/">';
  html += '<label for="key">Key</label>';
  html += '<input name="key" type="text" />';
  html += '<label for="val">Value</label>'
  html += '<input name="val" />';
  html += '<input type="submit" />'
  html += '</form></section>';

  return bogart.html(html);
});

router.post('/', function (req) {
  req.session(req.params.key, req.params.val);

  return bogart.redirect('/');
});

var sessionConfig = {
  lifetime: 600
};

var app = bogart.app();
app.use(bogart.middleware.parted);
app.use(bogart.middleware.session, sessionConfig);
app.use(router);

app.start(1337);
