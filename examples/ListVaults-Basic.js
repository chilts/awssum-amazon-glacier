var dump = require('./dump.js');
var amazonGlacier = require('../awssum-amazon-glacier.js');

var glacier = new amazonGlacier.Glacier({
    'accessKeyId'     : process.env.ACCESS_KEY_ID,
    'secretAccessKey' : process.env.SECRET_ACCESS_KEY,
    'awsAccountId'    : process.env.AWS_ACCOUNT_ID,
    'region'          : amazonGlacier.US_EAST_1,
});

// ListVaults
glacier.ListVaults(function(err, data) {
    dump(err, 'err');
    dump(data, 'data');
});
