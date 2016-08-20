"use strict";

const defaultConfig = {
    undefinedInvalid: true,
    falseInvalid: false,
    nullInvalid: false,
    emptyStringInvalid: false
}

module.exports = (config) => {
    config = Object.assign({}, defaultConfig, config);

    return (...args) => {
        if (args.length === 0) {
            throw new Error('You must pass an argument to check.');
        }

        var parameter = args[0];
        var errorMessage = args[1] || 'Parameter not valid.';

        var invalid = false;
        if (config.undefinedInvalid) { invalid = invalid || parameter === undefined };
        if (config.falseInvalid) { invalid = invalid || parameter === false };
        if (config.nullInvalid) { invalid = invalid || parameter === null };
        if (config.emptyStringInvalid) { invalid = invalid || parameter === '' };

        if (invalid) {
            throw new Error(errorMessage);
        }

        return parameter;
    };
};
