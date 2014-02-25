"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var payflow_sdk = require('../../../');
require('../../configure');

var trx = require('../../../models/Base/transaction')();

describe('TransactionModel', function () {

    describe('Construction', function () {
        it('should return an object with the correct properties', function () {

            trx.should.have.property('getParameters');
            trx.should.have.property('getDefaultParameters');
            trx.should.have.property('getValidationParameters');
            trx.should.have.property('setDefaultParameters');
            trx.should.have.property('setValidationParameters');
            trx.should.have.property('exchangeData');
            trx.should.have.property('validateData');


            //Check parameters
            trx.getParameters().should.be.a('object');

            //Check default parameters
            trx.getDefaultParameters().should.be.a('object');

            //Check validation parameters
            trx.getValidationParameters().should.be.a('array');

        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable', function () {

            var data = {
                TRXTYPE: "A",
                TENDER: "P",
                AMT: "100",
                EXPDATE: "1118"
            };

            trx.exchangeData(data);

            var params = trx.getParameters();
            params.should.have.property('TRXTYPE');
            params.should.have.property('TENDER');
            params.should.have.property('AMT');
            params.should.have.property('EXPDATE');

            params.TRXTYPE.should.equal("A");
            params.TENDER.should.equal("P");
            params.AMT.should.equal("100");
            params.EXPDATE.should.equal("1118");


        });
    });
    describe('getParameters', function () {
        it('should return an object', function () {
            trx.getParameters().should.be.a('object');
        });
    });
    describe('getDefaultParameters', function () {
        it('should return an object', function () {
            trx.getDefaultParameters().should.be.a('object');
        });
    });

    describe('getValidationParameters', function () {
        it('should return an array', function () {
            trx.getValidationParameters().should.be.a('array');
        });
    });


});