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

describe('Agents tests', function(){

  describe('Agents', function(){
    var ownerId = '12345';
    var agentId = null;
    it('Should be posible to create agent', function(){
      var agentData = {
        ownerId: ownerId,
        payoutInfo: {
          IBAN: 'ES33234234ES33234234',
          BIC: 'POPESUM',
          currency: 'EUR'
        },
        company: {
          name: 'My company',
          VAT: '123234234',
          email: 'agent@test.es',
          address: {
            street: 'sfsfsf',
            street2: 'sdfsfsfdsdf',
            ZIP: '29780',
            city: 'cabo',
            country: 'catalonia'
          }
        }
      };
      return adleria.agents.create(agentData).then(function(agent){
        agentId = agent._id;
        expect(agent.company.name).to.equal(agentData.company.name);
        expect(agent.company.VAT).to.equal(agentData.company.VAT);
        expect(agent.company.email).to.equal(agentData.company.email);
        expect(agent.company.address.street).to.equal(agentData.company.address.street);
        expect(agent.company.address.ZIP).to.equal(agentData.company.address.ZIP);
        expect(agent.company.address.city).to.equal(agentData.company.address.city);
        expect(agent.company.address.country).to.equal(agentData.company.address.country);
        expect(agent.payoutInfo.IBAN).to.equal(agentData.payoutInfo.IBAN);
        expect(agent.payoutInfo.BIC).to.equal(agentData.payoutInfo.BIC);
        expect(agent.payoutInfo.currency).to.equal(agentData.payoutInfo.currency);
      });
    });

    it('Should be posible to get agent', function(){
      var filter = {
        ownerId: ownerId
      }
      return adleria.agents.get(agentId, {ownerId: ownerId}).then(function(agent){
        expect(agent).to.not.be.empty;
      });
    });

    it('Should be posible to edit agent', function(){
      var agentData = {
        'company.name': 'My company edited',
        'company.VAT': '34234234',
        'company.email': 'agentedited@test.es',
        'company.address.street': 'sfaaaf',
        'company.address.street2': 'asdads',
        'company.address.ZIP': '29770',
        'company.address.city': 'caba',
        'company.address.country': 'catalonio',
        'payoutInfo.IBAN': 'ES33234ES33234234',
        'payoutInfo.BIC': 'POPESUME',
        'payoutInfo.currency': 'USD'
      };

      var filter = {
        ownerId: ownerId
      }

      return adleria.agents.edit(agentId, filter, agentData).then(function(agent){
        expect(agentData['company.name']).to.equal(agent.company.name);
        expect(agentData['company.VAT']).to.equal(agent.company.VAT);
        expect(agentData['company.email']).to.equal(agent.company.email);
        expect(agentData['company.address.street']).to.equal(agent.company.address.street);
        expect(agentData['company.address.ZIP']).to.equal(agent.company.address.ZIP);
        expect(agentData['company.address.city']).to.equal(agent.company.address.city);
        expect(agentData['company.address.country']).to.equal(agent.company.address.country);
        expect(agentData['payoutInfo.IBAN']).to.equal(agent.payoutInfo.IBAN);
        expect(agentData['payoutInfo.BIC']).to.equal(agent.payoutInfo.BIC);
        expect(agentData['payoutInfo.currency']).to.equal(agent.payoutInfo.currency);
      });
    });

    it('Should not be posible to get agent without ownerId', function(){
      return adleria.agents.get(agentId).then(function(agent){
        expect(agent).to.be.empty;
      });
    });
  });
});
