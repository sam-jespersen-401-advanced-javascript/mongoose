const request = require('../request');
const db = require('../db');

describe('languages api', () => {

  beforeEach(() => {
    return db.dropCollection('languages');
  });

  const data = {
    name: 'English',
    region: {
      name: 'Global',
      countries: 67
    },
    population: 1500000000,
    isEndangered: false,
    wordOrder: ['SVO'],
  };

  function postLang(language) {
    return request
      .post('/api/languages')
      .send(language)
      .expect(200)
      .then(({ body }) => body);
  }

  it('post language', () => {
    return postLang(data)
      .then(lang => {
        expect(lang).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...data
        });
      });
  });

  it('get lang by id', () => {
    return postLang(data)
      .then(lang => {
        return request.get(`/api/languages/${lang._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(lang);
          });
      });
  });

  it('gets a list of languages', () => {
    return Promise.all([
      postLang({ name: 'Lang 1', population: 1000 }),
      postLang({ name: 'Lang 2', population: 1000 }),
      postLang({ name: 'Lang 3', population: 1000 })
    ])
      .then(() => {
        return request
          .get('/api/languages')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });

  it('updates a language', () => {
    return postLang(data)
      .then(lang => {
        lang.population = 69420;
        return request
          .put(`/api/languages/${lang._id}`)
          .send(lang)
          .expect(200);
      });
  });

  it('delete language', () => {
    return postLang(data)
      .then(lang => {
        return request
          .delete(`/api/languages/${lang._id}`);
      });
  });
});