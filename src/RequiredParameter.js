"use strict";

module.exports = function () {
    var parameter = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var errorMessage = arguments[1];

    if (!parameter) {
        throw errorMessage;
    }

    return parameter;
};