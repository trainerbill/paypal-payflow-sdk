'use strict';

var _ = require('underscore');

var authorization = function AuthorizationModel() {

    var validation_parameters = ['AMT','ACCT','EXPDATE','TRXTYPE','TENDER'];
    var parameters = {
        TRXTYPE:'A',
        TENDER:'C'
    };

    return {

        getParameters: function(){
            return parameters;
        },
        exchangeData: function(data){
             _.extend(data,parameters);
             parameters = data;
            return parameters;
        },
        validateData: function(data){
            validation_parameters.forEach(function(v){
                if(parameters[v] === undefined)
                {
                    throw v+": Required parameter for this transaction is undefined"
                }
            });
        }
    };
};

module.exports = authorization();