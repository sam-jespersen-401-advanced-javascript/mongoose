const Language = require('../language');

describe('Language model', () => {

  it('valid model with all properties', () => {
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

    const language = new Language(data);
    const errors = language.validateSync();
    expect(errors).toBeUndefined();

    const json = language.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates requires properties', () => {
    const data = {};
    const language = new Language(data);
    const { errors } = language.validateSync();
    expect(errors.name.kind).toBe('required');
    expect(errors.population.kind).toBe('required');
  });

  it('populates default properties', () => {
    const data = {
      name: 'English',
      region: {
        name: 'Global',
        countries: 67
      },
      population: 1500000000,
      wordOrder: ['SVO'],
    };

    const language = new Language(data);
    const err = language.validateSync();
    expect(err).toBeUndefined();
    expect(language.isEndangered).toBe(false);
  });

  it('enforces max population', () => {
    const data = { population: 100000000000 };
    const lang = new Language(data);
    const { errors } = lang.validateSync();
    expect(errors.population.kind).toBe('max');
  });

  it('enforces min population', () => {
    const data = { population: 0 };
    const lang = new Language(data);
    const { errors } = lang.validateSync();
    expect(errors.population.kind).toBe('min');
  });

  it('enforces enum on word order', () => {
    const data = {
      wordOrder: ['LOL']
    };
    const lang = new Language(data);
    const { errors } = lang.validateSync();
    expect(errors['wordOrder.0'].kind).toBe('enum');
  });
});