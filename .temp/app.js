var express = require('express');

app = express();
app.use(express.logger());

app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.static(__dirname));
});

var port = process.env.PORT || 2005;

app.listen(port);

console.log('server started '+port);