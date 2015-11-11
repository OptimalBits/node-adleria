/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/*eslint-env node */
/*eslint-env mocha*/
'use strict';

var networkId = 'test-id-test';
var adleria = require('../')(networkId, 'test-token', {url: 'http://localhost:2341/cms/'});

var chai = require('chai');
chai.use(require('chai-datetime'));
var expect = require('chai').expect;
var chaiThings = require('chai-things');

chai.use(chaiThings);

var BASE_URL = process.env.ADSHER_HOST + ':' + process.env.ADSHER_PORT;

describe('Customers tests', function(){
  var customerId = null;
  var adspaceId = null;
  describe('Customers', function(){
    it('Should be posible to create customer', function(){
      return adleria.customers.create().then(function(customer){
        customerId = customer._id;
        expect(customer._id).to.not.be.empty;
      });
    });

    it('Should be posible to get customer', function(){
      return adleria.customers.get(customerId).then(function(customer){
        expect(customer).to.not.be.empty;
      });
    });

    it('Should be posible to edit customer', function(){
      var edit = {
        'company.name': 'manuscrito'
      }
      return adleria.customers.edit(customerId, edit).then(function(customer){
        expect(customer).to.not.be.empty;
        expect(customer.company.name).to.be.eql(edit['company.name']);
      });
    });

    it('Should not be posible to list customers', function(){
      return adleria.customers.list().then(function(customers){
        expect(customers).to.be.array;
      });
    });
  });
  describe('Adspaces', function(){
    it('Should be posible to create adspace for customer', function(){
      var data = {
        name: 'Test Customer Adspace'
      }
      return adleria.customers.adspaces.create(customerId, data).then(function(adspace){
        expect(adspace.name).to.equal(data.name);
        expect(adspace.customerId).to.be.equal(customerId);
        adspaceId = adspace._id;
      });
    });
    it('Should be posible to list customer adspaces', function(){
      return adleria.customers.adspaces.list(customerId).then(function(adspaces){
        adspaces.forEach(function(adspace){
          expect(adspace.customerId).to.equal(customerId);
        });
      });
    });
    it('Should be posible to edit customer adspace', function(){
      var update = {
        name: 'edited adspace'
      };

      return adleria.customers.adspaces.edit(customerId, adspaceId, update).then(function(adspace){
        expect(adspace.name).to.equal(update.name);
        expect(adspace.customerId).to.equal(customerId);
      });
    });
    it('Should be posible to delete customer adspace', function(){
      return adleria.customers.adspaces.delete(customerId, adspaceId).then(function(res){
        expect(res);
      });
    });
    
    describe('Players', function(){
      var adspaceId;
      before(function(){
        return adleria.customers.adspaces.create(customerId, {name: 'Test Adspace'}).then(function(adspace){
          adspaceId = adspace._id;
        });
      });
      it('should be possible to create a player into an adspace', function(){
        return adleria.customers.adspaces.players.create(customerId, adspaceId, {name: 'Test Player'}).then(function(player){
          return adleria.customers.adspaces.players.list(customerId, adspaceId).then(function(players){
            expect(players).to.be.an('array');
            expect(players.length).to.be.equal(1);
            expect(players[0]).to.be.an('object');
            expect(players[0]).to.have.property('name', 'Test Player');
          });
        });
      });

      it('should be possible to assign/unassign a player to an adspace', function(){
        var playerId;
        return adleria.customers.adspaces.players.create(customerId, adspaceId, {name: 'Test Player'}).then(function(player){
          playerId = player._id;
          return adleria.customers.adspaces.players.unassign(customerId, adspaceId, playerId);
        }).then(function(){
          return adleria.customers.adspaces.players.assign(customerId, adspaceId, playerId);
        }); 
      });
    });
  });
});
