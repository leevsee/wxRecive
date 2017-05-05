var helper = {};
module.exports.helper = helper;

const log4js = require('log4js');
log4js.configure('./config/log_config.json');

const logger = log4js.getLogger('leeves');

helper.writeInfo = function(msg){
    if(msg == null)
        msg = "";
    logger.info(msg);
};


// 配合express用的方法
module.exports.use = function(app) {
    //页面请求日志, level用auto时,默认级别是WARN
    app.use(log4js.connectLogger(logger, { level: 'info' }));
    //app.use(url,log4js.connectLogger(logger, { level: 'info' }),router);
};
