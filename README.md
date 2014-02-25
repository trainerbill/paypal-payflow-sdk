[![Build Status](https://travis-ci.org/trainerbill/paypal-payflow-sdk.png?branch=master)](https://travis-ci.org/trainerbill/paypal-payflow-sdk)

paypal-payflow-sdk
==================
This SDK is provided "AS-IS" with no warranty. YOU (the developer) would need to ensure that your code works well with your own platform, and that you are handling data securely

Setup
==================
```sh
git clone https://github.com/trainerbill/paypal-payflow-sdk.git
cd paypal-payflow-sdk
npm install
```

Examples
==================
```sh
node examples/DirectPayments/sale.js
node examples/DirectPayments/refund.js
```

Running Tests
==================
```sh
mocha --recursive -t 60000
```

Contribution
==================
If you would like to contribute, please fork the repo and send in a pull request.  Please run grunt before submitting.