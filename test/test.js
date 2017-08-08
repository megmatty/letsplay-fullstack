const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
// // this makes the should syntax available throughout
// // this module
const should = chai.should();

//use enzyme with mocha instead of jest?
// import React from 'react';
// import { expect } from 'chai';
// import { mount, shallow } from 'enzyme';

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/letsplay';
// const {Account} = require('../models/account');
const {app, runServer, closeServer} = require('../lib/server/index.js');
console.log(runServer);
console.log('logging runserver here');
// const {TEST_DATABASE_URL} = require('../config');
const request = require('supertest');
const api = request(app);
console.log(request);
const authUser = request.agent(app);

chai.use(chaiHttp);

// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  ata from one test does not stick
// around for next one
const tearDownDb = () => {
 console.warn('Deleting database');
 // return mongoose.connect.dropDatabase();
 mongoose.connection.collections['users'].drop( function(err) {
    console.log('collection dropped');
});
}
  
describe('Tests', function() {
  	this.timeout(15000);
	before(function() {
		return runServer(TEST_DATABASE_URL); 
	});

	after(function() {
		tearDownDb();
		return closeServer();
	});

	describe('testing user authentication', () => {
		it('should create a user', () => {
			return api
				.post('/register')
				.send({email:'email@email.com', password: 'test'})
				.expect(200)
		});
	});

	describe('login a user', () => {
		it('should login a user', () => {
			return api
				.post('/login')
				.send({email: 'email@email.com', password: 'test'})
				.expect(200)
		});
	});


	// describe('<App />', () => {
	//   it('calls componentDidMount', () => {
	//     const wrapper = mount(<App />);
	//     expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
	//   });
	// });


});


