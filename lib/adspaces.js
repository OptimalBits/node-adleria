/**
 * Adleria bindings for nodejs
 * 
 * (c) 2015 Optimal Bits Sweden AB.
 * 
 */
/// <reference path="../typings/node/node.d.ts"/>
'use strict';

var request = require('request-promise');
var _ = require('lodash');
var urlJoin = require('url-join');

module.exports = function (auth, baseUrl, opts) {
  var adspacesUrl = urlJoin(baseUrl, 'adspaces/');

  var Adspaces = function (adspaceId) {
    var url = urlJoin(adspacesUrl, adspaceId, 'players');
    return {
      players: {
        create: function (player) {
          player = _.pick(player, 'name');
          return setPlayer(url, 'POST', player);
        },
        assign: function (playerId) {
          return request({
            url: urlJoin(url, playerId),
            method: 'PUT',
            auth: auth
          });
        },
        unassign: function (playerId) {
          return request({
            url: urlJoin(url, playerId),
            method: 'DELETE',
            auth: auth
          });
        },
        list: function (qs) {
          // qs = qs || '';
          return request({
            url: url,
            method: 'GET',
            json: true,
            //qs: qs
          });
        }
      }
    };

    function setPlayer(url, method, data) {
      return request({
        url: url,
        method: method,
        body: data,
        json: true,
        auth: auth
      });
    }
  };

  Adspaces.create = function (adspace) {
    // _.pick(adspace, fields);
    return request({
      url: adspacesUrl,
      method: 'POST',
      body: adspace,
      json: true,
      auth: auth
    });
  };

  Adspaces.get = function (adspaceId, ownerId) {
    return request({
      uri : adspacesUrl + '/' + adspaceId,
      method : 'GET',
      auth: auth,
      qs: {
        ownerId: ownerId
      },
      json: true
    });
  };

  Adspaces.list = function (query) {
    return request({
      uri : adspacesUrl,
      method : 'GET',
      auth: auth,
      qs: query,
      json: true
    });
  };

  Adspaces.edit = function(id, args){
    return request({
      uri : adspacesUrl + '/' + id,
      method : 'PUT',
      body: args,
      auth: auth,
      json: true
    });
  };

  Adspaces.delete = function(id, args){
    return request({
      uri : adspacesUrl + '/' + id,
      method : 'DELETE',
      auth: auth,
      body: args,
      json: true
    });
  };

  Adspaces.getCampaigns = function(id){
    return request({
      uri: adspacesUrl + '/' + id + '/campaigns',
      method: 'GET',
      auth: auth,
      json: true
    });
  };

  Adspaces.acceptCampaign = function(adspaceId, campaignId){
    var options = {
      uri: adspacesUrl + '/' + adspaceId + '/accept',
      method: 'PUT',
      body: {
        campaignId: campaignId
      },
      auth: auth,
      json:true
    }
    return request(options);
  };

  Adspaces.rejectCampaign = function(adspaceId, campaignId, reason){
    return request({
      uri: adspacesUrl + '/' + adspaceId + '/reject',
      method: 'PUT',
      body: {
        campaignId: campaignId,
        reason: reason
      },
      json:true
    });
  };

  Adspaces.getImpressions = function(adspaceId, params){
    return request({
      uri: adspacesUrl + '/' + adspaceId + '/impressions',
      method: 'GET',
      qs: params,
      auth: auth,
      json:true
    });
  }
  return Adspaces;
};
