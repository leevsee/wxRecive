var express = require('express');
var router = express.Router();
var request = require("request");
var js2xmlparser = require("js2xmlparser");
var LogRecord = require('../comm/myLog').helper;

router.post('/receive',function(req, res){

    var xml = js2xmlparser.parse("xml", req.body.xml);
    LogRecord.writeInfo(xml);

    var options = { method: 'POST',
        url: 'http://192.168.0.33/AYSAPI/api/WxPayPost/Get_Notice_url',
        headers:
        {   'cache-control': 'no-cache',
            'content-type': 'text/xml' },
        body: xml };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.status(200).send(body);
        //res.status(200).json({"results":"ok", message: '返回成功通知!', test: body});
    });

    //res.render('recive', { title: 'Hey', message: '返回成功通知!'});
});


module.exports = router;