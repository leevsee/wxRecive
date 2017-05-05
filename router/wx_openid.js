var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/getopenid',function(req, res, next){
    var options = { method: 'GET',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        qs:
        { appid: 'wx584d55692bf63f7a',
            secret: '43bd6d3d7b9bd2bb71527f6ebce1c47b',
            js_code: req.query.js_code,
            grant_type: 'authorization_code' },
        headers:
        { 'postman-token': 'f4b8ad21-9658-e610-598a-1781929445cf',
            'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.status(200).json(eval("(" + body + ")"));
    });
    //res.status(200).json({"results":"ok"});
});


module.exports = router;