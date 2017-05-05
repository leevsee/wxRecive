var express = require('express');
var router = express.Router();
var md5 = require('md5');
var request = require("request");

router.get('/sign', function (req, res, next) {

    var stringA = "appid=wx584d55692bf63f7a" +
        "&body=爱预售-支付测试" +
        "&mch_id=1306260501" +
        "&nonce_str=IK27199HDM8YVGSBY9OXQ1TT9MSJFWYW" +
        "&notify_url=http://leeves.ngrok.cc/wx/receive" +
        "&openid=osoIY0ThjLz4KvAZTlRoQNlYRv08" +
        "&out_trade_no=20170425110200001" +
        "&spbill_create_ip=116.252.23.48" +
        "&total_fee=1" +
        "&trade_type=JSAPI" +
        "&key=CE9Y4T9QR24B7ZQH8XHPCU481JL2VE7D";

    var sign = md5(stringA).toUpperCase();
    console.log(sign);

    var options = {
        method: 'POST',
        url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'text/xml'
        },
        body: '<xml>' +
        '<appid>wx584d55692bf63f7a</appid>' +
        '<body>爱预售-支付测试</body>' +
        '<mch_id>1306260501</mch_id>' +
        '<nonce_str>IK27199HDM8YVGSBY9OXQ1TT9MSJFWYW</nonce_str>' +
        '<notify_url>http://leeves.ngrok.cc/wx/receive</notify_url>' +
        '<openid>osoIY0ThjLz4KvAZTlRoQNlYRv08</openid>' +
        '<out_trade_no>20170425110200001</out_trade_no>' +
        '<spbill_create_ip>116.252.23.48</spbill_create_ip>' +
        '<total_fee>1</total_fee>' +
        '<trade_type>JSAPI</trade_type>' +
        '<sign>' + sign + '</sign>' +
        '</xml>'
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.set('Content-Type', 'text/xml');
        res.status(200).send(body);
    });
});

module.exports = router;