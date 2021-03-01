const database = require('./database');


const CONSOLE_COLOR_YELLOW = "\x1b[33m%s\x1b[0m";
const CONSOLE_COLOR_RED = "\x1b[31m%s\x1b[0m";
const CONSOLE_COLOR_BLUE = "\x1b[34m%s\x1b[0m";

const logError = (msg) => {
    console.log(CONSOLE_COLOR_RED, msg);
};
    
const logInfo = (msg) => {
    console.log(CONSOLE_COLOR_BLUE, msg);
};
    
const logWarn = (msg) => {
    console.log(CONSOLE_COLOR_YELLOW, msg);
};

// get current timestamp in unix format
const getEpochTime = () => {
    return Math.floor(new Date().getTime() / 1000);
};
    
// return error
const raiseError = (context, message, status = 500) => {
    context.log.error(message);
    context.res = { status, body: { success: false, message } };
    context.done();
};

module.exports = {
    logError,
    logInfo,
    logWarn,
    getEpochTime,
    raiseError
}

