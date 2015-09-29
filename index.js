/**
 * Adleria bindings for nodejs
 * 
 * (c) 2015 Optimal Bits Sweden AB.
 * 
 */
/// <reference path="typings/node/node.d.ts"/>
"use strict";

module.exports = function (networkId, apiToken, opts) {
  opts = opts || {};
  var auth = {
    user: networkId,
    pass: apiToken
  };
  var baseUrl = opts.url || 'https://dev.adleria.com/';
  return {
    adspaces: require('./lib/adspaces')(auth, baseUrl, opts),
    players: require('./lib/players')(auth, baseUrl, opts),
    payoutOrders: require('./lib/payoutOrders')(auth, baseUrl, opts)
  };
};
