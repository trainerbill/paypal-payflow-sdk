'use strict';

var payflow_api = require('../../');
require('../../test/configure');
var auth = payflow_api.getModel("authorization");
var reference = payflow_api.getModel("reference");
var data = {
    ACCT: "4716792779006088",
    EXPDATE: "1118",
    CVV2: "111",
    AMT: "100"
};

try {
    auth.exchangeData(data);
    auth.validateData();

    payflow_api.execute(auth.getParameters(), function (err, res) {
        if (err) { throw err; }
        console.log('Authorization Success');
        console.log(res);
        reference.exchangeData({
            ORIGID: res.response.decoded.PNREF,
            AMT: auth.getParameters().AMT,
            TENDER: "C",
            TRXTYPE: "S"
        });
        console.log(reference.getParameters());
        payflow_api.execute(reference.getParameters(), function (err, res) {
            if (err) { throw err; }
            console.log('Reference Transaction Success');
            console.log(res);
        });
    });

}
catch (err)
{
    console.log(err);
}