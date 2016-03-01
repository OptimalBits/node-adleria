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

module.exports = function (auth, baseUrl, opts) {
  var payoutOrdersUrl = urlJoin(baseUrl, 'payout-orders');
  return {
    list: function(params){
      var qs = _.defaults(params, {
        limit: 10,
        offset: 0,
        customerId: null
      });
      return request({
        method: 'GET',
        url: payoutOrdersUrl,
        auth: auth,
        qs: qs
      });
    },
    get: function(payoutOrderId, showTemplate) {
      var url = urlJoin(payoutOrdersUrl, payoutOrderId);
      return request({
        method: 'GET',
        url: url,
        auth: auth,
        qs: {
          showTemplate: showTemplate
        }
      }); 
    }
  };
};
