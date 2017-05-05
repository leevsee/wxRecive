var express = require('express');
var router = express.Router();

router.all('*',function(req, res){
    //console.log(req);
    res.render('index', { title: 'Hey', message: 'Hello 测试通知URL!'});
});


module.exports = router;