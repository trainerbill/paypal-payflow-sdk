'use strict';

var payflow_api = require('../../');
require('../../test/configure');
var auth = payflow_api.getModel("authorization");
var cap = payflow_api.getModel("capture");
var refund = payflow_api.getModel("refund");
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
        cap.exchangeData({
            ORIGID: res.response.decoded.PNREF,
            AMT: auth.getParameters().AMT
        });
        payflow_api.execute(cap.getParameters(), function (err, res) {
            if (err) { throw err; }
            console.log('Capture Success');
            console.log(res);
            refund.exchangeData({
                ORIGID: res.response.decoded.PNREF
            });
            refund.validateData();
            payflow_api.execute(refund.getParameters(), function (err, res) {
                if (err) { throw err; }
                console.log('Refund Success');
                console.log(res);
            });
        });
    });

}
catch (err)
{
    console.log(err);
}