'use strict';

var payflow_api = require('../../');
require('../../test/configure');
var sale = payflow_api.getModel("sale");

var data = {
    ACCT: "4716792779006088",
    EXPDATE: "1118",
    CVV2: "111",
    AMT: "100"
};

try {
    sale.exchangeData(data);
    sale.validateData();

    payflow_api.execute(sale.getParameters(), function (err, res) {
        if (err) { throw err; }
        console.log('Success');
        console.log(res);
    });

}
catch (err)
{
    console.log(err);
}