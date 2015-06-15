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
 
module.exports = function(auth, opts) {
	var baseUrl = opts.url || 'https://dev.adleria.com/';
	var adspacesUrl = baseUrl + 'adspaces/';
	
	var Adspaces = function(adspaceId){
		var url = adspacesUrl + adspaceId + '/players';
		return	{
			players: {
				create: function(player){
					player = _.pick(player, 'name');
					return setPlayer(url, 'POST', player);
				},
				assign: function(playerId){
					return request({
						url: url + '/' + playerId,
    					method: 'PUT',
						auth: auth
					});
				},
				unassign: function(playerId){
					return request({
						url: url + '/' + playerId,
    					method: 'DELETE',
						auth: auth
					});
				},
				list: function(qs){
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
		
		function setPlayer(url, method, data){
			return request({
    			url: url,
    			method: method,
    			body: data,
    			json: true,
				auth: auth
  			});
		}
	};
	
	Adspaces.create = function(adspace){
		// _.pick(adspace, fields);
		return request({
			url: adspacesUrl,
			method: 'POST',
			body: adspace,
			json: true,
			auth: auth
		});
	};
	 
	Adspaces.list = function(query){
		return [];
	};

	return Adspaces;
};
