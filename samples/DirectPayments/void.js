'use strict';

var payflow_api = require('../../');
require('../../test/configure');
var auth = payflow_api.getModel("authorization");
var voidtrx = payflow_api.getModel("void");
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
        voidtrx.exchangeData({
            ORIGID: res.response.decoded.PNREF
        });
        payflow_api.execute(voidtrx.getParameters(), function (err, res) {
            if (err) { throw err; }
            console.log('Void Success');
            console.log(res);
        });
    });

}
catch (err)
{
    console.log(err);
}