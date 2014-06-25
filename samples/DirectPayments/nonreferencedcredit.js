'use strict';

var payflow_api = require('../../');
require('../../test/configure');
var nrc = payflow_api.getModel("nonreferencedcredit");
var data = {
    ACCT: "4716792779006088",
    EXPDATE: "1118",
    AMT: "100"
};

try {
    nrc.exchangeData(data);
    nrc.validateData();

    payflow_api.execute(nrc.getParameters(), function (err, res) {
        if (err) { throw err; }
        console.log('Refund Success');
        console.log(res);

    });

}
catch (err)
{
    console.log(err);
}