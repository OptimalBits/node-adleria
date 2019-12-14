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
  var playersUrl = urlJoin(baseUrl, 'players');

  return {
    campaigns: function (auth, playerId) {
      var url = urlJoin(playersUrl, playerId, 'campaigns');
        return requestAsync({
          method: 'GET',
          url: url,
          auth: auth,
          json: true
        });
    },
    impressions: function (auth, playerId) {
      var url = urlJoin(playersUrl, playerId, 'impressions');
      return {
        add: function (campaigns) {
          if(_.isEmpty(campaigns)){
            return Promise.resolve([{statusCode: 400}]);
          }
          return Promise.all(Object.keys(campaigns).map(function(campaignId){
            var impressions = campaigns[campaignId];

            impressions.campaignId = campaignId;
            console.log("MAPPING:", impressions)
            return requestAsync({
              method: 'PUT',
              url: url,
              auth: auth,
              json: true,
              body: impressions
            });
          })).then(function(results){
            var invalid = _.find(results, function(result){
              if(result[0].statusCode !== 200){
                return result;
              }
            });
            return invalid ? invalid : results[0];
          })
        }
      };
    }
  };
};
