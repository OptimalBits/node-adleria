/**
 * Adleria bindings for nodejs
 *
 * (c) 2020 Optimal Bits Sweden AB.
 *
 */
/// <reference path="../typings/node/node.d.ts"/>
"use strict";

var request = require("request-promise");
var urlJoin = require("url-join");

module.exports = function (auth, baseUrl, opts) {
  var networksUrl = urlJoin(baseUrl, "networks");

  return {
    get: function () {
      return request({
        url: networksUrl,
        method: "GET",
        json: true,
        auth,
      });
    },
    edit: function (args) {
      return request({
        url: networksUrl,
        method: "PUT",
        body: args,
        json: true,
        auth,
      });
    },
    connect: {
      /**
       * Gets a Stripe Connect link in order to allow this
       * network to get paid fees for showing ads.
       */
      link: function (returnUrl) {
        return request({
          url: `${urlJoin(networksUrl, "connect")}?returnUrl=${returnUrl}`,
          method: "GET",
          auth,
        });
      },
    },
    /**
     * The customer document associated to this Network
     * required for payouts and invoicing.
     */
    customer: {
      get: function () {
        return request({
          url: urlJoin(networksUrl, "customer"),
          method: "GET",
          json: true,
          auth,
        });
      },
      put: function (args) {
        return request({
          url: urlJoin(networksUrl, "customer"),
          method: "PUT",
          body: args,
          json: true,
          auth,
        });
      },
    },
  };
};
