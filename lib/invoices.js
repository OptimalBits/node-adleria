/**
 * Adleria bindings for nodejs
 *
 * (c) 2021 Optimal Bits Sweden AB.
 *
 */
/// <reference path="../typings/node/node.d.ts"/>
"use strict";

const request = require("request-promise");
const _ = require("lodash");
const urlJoin = require("url-join");

module.exports = function (auth, baseUrl, opts) {
  const invoicesUrl = urlJoin(baseUrl, "invoices");
  return {
    list: function (params) {
      var qs = _.defaults(params, {
        limit: 10,
        offset: 0,
        customerId: null,
      });
      return request({
        method: "GET",
        url: invoicesUrl,
        auth: auth,
        qs: qs,
      });
    },
    get: function (invoiceId, showTemplate) {
      var url = urlJoin(invoicesUrl, invoiceId);
      return request({
        method: "GET",
        url: url,
        auth: auth,
        qs: {
          showTemplate: showTemplate,
        },
      });
    },
  };
};
