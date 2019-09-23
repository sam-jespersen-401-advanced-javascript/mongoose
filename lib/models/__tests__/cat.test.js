const Cat = require('../cat');
const mongoose = require('mongoose');

describe('Cat model', () => {

  it('valid model all properties', () => {
    const data = {
      name: 'felix',
      appearances: {
        pattern: 'tuxedo',
        mainColor: 'black'
      },
      lives: 9,
      hasSidekick: false,
      media: ['movies', 'comics'],
      yearIntroduced: 1919,
    };

    const cat = new Cat(data);
    const errors = cat.validateSync();
    expect(errors).toBeUndefined();

    const json = cat.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const data = {};
    const cat = new Cat(data);
    // const errors = cat.validateSync().errors;
    const { errors } = cat.validateSync();
    expect(errors.name.kind).toBe('required');
    expect(errors.lives.kind).toBe('required');
    expect(errors.yearIntroduced.kind).toBe('required');
    expect(errors['appearances.mainColor'].kind).toBe('required');
  });

  it('populates default properties', () => {
    const data = {
      name: 'felix',
      appearances: {        
        mainColor: 'black'
      },
      lives: 9,
      yearIntroduced: 1919,
    };
    const cat = new Cat(data);
    // const errors = cat.validateSync().errors;
    const err = cat.validateSync();
    expect(err).toBeUndefined();

    expect(cat.hasSidekick).toBe(false);
  });

  it('enforces max of 9 lives', () => {
    const data = {
      lives: 10
    };
    const cat = new Cat(data);
    const { errors } = cat.validateSync();
    expect(errors.lives.kind).toBe('max');
  });

  it('enforces min of 0 lives', () => {
    const data = {
      lives: -10
    };
    const cat = new Cat(data);
    const { errors } = cat.validateSync();
    expect(errors.lives.kind).toBe('min');
  });

  it('enforces enum on media', () => {
    const data = {
      media: ['graffiti']
    };
    const cat = new Cat(data);
    const { errors } = cat.validateSync();
    console.log(errors);
    expect(errors['media.0'].kind).toBe('enum');
  });

});