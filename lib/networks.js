/**
 * Adleria bindings for nodejs
 * 
 * (c) 2015 Optimal Bits Sweden AB.
 * 
 */
/// <reference path="../typings/node/node.d.ts"/>
'use strict';

var request = require('request-promise');
var urlJoin = require('url-join');

module.exports = function (auth, baseUrl, opts) {
  var networksUrl = urlJoin(baseUrl, 'networks');

  return {
    get:  function(){
      return request({
        url: urlJoin(networksUrl),
        method: 'GET',
        json: true,
        auth: auth
      });
    },
    edit: function(args){
      return request({
        url: urlJoin(networksUrl),
        method: 'PUT',
        body: args,
        json: true,
        auth: auth
      });
    }
  }
}