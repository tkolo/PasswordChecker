var PasswordContext = (function () {
    function PasswordContext() {
    }
    return PasswordContext;
})();

var PasswordChekcer = (function () {
    function PasswordChekcer() {
    }
    PasswordChekcer.contains = function (arr, value) {
        return arr.indexOf(value) !== -1;
    };

    PasswordChekcer.CheckPassword = function (password, additionalValues, context) {
        var junk = [], i, numberOfRepeats = 0, maxrepeat, additionalValue;

        if (password.length < 4) {
            return PasswordChekcer.ReturnValues.WayTooShort;
        }

        if (password.length < PasswordChekcer.minlength) {
            return PasswordChekcer.ReturnValues.TooShort;
        }

        if (!password.replace(/[ \t]/g, "").length) {
            return PasswordChekcer.ReturnValues.AllWhitespace;
        }

        for (i = 0; i < password.length; i++) {
            if (!PasswordChekcer.contains(junk, password[i])) {
                junk.push(password[i]);
            }
        }
        if (junk.length < PasswordChekcer.mindiff) {
            return PasswordChekcer.ReturnValues.TooLittleVariety;
        }

        for (i = 0; i < password.length; i++) {
            if (Math.abs((password.charCodeAt(i + 1) - (password.charCodeAt(i)))) === 1) {
                numberOfRepeats++;
            }
        }
        maxrepeat = Math.round(3 + (0.09 * password.length));
        if (numberOfRepeats > maxrepeat) {
            return PasswordChekcer.ReturnValues.TooSystematic;
        }

        if (additionalValues) {
            for (i = 0; i < additionalValues.length; i++) {
                additionalValue = additionalValues[i];
                if (password.search(additionalValue) !== -1) {
                    if (context) {
                        context.matchedValue = additionalValue;
                    }
                    return PasswordChekcer.ReturnValues.BasedOnValue;
                }
                additionalValue = additionalValue.split('').reverse().join('');
                if (password.search(additionalValue) !== -1) {
                    if (context) {
                        context.matchedValue = additionalValues[i];
                    }
                    return PasswordChekcer.ReturnValues.BasedOnReversedValue;
                }
            }
        }

        return PasswordChekcer.ReturnValues.OK;
    };
    PasswordChekcer.ReturnValues = {
        OK: 0,
        WayTooShort: 1,
        TooShort: 2,
        AllWhitespace: 3,
        TooLittleVariety: 4,
        TooSystematic: 5,
        BasedOnValue: 6,
        BasedOnReversedValue: 7
    };

    PasswordChekcer.minlength = 6;
    PasswordChekcer.mindiff = 5;
    return PasswordChekcer;
})();
//# sourceMappingURL=PasswordChecker.js.map
