/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/*eslint-env node */
/*eslint-env mocha*/
'use strict';

var networkId = 'text-network-id';
var adleria 
  = require('../')(networkId, 'test-x-test', {url: 'http://localhost:2341/cms/'});

var chai = require('chai');
chai.use(require('chai-datetime'));
var expect = require('chai').expect;
var chaiThings = require('chai-things');

chai.use(chaiThings);

var BASE_URL = process.env.ADSHER_HOST + ':' + process.env.ADSHER_PORT;

describe('Adleria API', function(){

  describe('Adspaces', function(){
    var adspaceId = null;
    var ownerId = '12345';
    it('should be posible to create adspace', function(){
      var data = {
        name: 'Test Adspace',
        ownerId: ownerId
      }
      return adleria.adspaces.create(data).then(function(adspace){
        expect(adspace.name).to.equal(data.name);
        expect(adspace.ownerId).to.be.equal(data.ownerId);
        adspaceId = adspace._id;
      });
    });
    it('should be posible to list adspaces', function(){
      var filter = {
        ownerId: ownerId
      }
      return adleria.adspaces.list(filter).then(function(adspaces){
        adspaces.forEach(function(adspace){
          expect(adspace.ownerId).to.equal(ownerId);
        });
      });
    });
    it('should be posible to edit adspace', function(){
      var update = {
        name: 'edited adspace',
        ownerId: ownerId
      };

      return adleria.adspaces.edit(adspaceId, update).then(function(adspace){
        expect(adspace.name).to.equal(update.name);
        expect(adspace.ownerId).to.equal(ownerId);
      })
    });
    it('should be posible to delete adspace', function(){
      return adleria.adspaces.delete(adspaceId, {ownerId: ownerId}).then(function(res){
        expect(res);
      });
    });
    describe('Players', function(){
      var adspaceId;

      before(function(){
        return adleria.adspaces.create({name: 'Test Adspace'}).then(function(adspace){
          adspaceId = adspace._id;
        });
      });
      it('should be possible to create a player into an adspace', function(){
        return adleria.adspaces(adspaceId).players.create({name: 'Test Player'}).then(function(player){
          return adleria.adspaces(adspaceId).players.list().then(function(players){
            expect(players).to.be.an('array');
            expect(players.length).to.be.equal(1);
            expect(players[0]).to.be.an('object');
            expect(players[0]).to.have.property('name', 'Test Player');
          });
        });
      });

      it('should be possible to assign/unassign a player to an adspace', function(){
        var playerId;
        return adleria.adspaces(adspaceId).players.create({name: 'Test Player'}).then(function(player){
          playerId = player._id;
          return adleria.adspaces(adspaceId).players.unassign(playerId);
        }).then(function(){
          return adleria.adspaces(adspaceId).players.assign(playerId);
        }); 
      });

      it('should be possible to assign many players to an adspace', function(){
        //return adleria.adspaces(adspaceId).players.create({name: 'Test Player'});
      });
    });
  });
});
