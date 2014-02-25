"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var payflow_sdk = require('../../');
require('../configure');



describe('SaleModel', function () {
    describe('Construction', function () {
        it('should return an object with the correct properties',function(){
            var sale = require('../../models/DirectPayments/sale');
            sale.should.have.property('getParameters');
            sale.should.have.property('exchangeData');
            sale.should.have.property('validateData');

            //Check default parameters
            sale.getParameters().should.have.property('TRXTYPE');
            sale.getParameters().TRXTYPE.should.equal("S");
            sale.getParameters().should.have.property('TENDER');
            sale.getParameters().TENDER.should.equal("C");
        });
    });
    describe('exchangeData', function () {
        it('should populate the object parameters variable',function(){

            var data = {
                TRXTYPE:"A",
                TENDER:"P",
                AMT:"100",
                EXPDATE:"1118"
            };

            var sale = require('../../models/DirectPayments/sale');
            sale.exchangeData(data);
            var params = sale.getParameters();
            params.should.have.property('TRXTYPE');
            params.should.have.property('TENDER');
            params.should.have.property('AMT');
            params.should.have.property('EXPDATE');
            //TRXTYPE and TENDER should be overridden by the model defaults
            params.TRXTYPE.should.equal("S");
            params.TENDER.should.equal("C");
            params.AMT.should.equal("100");
            params.EXPDATE.should.equal("1118");


        });
    });
});