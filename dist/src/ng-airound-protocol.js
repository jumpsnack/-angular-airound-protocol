import { Injectable } from '@angular/core';
import { isUndefined } from "util";
import { PROTO_TYPES, CONFIG } from "./ng-airound-protocol-config";
var AiroundProtocolBuilder = (function () {
    function AiroundProtocolBuilder() {
    }
    Object.defineProperty(AiroundProtocolBuilder.prototype, "CONFIG_EID", {
        get: function () {
            return CONFIG.eid;
        },
        set: function (eid) {
            CONFIG.eid = eid;
        },
        enumerable: true,
        configurable: true
    });
    AiroundProtocolBuilder.prototype.SGU = function (user) {
        return new PROTO_FACTORY.PROTO_SGU(user.birthdate, user.gender, user.id, user.password, user.firstname, user.lastname).generate();
    };
    AiroundProtocolBuilder.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AiroundProtocolBuilder.ctorParameters = function () { return []; };
    return AiroundProtocolBuilder;
}());
export { AiroundProtocolBuilder };
String.prototype.hexBitsLength = function () {
    return (this.length * 8).toString(16);
};
String.prototype.toHex = function () {
    var result = '';
    for (var i = 0; i < this.length; i++) {
        result += this.charCodeAt(i).toString(16);
    }
    return result;
};
var PROTO_FACTORY;
(function (PROTO_FACTORY) {
    var PROTO_SGU = (function () {
        function PROTO_SGU(birthdate, gender, id, password, firstname, lastname) {
            this.body = new PROTO_BODY.SGU();
            this.body.birthdate = birthdate;
            this.body.gender = gender;
            this.body.tlv = new PROTO_BODY.SGU_TLV(id, password, firstname, lastname);
        }
        PROTO_SGU.prototype.generate = function () {
            var header = new PROTO_HEADER({ type: PROTO_TYPES.SGU, length: this.body.value.length, eid: CONFIG.eid }).header;
            var body = this.body.value;
            return '{' + header + ', ' + body + '}';
        };
        return PROTO_SGU;
    }());
    PROTO_FACTORY.PROTO_SGU = PROTO_SGU;
    var PROTO_BODY;
    (function (PROTO_BODY) {
        var SGU = (function () {
            function SGU() {
                this.MAX_SIZE_BIRTHDATE = 32;
            }
            Object.defineProperty(SGU.prototype, "birthdate", {
                get: function () {
                    if (isUndefined(this._birthdate_32))
                        throw 'Empty value';
                    return this._birthdate_32;
                },
                set: function (date) {
                    if (isUndefined(date))
                        throw 'Invalid input';
                    var splitedDate = date.split('/');
                    var sequenceDate = '';
                    var numDate = -1;
                    for (var _i = 0, splitedDate_1 = splitedDate; _i < splitedDate_1.length; _i++) {
                        var fragment = splitedDate_1[_i];
                        sequenceDate += fragment;
                    }
                    try {
                        numDate = Number(sequenceDate);
                    }
                    catch (e) {
                        throw e;
                    }
                    if (numDate < 0 || numDate > Math.pow(2, this.MAX_SIZE_BIRTHDATE)) {
                        throw new RangeError();
                    }
                    this._birthdate_32 = sequenceDate;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SGU.prototype, "gender", {
                get: function () {
                    if (isUndefined(this._gender_8))
                        throw 'Empty value';
                    return this._gender_8;
                },
                set: function (gender) {
                    if (gender.toLowerCase() === 'male') {
                        this._gender_8 = 'm';
                    }
                    else if (gender.toLowerCase() === 'female') {
                        this._gender_8 = 'f';
                    }
                    else if (gender.toLowerCase() === 'other') {
                        this._gender_8 = 'o';
                    }
                    else {
                        throw 'invalid input';
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SGU.prototype, "tlv", {
                get: function () {
                    if (isUndefined(this._tlv))
                        throw 'Empty value';
                    return this._tlv;
                },
                set: function (tlv) {
                    this._tlv = tlv;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SGU.prototype, "value", {
                get: function () {
                    return '"body": {' +
                        '"birthdate": ' + '"' + this.birthdate + '"' +
                        ', "gender": ' + '"' + this.gender + '"' +
                        ', "tlv": ' + '"' + this.tlv.value + '"'
                        + '}';
                },
                enumerable: true,
                configurable: true
            });
            return SGU;
        }());
        PROTO_BODY.SGU = SGU;
        var SGU_TLV = (function () {
            function SGU_TLV(id, password, firstname, lastname) {
                this._id_type = '01';
                this._password_type = '02';
                this._firstname_type = '03';
                this._lastname_type = '04';
                this.id = id;
                this.password = password;
                this.firstname = firstname;
                this.lastname = lastname;
            }
            Object.defineProperty(SGU_TLV.prototype, "id", {
                set: function (id) {
                    this._id_length = id.hexBitsLength();
                    this._id = id.toHex();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SGU_TLV.prototype, "password", {
                set: function (password) {
                    this._password_length = password.hexBitsLength();
                    this._password = password.toHex();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SGU_TLV.prototype, "firstname", {
                set: function (firstname) {
                    this._firstname_length = firstname.hexBitsLength();
                    this._firstname = firstname.toHex();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SGU_TLV.prototype, "lastname", {
                set: function (lastname) {
                    this._lastname_length = lastname.hexBitsLength();
                    this._lastname = lastname.toHex();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SGU_TLV.prototype, "value", {
                get: function () {
                    return this._id_type + this._id_length + this._id
                        + this._password_type + this._password_length + this._password
                        + this._firstname_type + this._firstname_length + this._firstname
                        + this._lastname_type + this._lastname_length + this._lastname;
                },
                enumerable: true,
                configurable: true
            });
            return SGU_TLV;
        }());
        PROTO_BODY.SGU_TLV = SGU_TLV;
    })(PROTO_BODY || (PROTO_BODY = {}));
    var PROTO_HEADER = (function () {
        function PROTO_HEADER(config) {
            this.field1 = '"msg_type"';
            this.field2 = '"msg_length"';
            this.field3 = '"endpoint_id"';
            this.delimeter = ' : ';
            this.seperator = ', ';
            this._type_8 = -1;
            this._length_16 = -1;
            this._eid_24 = -1;
            this._type_8 = config.type;
            this._length_16 = config.length;
            this._eid_24 = config.eid;
        }
        Object.defineProperty(PROTO_HEADER.prototype, "header", {
            get: function () {
                try {
                    if (this._type_8 * this._length_16 * this._eid_24 < 0)
                        throw new RangeError();
                    var builtHeader = '"header": {';
                    builtHeader += this.field1 + this.delimeter + this._type_8 + this.seperator;
                    builtHeader += this.field2 + this.delimeter + this._length_16 + this.seperator;
                    builtHeader += this.field3 + this.delimeter + this._eid_24;
                    builtHeader += '}';
                    return builtHeader;
                }
                catch (e) {
                    if (e instanceof RangeError) {
                        console.log('Invalid value');
                    }
                    else {
                        console.log('Unexpected error');
                    }
                    return '';
                }
            },
            enumerable: true,
            configurable: true
        });
        return PROTO_HEADER;
    }());
})(PROTO_FACTORY || (PROTO_FACTORY = {}));
//# sourceMappingURL=ng-airound-protocol.js.map