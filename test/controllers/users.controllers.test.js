let mongoose = require('mongoose');
let User = require('../../app/models/user.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');
let supertest = require('supertest');
chai.use(chaiHttp);

describe('User Controller Tests', ()=>{
//before tests empty the database
describe('Before Each Test SetUp', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        })
    });
});

var server = supertest.agent('http://localhost:3000');

describe('/GET method testin', ()=>{
    it('it should be a successful GET', (done)=>{
        console.log('server: ', server);
        server.get('/home')
            .expect(200)
            .expect("Content-type", /json/)
            .end((err, res)=>{
                res.statusCode.should.equal(200);
                // res.body.error.should.equal(false);
                done();
            })
    })
})
})