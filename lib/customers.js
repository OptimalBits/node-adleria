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
  var url = urlJoin(baseUrl, 'customers');

  return {
    list: function(query){
      return request({
        url: url,
        method: 'GET',
        json: true,
        auth: auth,
        qs: query
      });
    },
    get:  function(id){
      return request({
        url: urlJoin(url, id),
        method: 'GET',
        json: true,
        auth: auth
      });
    },
    edit: function(id, args){
      return request({
        url: urlJoin(url, id),
        method: 'PUT',
        body: args,
        json: true,
        auth: auth
      });
    },
    create: function(args){
      return request({
        url: url,
        method: 'POST',
        body: args,
        json: true,
        auth: auth,
      });
    }
  }
}
