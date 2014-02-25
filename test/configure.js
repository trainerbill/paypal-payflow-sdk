"use strict";

var payflow_sdk = require('../');

payflow_sdk.configure({
    "host": "pilot-payflowpro.paypal.com",
    "port": "443",
    "credentials":{
        "PARTNER":"PayPal",
        "VENDOR":"andrewawesome",
        "USER":"andrewawesome",
        "PWD":"andrewawesome1"
    }
});