/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/*eslint-env node */
/*eslint-env mocha*/
'use strict';

var networkId = 'test-id-test';
var adleria = require('../')(networkId, 'test-token-test', {url: 'http://localhost:2341/cms/'});

var chai = require('chai');
chai.use(require('chai-datetime'));
var expect = require('chai').expect;
var chaiThings = require('chai-things');

chai.use(chaiThings);

var BASE_URL = process.env.ADSHER_HOST + ':' + process.env.ADSHER_PORT;

describe('Customers tests', function(){
  var customer
  describe('Create', function(){
    it('Should be posible to create customer', function(){
      return adleria.customers.create().then(function(_customer){
        customer = _customer;
        expect(customer._id).to.not.be.empty;
      });
    });

    it('Should be posible to get customer', function(){
      return adleria.customers.get(customer._id).then(function(customer){
        expect(customer).to.not.be.empty;
      });
    });

    it.skip('Should be posible to edit customer', function(){
    });

    it('Should not be posible to list customers', function(){
      return adleria.customers.list().then(function(customers){
        expect(customers).to.be.array;
      });
    });
  });
});
