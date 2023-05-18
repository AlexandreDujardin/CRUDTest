import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

function generateUUID() {
  let uuid = '', i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}
const uuid = generateUUID();

describe('Users', function () {
  it('GET /users should return a success response with all users', function (done) {
    chai.request(api)
    .get('/users')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: [
          {
            idUser: '9782744005083',
            lastName: 'Neveu',
            firstName: 'Lucas',
            birthDate: '1997-02-28',
            address: '10 Passage du Havre 75009 Paris',
            phone: '0644629401',
            email:'lucas.neveu@gmail.com'
          },
          {
            idUser: '9782746035965',
            lastName: 'Cordier',
            firstName: 'Olivie-Élodie',
            birthDate: '1996-12-28',
            address: '14 Rue du Docteur Heulin 75017 Paris',
            phone: '0757130420',
            email: 'olivieelodie.cordier@gmail.com'
          }
        ]
      });
      done();
    });
  });
  it('POST /users should create the user and return a success response with the user', function (done) {
    const user = {
      idUser: uuid,
      lastName: 'Robert',
      firstName: 'Margaux',
      birthDate: '1997-04-04',
      address: '11 Rue Pierre et Marie Curie 75005 Paris',
      phone: '0144276271',
      email:'margaux.robert@gmail.com'
    };
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201);
      chai.expect(res.body).to.deep.equal({
        data: user
      });
      done();
    });
  });
  it('GET /users/:id should return a success response with found user', function (done) {
    chai.request(api)
    .get('/users/9782744005083')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          idUser: '9782744005083',
          lastName: 'Neveu',
          firstName: 'Lucas',
          birthDate: '1997-02-28',
          address: '10 Passage du Havre 75009 Paris',
          phone: '0644629401',
          email: 'lucas.neveu@gmail.com'
        }
      });
      done();
    });
  });
  it('GET /users/:id should return not found response if the user does not exists', function (done) {
    chai.request(api)
    .get('/users/'+uuid)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User '+uuid+' not found'
      });
      done();
    });
  });
  it('PUT /users/:id should return a success response with found user', function (done) {
    const user = {
      idUser: '9782744005083',
      lastName: 'Neveu',
      firstName: 'Lucas',
      birthDate: '1997-02-28',
      address: '24 Boulevard Raspail 75007 Paris',
      phone: '0644629401',
      email: 'lucas.neveu@gmail.com'
    };
    chai.request(api)
    .put('/users/9782744005083')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          idUser: '9782744005083',
          lastName: 'Neveu',
          firstName: 'Lucas',
          birthDate: '1997-02-28',
          address: '24 Boulevard Raspail 75007 Paris',
          phone: '0644629401',
          email: 'lucas.neveu@gmail.com'
        }
      });
      done();
    });
  });
  it('PUT /users/:id should return not found response if the book does not exists', function (done) {
    const user = {
      idUser: '1234567899999',
      lastName: 'Neveu',
      firstName: 'Lucas',
      birthDate: '1997-02-28',
      address: '24 Boulevard Raspail 75007 Paris',
      phone: '0644629401',
      email: 'lucas.neveu@gmail.com'
    };
    chai.request(api)
    .put('/users/1234567899999')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User 1234567899999 not found'
      });
      done();
    });
  });

  it('DELETE /users/:id should return a success response', function (done) {
    chai.request(api)
    .delete('/users/9782746035965')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        meta: {
          _deleted: {
            idUser: '9782746035965',
            lastName: 'Cordier',
            firstName: 'Olivie-Élodie',
            birthDate: '1996-12-28',
            address: '14 Rue du Docteur Heulin 75017 Paris',
            phone: '0757130420',
            email: 'olivieelodie.cordier@gmail.com'
          }
        }
      });
      done();
    });
  });
  it('DELETE /users/:id should return not found response if the user does not exists', function (done) {
    chai.request(api)
    .delete('/users/1234567899999')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User 1234567899999 not found'
      });
      done();
    });
  });
});