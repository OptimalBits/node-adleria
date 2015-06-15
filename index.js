/**
 * Adleria bindings for nodejs
 * 
 * (c) 2015 Optimal Bits Sweden AB.
 * 
 */
/// <reference path="typings/node/node.d.ts"/>
"use strict";

module.exports = function(networkId, apiToken, opts) {
	opts = opts || {};
	var auth = {
		user: networkId,
		pass: apiToken		
	};
	return {
		adspaces: require('./lib/adspaces')(auth, opts)	
	};
};
