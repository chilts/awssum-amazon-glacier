// --------------------------------------------------------------------------------------------------------------------
//
// glacier.js - class for AWS Glacier
//
// Copyright (c) 2011, 2012 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------
// requires

// built-ins
var util = require('util');

// dependencies
var _ = require('underscore');

// our own
var awssum = require('awssum');
var amazon = require('awssum-amazon');
var operations = require('./config.js');
var awsSignatureV4 = require('awssum-amazon/lib/aws-signature-v4');

// --------------------------------------------------------------------------------------------------------------------
// package variables

var MARK = 'glacier: ';

// From: http://docs.amazonwebservices.com/general/latest/gr/rande.html
var endPoint = {};
endPoint[amazon.US_EAST_1]      = "glacier.us-east-1.amazonaws.com";
endPoint[amazon.US_WEST_1]      = "glacier.us-west-1.amazonaws.com";
endPoint[amazon.US_WEST_2]      = "glacier.us-west-2.amazonaws.com";
endPoint[amazon.EU_WEST_1]      = "glacier.eu-west-1.amazonaws.com";
// endPoint[amazon.AP_SOUTHEAST_1] = "";
endPoint[amazon.AP_NORTHEAST_1] = "glacier.ap-northeast-1.amazonaws.com";
// endPoint[amazon.SA_EAST_1]      = "";
// endPoint[amazon.US_GOV_WEST_1]  = "";

var version = '2012-06-01';

// --------------------------------------------------------------------------------------------------------------------
// constructor

var Glacier = function(opts) {
    var self = this;

    // call the superclass for initialisation
    Glacier.super_.call(this, opts);

    // check we have an awsAccountId
    if ( ! opts.awsAccountId ) {
        throw MARK + "provide a 'awsAccountId'";
    }
    self.setAwsAccountId(opts.awsAccountId);

    // check the region is valid
    if ( ! endPoint[opts.region] ) {
        throw MARK + "invalid region '" + opts.region + "'";
    }

    return self;
};

// inherit from Amazon
util.inherits(Glacier, amazon.AmazonSignatureV2);

// --------------------------------------------------------------------------------------------------------------------
// methods we need to implement from awssum.js/amazon.js

Glacier.prototype.scope = function() {
    return 'glacier';
};

Glacier.prototype.serviceName = function() {
    return 'Glacier';
};

Glacier.prototype.needsTarget = function() {
    return false;
};

Glacier.prototype.host = function() {
    return endPoint[this.region()];
};

Glacier.prototype.version = function() {
    return version;
};

Glacier.prototype.extractBody = function() {
    return 'json';
};

// this service uses the AWS Signature v4
Glacier.prototype.strToSign        = awsSignatureV4.strToSign;
Glacier.prototype.signature        = awsSignatureV4.signature;
Glacier.prototype.addSignature     = awsSignatureV4.addSignature;
// Glacier.prototype.addCommonOptions = awsSignatureV4.addCommonOptions;
Glacier.prototype.contentType      = awsSignatureV4.contentType;
Glacier.prototype.addCommonOptions = function(options, args) {
    var self = this;

    // yes, Signature v4, but we also need this
    options.headers['x-amz-glacier-version'] = self.version();

    // now call the signature addCommonOptions
    awsSignatureV4.addCommonOptions.apply(self, [ options, args ]);
};

// --------------------------------------------------------------------------------------------------------------------
// operations on the service

_.each(operations, function(operation, operationName) {
    Glacier.prototype[operationName] = awssum.makeOperation(operation);
});

// --------------------------------------------------------------------------------------------------------------------
// exports

// endpoints
exports.US_EAST_1      = amazon.US_EAST_1;
exports.US_WEST_1      = amazon.US_WEST_1;
exports.US_WEST_2      = amazon.US_WEST_2;
exports.EU_WEST_1      = amazon.EU_WEST_1;
// exports.AP_SOUTHEAST_1 = amazon.AP_SOUTHEAST_1;
// exports.AP_SOUTHEAST_2 = amazon.AP_SOUTHEAST_2;
exports.AP_NORTHEAST_1 = amazon.AP_NORTHEAST_1;
// exports.SA_EAST_1      = amazon.SA_EAST_1;
// exports.US_GOV_WEST    = amazon.US_GOV_WEST;

exports.Glacier = Glacier;

// --------------------------------------------------------------------------------------------------------------------
