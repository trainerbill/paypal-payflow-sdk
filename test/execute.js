"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var payflow_sdk = require('../');
require('./configure');


describe('SDK', function () {
    describe('Execute', function () {
        it('execute',function(){
            var data = {
                TRXTYPE:"S",
                TENDER:"C",
                ACCT:"4556209654007209",
                EXPDATE:"1118",
                CVV2:"111",
                AMT:"100"
            };
            payflow_sdk.execute(data,function(error,data){
                expect(error).equal(null);
                expect(data.RESULT).equal("0");

                done();
            });
        });
    });
});