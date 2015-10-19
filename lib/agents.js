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
  var tagsUrl = urlJoin(baseUrl, 'agents');

  return {
    get:  function(id, filterArgs){
      return request({
        url: urlJoin(tagsUrl, id),
        method: 'GET',
        json: true,
        auth: auth,
        qs: filterArgs
      });
    },
    edit: function(id, filterArgs, editArgs){
      return request({
        url: urlJoin(tagsUrl, id),
        method: 'PUT',
        body: editArgs,
        json: true,
        auth: auth,
        qs: filterArgs
      });
    },
    create: function(data){
      return request({
        url: tagsUrl,
        method: 'POST',
        body: data,
        json: true,
        auth: auth,
      });
    }
  }
}
