'use strict';

var payflow_api = require('../../');
require('../../test/configure');
var createRecurringBillingProfile = payflow_api.getModel("createrecurringbillingprofile");
var cancelRecurringBillingProfile = payflow_api.getModel("cancelrecurringbillingprofile");
//Create datestring for START
var date = new Date();
var month = date.getMonth() + 2;
if (month < 10) {
    month = '0' + month;
}
else if (month > 12) {
    month = '01';
}
var day = date.getDate();
var year = date.getFullYear();
var datestring = '' + month + day + year;

var data = {
    ACCT: "4716792779006088",
    EXPDATE: "1118",
    CVV2: "111",
    TENDER: "C",
    AMT: "100",
    PROFILENAME: "MyTestProfile",
    START: datestring,
    TERM: "0",
    PAYPERIOD: "MONT"
};

try {
    createRecurringBillingProfile.exchangeData(data);
    createRecurringBillingProfile.validateData();

    payflow_api.execute(createRecurringBillingProfile.getParameters(), function (err, res) {
        if (err) { throw err; }
        console.log('Profile Created');
        var data = {
            ORIGPROFILEID: res.response.decoded.PROFILEID
        };
        cancelRecurringBillingProfile.exchangeData(data);
        cancelRecurringBillingProfile.validateData();
        payflow_api.execute(cancelRecurringBillingProfile.getParameters(), function (err, res) {
            if (err) { throw err; }
            console.log('Profile Removed');
            console.log(res);
        });
    });

}
catch (err)
{
    console.log(err);
}