'use strict';

var payflow_api = require('../../');
require('../../test/configure');
var convertRecurringBillingProfile = payflow_api.getModel("convertrecurringbillingprofile");
var auth = payflow_api.getModel("authorization");

//Do an authorization and get the PNREF
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

        console.log('Auth created.  Converting to Recurring Billing Profile.  PNREF:' + res.response.decoded.PNREF);
        //Execute convert transaction to rb profile
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
            ORIGID: res.response.decoded.PNREF,
            TENDER: "C",
            AMT: "100",
            PROFILENAME: "MyTestProfile",
            START: datestring,
            TERM: "0",
            PAYPERIOD: "MONT"
        };

        try {
            convertRecurringBillingProfile.exchangeData(data);
            convertRecurringBillingProfile.validateData();

            payflow_api.execute(convertRecurringBillingProfile.getParameters(), function (err, res) {
                if (err) { throw err; }
                console.log('Success');
                console.log(res);
            });

        }
        catch (err)
        {
            console.log(err);
        }

    });

}
catch (err)
{
    console.log(err);
}



