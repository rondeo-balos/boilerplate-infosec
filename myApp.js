const express = require('express');
const helmet = require('helmet');
const app = express();

const ninetyDaysInSeconds = 90*24*60*60;

module.exports = app;
const api = require('./server.js');
/*app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({action:'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
//app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.contentSecurityPolicy({ directives: {defaultSrc:["'self'"],scriptSrc:["'self'",'trusted-cdn.com']} }));*/

app.use(helmet.noCache()); //If you are releasing an update for your website, and you want the users to always download the newer version, you can (try to) disable caching on client’s browser.
app.use( helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"]
    }
  }
}) );

app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});