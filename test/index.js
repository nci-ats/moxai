/*

 _ _   _      _  o 
) ) ) (_) \) (_( ( 
          (\       

*/

//*******************************************************************

'use strict';

//*******************************************************************

var express = require('express');
var moxai = require(__dirname + '/../');
var request = require('supertest');

//*******************************************************************

describe('moxai tests', function () {
	
	var app;

	beforeEach(function () {
		app = express();
		
		app.use('/mocks', moxai());
		
		app.use('/rand', moxai({'random': true}));
		
		app.use('/bad/dir', moxai({'dir':'bad'}));
		app.use('/bad/file', moxai({'file':'bad'}));
		app.use('/bad/invalid', moxai({'dir':'../test/mocks', 'file':'invalid'}));
	});

	it('returns mock data from GET request', function (done) {
		request(app)
            .get('/mocks/test/')
            .expect(200, done);
	});
	
	it('returns mock data from POST request', function (done) {
		request(app)
            .post('/mocks/test/')
            .expect(200, done);
	});
	
	it('returns mock data from GET request with parameter', function (done) {
		request(app)
            .get('/mocks/test/hello/')
            .expect(200, done);
	});
	
	it('returns mock data from GET request with random data', function (done) {
		request(app)
            .get('/rand/random/')
            .expect(200, done);
	});
	
	it('returns 404 if endpoint path not found', function (done) {
		request(app)
            .get('/mocks/bad/')
            .expect(404, done);
	});
	
	it('returns 405 if endpoint method invalid', function (done) {
		request(app)
            .put('/mocks/test/')
            .expect(405, done);
	});
	
	it('returns 500 if endpoint responses invalid', function (done) {
		request(app)
            .get('/mocks/invalid/responses/')
            .expect(500, done);
	});
	
	it('returns 500 if endpoint success invalid', function (done) {
		request(app)
            .get('/mocks/invalid/200/')
            .expect(500, done);
	});
	
	it('returns 500 if endpoint examples invalid', function (done) {
		request(app)
            .get('/mocks/invalid/examples/')
            .expect(500, done);
	});
	
	it('returns 500 if endpoint json invalid', function (done) {
		request(app)
            .get('/mocks/invalid/json/')
            .expect(500, done);
	});
	
	it('returns 500 if directory invalid', function (done) {
		request(app)
            .get('/bad/dir/')
            .expect(500, done);
	});
	
	it('returns 500 if file invalid', function (done) {
		request(app)
            .get('/bad/file/')
            .expect(500, done);
	});
	
	it('returns 500 if empty JSON found', function (done) {
		request(app)
            .get('/bad/invalid/')
            .expect(500, done);
	});

});
