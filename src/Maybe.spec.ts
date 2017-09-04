import { expect } from 'chai';

import { Maybe } from './Maybe';

describe('Maybe', () => {
  describe('when checking the value', () => {
    it('should return the value', () => {
      expect(Maybe.of(10).value()).to.equal(10);
    });
  });

  describe('when checking for no value', () => {
    it('should return true', () => {
      expect(Maybe.none().isNone()).to.be.true;
    });

    it('should return false', () => {
      expect(Maybe.none().hasValue()).to.be.false;
    });
  });

  describe('when checking if it has a value', () => {
    it('should return true', () => {
      expect(Maybe.of(10).hasValue()).to.be.true;
    });

    it('should return false', () => {
      expect(Maybe.of(10).isNone()).to.be.false;
    });
  });

  describe('when getting the value of a none', () => {
    it('should throw an error', () => {
      expect(() => Maybe.none().value()).to.throw(Error);
    });
  });

  describe('when binding', () => {
    it('should bind the Maybe', () => {
      expect(Maybe.of(10).bind(v => Maybe.of(5)).value()).to.equal(5);
    });  
  });

  describe('when mapping', () => {
    it('should map the value', () => {
      expect(Maybe.of(10).map(v => v + 5).value()).to.equal(15);
    });  

    describe('when mapping a none value', () => {
      it('should return a null value', () => {
        expect(Maybe.none<number>().map(v => v + 5).isNone()).to.be.true;
      });  
    });
  });

  describe('when performing a ternary', () => {
    it('should return the else value', () => {
      expect(Maybe.none().orElse(10).value()).to.equal(10);
    });  

    it('should return the first value', () => {
      expect(Maybe.of(15).orElse(10).value()).to.equal(15);
    });
  });

  describe('when getting the value oo null', () => {
    it('should return null', () => {
      expect(Maybe.none().orNull()).to.be.null;
    });  

    it('should return the value', () => {
      expect(Maybe.of(10).orNull()).to.equal(10);
    });
  });

  describe('when filtering', () => {
    it('should return the value', () => {
      expect(Maybe.of(10).filter(v => typeof v === 'number').value()).to.equal(10);
    });  

    it('should return the none', () => {
      expect(Maybe.of('test').filter(v => typeof v === 'number').isNone()).to.be.true;
      expect(Maybe.none().filter(v => typeof v === 'number').isNone()).to.be.true;
    });  
  });

  describe('when getting a none if a condition is met', () => {
    it('should return a none', () => {
      expect(Maybe.of(10).orNoneIf(true).isNone()).to.be.true;
    });    

    it('should return a value', () => {
      expect(Maybe.of(10).orNoneIf(false).value()).to.equal(10);
    });    
  });

  describe('when doing a value ternary', () => {
    it('should return the first value', () => {
      expect(Maybe.of(10).orValue(15).valueOf()).to.equal(10);
    });  

    it('should return the second value', () => {
      expect(Maybe.none().orValue(15).valueOf()).to.equal(15);
    });  
  });

  describe('when mapping multiple times', () => {
    it('should return the correct value', () => {
      const result = Maybe.of(10)
        .map(v => v + 5)
        .map(v => v - 10)
        .map(v => v + 100);

      expect(result.hasValue()).to.be.true;
      expect(result.value()).to.equal(105);
    });  

    it('should return a none', () => {
      const result = Maybe.of(10)
        .map(v => v + 5)
        .map(v => null)
        .map(v => v + 100);

      expect(result.isNone()).to.be.true;
    });
  });
});