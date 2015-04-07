var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic('./build')).listen(process.env.PORT);