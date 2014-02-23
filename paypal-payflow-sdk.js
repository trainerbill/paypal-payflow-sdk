/**
 * Created by athroener on 2/21/14.
 */
"use strict";

var http = require('http');
var https = require('https');
var querystring = require('querystring');
//var uuid = require('node-uuid');

var payflow = function () {
	var sdk_version = '0.6.4';
	//var user_agent = 'PayPalSDK/paypal-payflow-sdk ' + sdk_version + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + ')';
	var default_options = {
	    'schema': 'https',
	    'host': 'payflowpro.paypal.com',
	    'headers': {'Content-Type': 'application/x-www-form-urlencoded'}
    };

    function configure(options) {
        default_options = merge(default_options, options);
    }

    function executeHttp(data,cb) {

        var query = default_options.credentials;
        query = merge(query,data);
        var string = querystring.stringify(query);

        var options = {
            hostname: default_options.host,
            port: 443,
            method:'POST',
            headers: merge(default_options.headers,{'Content-Length':string.length})
        };

        var req = https.request(options,function(res){
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
                console.log(body);
            });
            res.on('end', function () {

                cb({},querystring.parse(body));
            });
        });
        req.end(string);
        req.on('error', function(e) {
            cb(e);
        });
    }

    function merge(obj1, obj2) {
        for (var p in obj2) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor === Object) {
                    obj1[p] = merge(obj1[p], obj2[p]);

                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }

    return {
        version: sdk_version,
        configure: function (options) {
            configure(options);
        },

        execute:   function(data,cb){
            executeHttp(data,cb)
        }
    };
};

module.exports = payflow();
