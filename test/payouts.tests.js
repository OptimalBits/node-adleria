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

describe('Payouts tests', function(){
  it('Should be posible to get a list with payouts', function(){
    
  });
  it('Should be posible to get a single payout', function(){
    
  });
  it('Should be posible to get a single payout with template', function(){
    
  });
});
