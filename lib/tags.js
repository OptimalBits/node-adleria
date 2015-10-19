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
  var tagsUrl = urlJoin(baseUrl, 'tags');

  return {
    list:  function(){
      return request({
        url: tagsUrl,
        method: 'GET',
        json: true,
        auth: auth
      });
    }
  }
}