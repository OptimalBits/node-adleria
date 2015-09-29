/**
 * Adleria bindings for nodejs
 * 
 * (c) 2015 Optimal Bits Sweden AB.
 * 
 */
/// <reference path="../typings/node/node.d.ts"/>
'use strict';

var Promise = require('bluebird');
var request = require('request-promise');
var _ = require('lodash');
var urlJoin = require('url-join');

var requestAsync = Promise.promisify(request);

module.exports = function (auth, baseUrl, opts) {
  var payoutOrdersUrl = urlJoin(baseUrl, 'payoutorders');
  return {
    list: function(agentId){
      return requestAsync({
        method: 'GET',
        url: payoutOrdersUrl,
        auth: auth,
        qs: {
          agentId: agentId
        }
      });
    },
    get: function(payoutOrderId) {
      var url = urlJoin(payoutOrdersUrl, payoutOrderId);
      return requestAsync({
        method: 'GET',
        url: url,
        auth: auth,
        qs: {
          payoutOrderId: payoutOrderId
        }
      }); 
    }
  };
};
