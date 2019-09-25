const connect = require('../lib/connect');
const TEST_DB_URL = 'mongodb://localhost:27017/languages';
const mongoose = require('mongoose');

beforeAll(() => {
  return connect(TEST_DB_URL, { log: false });
});

afterAll(() => {
  return mongoose.connection.close();
});
