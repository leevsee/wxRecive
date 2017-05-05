var express = require('express');
var app = express();
//xml,json解析
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
//输出日志
var LogGen = require('./comm/myLog');
LogGen.use(app);
//设置模板引擎
app.set('view engine', 'jade');

var receive_notify = require('./router/receive_notify');
var unifiedorder = require('./router/sign');
var sendMD5 = require('./router/sendMD5');
var test = require('./router/test');
var openid = require('./router/wx_openid');

//json中间件
//var jsonParser = bodyParser.json();
//var upload = multer({ dest: 'uploads/' });

app.use('/wx',bodyParser.xml(), receive_notify);
app.use('/wx',unifiedorder);
app.use('/wx',openid);
app.use('/leeves', sendMD5);
app.use('/', test);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something blew up!' });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}


//app.all('/*',function(req, res){
//    res.render('index', { title: 'Hey', message: 'Hello 测试通知URL!'});
//});

LogGen.helper.writeInfo('service star');
app.listen(3003);