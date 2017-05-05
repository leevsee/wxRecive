var express = require('express');
var router = express.Router();
var md5 = require('md5');
var request = require("request");


router.get('/md5',function(req, res, next){
    //console.log(md5(req.query.test));
    var rstr32 = randomString(32);
    var stringA = "mch_id=1306260501&nonce_str="+rstr32+"&key=CE9Y4T9QR24B7ZQH8XHPCU481JL2VE7D";
    var sign = md5(stringA).toUpperCase();
    console.log(randomString(32));
    console.log(stringA);
    console.log(sign);


    var options = { method: 'POST',
        url: 'https://api.mch.weixin.qq.com/sandboxnew/pay/getsignkey',
        headers:
        {   'cache-control': 'no-cache',
            'content-type': 'text/xml' },
        body: '<xml><mch_id>1316573801</mch_id><nonce_str>'+rstr32+'</nonce_str><sign>'+sign+'</sign></xml>' };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.status(200).send(body);
    });

});


function randomString(len) {
    var str = "";
    for(; str.length < len; str += Math.random().toString(36).substr(2)){
    }
    return str.substr(0, len).toUpperCase();
}


module.exports = router;