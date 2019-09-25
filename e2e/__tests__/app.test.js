const request = require('../request');

describe('connect to api', () => {
  it('it works', () => {
    return request
      .get('/hello')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('hello express');
      });
  });

  it('returns 404', () => {
    return request
      .get('/bad-path')
      .expect(404)
      .expect('Content-Type', /text/);
  });

  it('returns application/json 404', () => {
    return request
      .post('/api/bad-path')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toMatch(/not found/i);
      });
  });
});