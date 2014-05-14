'use strict';

var payflow_api = require('../../../');
require('../../../test/configure');
var setec = payflow_api.getModel("setexpresscheckoutba");

var data = {
    TRXTYPE: "S",
    RETURNURL: "http://localhost",
    CANCELURL: "http://localhost",
    AMT: "100.00"
};

try {
    setec.exchangeData(data);
    setec.validateData();

    payflow_api.execute(setec.getParameters(), function (err, res) {
        if (err) { throw err; }
        console.log('Success');
        console.log(res);
    });

}
catch (err)
{
    console.log(err);
}