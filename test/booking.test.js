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

describe('Bookings', function () {
  it('GET /bookings should return a success response with all bookings', function (done) {
    chai.request(api)
    .get('/bookings')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: [
            {
              id: '9782744005085',
              rentDate: '2023-02-28',
              returnDate: '2023-03-15',
              book: '9782744005084',
              user: '9782744005083'
            },
            {
              id: '9782746035967',
              rentDate: '2022-12-28',
              returnDate: '2023-01-15',
              book: '9782746035966',
              user: '9782746035965'
            }
          ]
      });
      done();
    });
  });
  it('POST /bookings should create the booking and return a success response with the booking', function (done) {
    const booking = {
      id: uuid,
      rentDate: '2023-05-02',
      returnDate: '2023-05-15',
      book: '9782746035966',
      user: '9782746035965'
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201);
      chai.expect(res.body).to.deep.equal({
        data: booking
      });
      done();
    });
  });
  it('GET /bookings/:id should return a success response with found booking', function (done) {
    chai.request(api)
    .get('/bookings/9782746035967')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          id: '9782746035967',
          rentDate: '2022-12-28',
          returnDate: '2023-01-15',
          book: '9782746035966',
          user: '9782746035965'
        }
      });
      done();
    });
  });
  it('GET /bookings/:id should return not found response if the booking does not exists', function (done) {
    chai.request(api)
    .get('/bookings/'+uuid)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'Booking '+uuid+' not found'
      });
      done();
    });
  });
});