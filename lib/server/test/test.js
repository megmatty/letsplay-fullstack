'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
// // this makes the should syntax available throughout
// // this module
var should = chai.should();

var TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/letsplay';
// const {Account} = require('../models/account');

var _require = require('../lib/server/index.js'),
    app = _require.app,
    runServer = _require.runServer,
    closeServer = _require.closeServer;

console.log('logging runserver here');
// const {TEST_DATABASE_URL} = require('../config');
var request = require('supertest');
var api = request(app);
var authUser = request.agent(app);

chai.use(chaiHttp);

// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  ata from one test does not stick
// around for next one
var tearDownDb = function tearDownDb() {
	console.warn('Deleting database');
	// return mongoose.connect.dropDatabase();
	mongoose.connection.collections['users'].drop(function (err) {
		console.log('collection dropped');
	});
};

describe('Tests', function () {
	this.timeout(15000);
	before(function () {
		return runServer(TEST_DATABASE_URL);
	});

	after(function () {
		tearDownDb();
		return closeServer();
	});

	describe('testing user authentication', function () {
		it('should create a user', function () {
			return api.post('/register').send({ email: 'email@email.com', password: 'test' }).expect(200);
		});
	});

	describe('login a user', function () {
		it('should login a user', function () {
			return api.post('/login').send({ email: 'email@email.com', password: 'test' }).expect(200);
		});
	});
});