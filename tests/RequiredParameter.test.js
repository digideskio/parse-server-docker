const chai = require('chai');
const expect = chai.expect;
const location = '../src/RequiredParameter';

describe('RequiredParameterNoConfig', function () {
    const RequiredParameter = require(location)();

    it('should be a function', function () {
        expect(RequiredParameter).to.be.a('function');
    });

    it('should throw when no arguments are passed', function () {
        expect(RequiredParameter).to.throw('You must pass an argument to check.');
    });

    it('should throw when invalid parameter is passed', function () {
        var func = (input) => () => RequiredParameter(input);
        expect(func(undefined)).to.throw('Parameter not valid.');
        expect(func(false)).to.not.throw('Parameter not valid.');
        expect(func(null)).to.not.throw('Parameter not valid.');
        expect(func('')).to.not.throw('Parameter not valid.');
    });

    it('should throw custom error message', () => {
        var func = (input) => () => RequiredParameter(input, 'Custom Error Message');
        expect(func(undefined)).to.throw('Custom Error Message');
        expect(func(undefined)).to.not.throw('Custom Error Messages');
        expect(func(undefined)).to.not.throw('Parameter not valid.');
    });

    it('should return valid inputs back', () => {
        expect(RequiredParameter(true)).to.be.true;
        expect(RequiredParameter('Test')).to.equal('Test');
    });
});

describe('RequiredParameterUndefinedValid', function () {
    const RequiredParameter = require(location)({undefinedInvalid: false});

    it('should be a function', function () {
        expect(RequiredParameter).to.be.a('function');
    });

    it('should throw when no arguments are passed', function () {
        expect(RequiredParameter).to.throw('You must pass an argument to check.');
    });

    it('should never throw', function () {
        var func = (input) => () => RequiredParameter(input);
        expect(func(undefined)).to.not.throw('Parameter not valid.');
        expect(func(false)).to.not.throw('Parameter not valid.');
        expect(func(null)).to.not.throw('Parameter not valid.');
        expect(func('')).to.not.throw('Parameter not valid.');
    });

    it('should return valid inputs back', () => {
        expect(RequiredParameter(undefined)).to.be.undefined;
        expect(RequiredParameter(true)).to.be.true;
        expect(RequiredParameter('Test')).to.equal('Test');
    });
});

describe('RequiredParameterFalseInvalid', function () {
    const RequiredParameter = require(location)({falseInvalid: true});

    it('should be a function', function () {
        expect(RequiredParameter).to.be.a('function');
    });

    it('should throw when no arguments are passed', function () {
        expect(RequiredParameter).to.throw('You must pass an argument to check.');
    });

    it('should throw when invalid parameter is passed', function () {
        var func = (input) => () => RequiredParameter(input);
        expect(func(undefined)).to.throw('Parameter not valid.');
        expect(func(false)).to.throw('Parameter not valid.');
        expect(func(null)).to.not.throw('Parameter not valid.');
        expect(func('')).to.not.throw('Parameter not valid.');
    });

    it('should throw custom error message', () => {
        var func = (input) => () => RequiredParameter(input, 'Custom Error Message');
        expect(func(undefined)).to.throw('Custom Error Message');
        expect(func(undefined)).to.not.throw('Custom Error Messages');
        expect(func(undefined)).to.not.throw('Parameter not valid.');
    });

    it('should return valid inputs back', () => {
        expect(RequiredParameter(true)).to.be.true;
        expect(RequiredParameter('Test')).to.equal('Test');
    });
});

describe('RequiredParameterNullInvalid', function () {
    const RequiredParameter = require(location)({nullInvalid: true});

    it('should be a function', function () {
        expect(RequiredParameter).to.be.a('function');
    });

    it('should throw when no arguments are passed', function () {
        expect(RequiredParameter).to.throw('You must pass an argument to check.');
    });

    it('should throw when invalid parameter is passed', function () {
        var func = (input) => () => RequiredParameter(input);
        expect(func(undefined)).to.throw('Parameter not valid.');
        expect(func(false)).to.not.throw('Parameter not valid.');
        expect(func(null)).to.throw('Parameter not valid.');
        expect(func('')).to.not.throw('Parameter not valid.');
    });

    it('should throw custom error message', () => {
        var func = (input) => () => RequiredParameter(input, 'Custom Error Message');
        expect(func(undefined)).to.throw('Custom Error Message');
        expect(func(undefined)).to.not.throw('Custom Error Messages');
        expect(func(undefined)).to.not.throw('Parameter not valid.');
    });

    it('should return valid inputs back', () => {
        expect(RequiredParameter(true)).to.be.true;
        expect(RequiredParameter('Test')).to.equal('Test');
    });
});

describe('RequiredParameterEmptyStringInvalid', function () {
    const RequiredParameter = require(location)({emptyStringInvalid: true});

    it('should be a function', function () {
        expect(RequiredParameter).to.be.a('function');
    });

    it('should throw when no arguments are passed', function () {
        expect(RequiredParameter).to.throw('You must pass an argument to check.');
    });

    it('should throw when invalid parameter is passed', function () {
        var func = (input) => () => RequiredParameter(input);
        expect(func(undefined)).to.throw('Parameter not valid.');
        expect(func(false)).to.not.throw('Parameter not valid.');
        expect(func(null)).to.not.throw('Parameter not valid.');
        expect(func('')).to.throw('Parameter not valid.');
    });

    it('should throw custom error message', () => {
        var func = (input) => () => RequiredParameter(input, 'Custom Error Message');
        expect(func(undefined)).to.throw('Custom Error Message');
        expect(func(undefined)).to.not.throw('Custom Error Messages');
        expect(func(undefined)).to.not.throw('Parameter not valid.');
    });

    it('should return valid inputs back', () => {
        expect(RequiredParameter(true)).to.be.true;
        expect(RequiredParameter('Test')).to.equal('Test');
    });
});
