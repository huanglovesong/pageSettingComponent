'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var gfBuriedPoint = {
    TDAPP: function (_TDAPP) {
        function TDAPP(_x3) {
            return _TDAPP.apply(this, arguments);
        }

        TDAPP.toString = function () {
            return _TDAPP.toString();
        };

        return TDAPP;
    }(function (eventId) {
        var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        try {
            if (TDAPP) {
                console.log(eventId, label, key, 222);
                TDAPP.onEvent(eventId, label, key);
            }
        } catch (error) {
            console.log(error, 11);
        }
    })
};
exports.default = gfBuriedPoint;