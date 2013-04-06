var util = require('util');

module.exports = exports = function(data, msg) {
    if ( msg ) {
        msg = msg + ' : ';
    }
    else {
        msg = '';
    }
    console.log(msg + util.inspect(data, false, null, true));
}
