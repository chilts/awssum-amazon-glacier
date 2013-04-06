# awssum-amazon-glacier #

This is an ```AwsSum``` plugin!

You'll need to add [awssum-amazon-glacier](https://github.com/awssum/awssum-amazon-glacier/) to your package.json
dependencies. Both [awssum](https://github.com/awssum/awssum/) and
[awssum-amazon](https://github.com/awssum/awssum-amazon/) are pulled in as peer dependencies.

## Example ##

To list all your vaults:

```
var fmt = require('fmt');
var amazonGlacier = require('awssum-amazon-glacier');

var glacier = new amazonGlacier.Glacier({
    'accessKeyId'     : process.env.ACCESS_KEY_ID,
    'secretAccessKey' : process.env.SECRET_ACCESS_KEY,
    'awsAccountId'    : process.env.AWS_ACCOUNT_ID,
    'region'          : amazonGlacier.US_EAST_1
});

glacier.ListVaults(function(err, data) {
    fmt.dump(err, 'err');
    fmt.dump(data, 'data');
});
```

Note: The Glacier requires your ```AWS Account Id```, hence it is also required here.

# Author #

Written by [Andrew Chilton](http://chilts.org/) - [Blog](http://chilts.org/blog/) -
[Twitter](https://twitter.com/andychilton).

# License #

* [Copyright 2011-2013 Apps Attic Ltd.  All rights reserved.](http://appsattic.mit-license.org/2011/)
* [Copyright 2013 Andrew Chilton.  All rights reserved.](http://chilts.mit-license.org/2013/)

(Ends)
