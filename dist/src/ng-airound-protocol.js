import { Injectable } from '@angular/core';
import { isUndefined } from "util";
import { PROTO_TYPES, CONFIG, QI } from "./ng-airound-protocol-config";
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
    AiroundProtocolBuilder.prototype.SGU = function (eid, params) {
        this.CONFIG_EID = eid;
        return new PROTO_FACTORY.PROTO_SGU(params).generate();
    };
    AiroundProtocolBuilder.prototype.UVC = function (params) {
        return new PROTO_FACTORY.PROTO_UVC(params).generate();
    };
    AiroundProtocolBuilder.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AiroundProtocolBuilder.ctorParameters = function () { return []; };
    return AiroundProtocolBuilder;
}());
export { AiroundProtocolBuilder };
var PROTO_FACTORY;
(function (PROTO_FACTORY) {
    var PROTO_SGU = (function () {
        function PROTO_SGU(params) {
            this.body = new PROTO_BODY.SGU(params);
            this.header = new PROTO_HEADER({ _type_8: PROTO_TYPES.SGU, _length_16: this.body.value.length, _eid_24: CONFIG.eid });
        }
        PROTO_SGU.prototype.generate = function () {
            var header = this.header.value;
            var body = this.body.value;
            return '{' + header + ', ' + body + '}';
        };
        return PROTO_SGU;
    }());
    PROTO_FACTORY.PROTO_SGU = PROTO_SGU;
    var PROTO_UVC = (function () {
        function PROTO_UVC(params) {
            this.body = new PROTO_BODY.UVC(params);
            this.header = new PROTO_HEADER({ _type_8: PROTO_TYPES.UVC, _length_16: this.body.value.length, _eid_24: CONFIG.eid });
        }
        PROTO_UVC.prototype.generate = function () {
            var header = this.header.value;
            var body = this.body.value;
            return '{' + header + ',' + body + '}';
        };
        return PROTO_UVC;
    }());
    PROTO_FACTORY.PROTO_UVC = PROTO_UVC;
    var PROTO_BODY;
    (function (PROTO_BODY) {
        var SGU = (function () {
            function SGU(params) {
                this.MAX_SIZE_BIRTHDATE = 32;
                this.birthdate = params._birthdate_32;
                this.gender = params._gender_8;
                this.tlv = new PROTO_BODY.SGU_TLV(params._email_tlv, params._password_tlv, params._firstname_tlv, params._lastname_tlv);
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
                        ', "tlv": ' + '"' + (this.tlv.value) + '"'
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
        var UVC = (function () {
            function UVC(params) {
                this.MAX_SIZE_NR_OF_TRIES_DIFF_CODE_TRANS = 8;
                this.MAX_SIZE_VERIFY_CODE = 32;
                this.MAX_SIZE_AUTH_CODE = 160;
                this.nrofTriesDiffCodeTrans = params._nrofTriesDiffCodeTrans_8;
                this.verifyCode = params._verifyCode_32;
                this.authCode = params._authCode_160;
            }
            Object.defineProperty(UVC.prototype, "nrofTriesDiffCodeTrans", {
                get: function () {
                    if (isUndefined(this._nrofTriesDiffCodeTrans_8))
                        throw 'Empty value';
                    return this._nrofTriesDiffCodeTrans_8;
                },
                set: function (nrofTriesDiffCodeTrans) {
                    if (isUndefined(nrofTriesDiffCodeTrans) || nrofTriesDiffCodeTrans < -1)
                        throw 'Invalid input';
                    if (nrofTriesDiffCodeTrans >= Math.pow(2, this.MAX_SIZE_NR_OF_TRIES_DIFF_CODE_TRANS))
                        throw '[nrofTriesDiffCodeTrans]: ' + nrofTriesDiffCodeTrans + ' => Out of range (<' + Math.pow(2, this.MAX_SIZE_NR_OF_TRIES_DIFF_CODE_TRANS) + ')';
                    this._nrofTriesDiffCodeTrans_8 = parseInt(nrofTriesDiffCodeTrans.toString(16));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UVC.prototype, "verifyCode", {
                get: function () {
                    if (isUndefined(this._verifyCode_32))
                        throw 'Empty value';
                    return this._verifyCode_32;
                },
                set: function (verifyCode) {
                    if (isUndefined(verifyCode))
                        throw 'Invalid input';
                    if (verifyCode.length * 8 >= Math.pow(2, this.MAX_SIZE_VERIFY_CODE))
                        throw '[verifyCode]: ' + verifyCode.length * 8 + ' => Out of range (<' + Math.pow(2, this.MAX_SIZE_VERIFY_CODE) + ')';
                    this._verifyCode_32 = verifyCode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UVC.prototype, "authCode", {
                get: function () {
                    if (isUndefined(this._authCode_160))
                        throw 'Empty value';
                    return this._authCode_160;
                },
                set: function (authCode) {
                    //if(isUndefined(authCode)) throw 'Invalid input';
                    QI.Error.isUndefined(authCode);
                    if (authCode.length * 8 >= Math.pow(2, this.MAX_SIZE_AUTH_CODE))
                        throw '[authCode]: ' + authCode.length * 8 + ' => Out of range (<' + Math.pow(2, this.MAX_SIZE_AUTH_CODE) + ')';
                    this._authCode_160 = authCode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UVC.prototype, "value", {
                get: function () {
                    return '"body": {' +
                        '"nrofTriesDiffCodeTrans": ' + '' + this._nrofTriesDiffCodeTrans_8 + '' +
                        ', "verifyCoe": ' + '"' + this._verifyCode_32 + '"' +
                        ', "authCode": ' + '"' + this._authCode_160 + '"'
                        + '}';
                },
                enumerable: true,
                configurable: true
            });
            return UVC;
        }());
        PROTO_BODY.UVC = UVC;
        var SGI = (function () {
            function SGI() {
            }
            return SGI;
        }());
        PROTO_BODY.SGI = SGI;
        var SGO = (function () {
            function SGO() {
            }
            return SGO;
        }());
        PROTO_BODY.SGO = SGO;
        var UPC = (function () {
            function UPC() {
            }
            return UPC;
        }());
        PROTO_BODY.UPC = UPC;
        var FPU = (function () {
            function FPU() {
            }
            return FPU;
        }());
        PROTO_BODY.FPU = FPU;
        var UDR = (function () {
            function UDR() {
            }
            return UDR;
        }());
        PROTO_BODY.UDR = UDR;
        var AUV = (function () {
            function AUV() {
            }
            return AUV;
        }());
        PROTO_BODY.AUV = AUV;
        var ASR = (function () {
            function ASR() {
            }
            return ASR;
        }());
        PROTO_BODY.ASR = ASR;
        var ASD = (function () {
            function ASD() {
            }
            return ASD;
        }());
        PROTO_BODY.ASD = ASD;
        var ASV = (function () {
            function ASV() {
            }
            return ASV;
        }());
        PROTO_BODY.ASV = ASV;
        var SRG = (function () {
            function SRG() {
            }
            return SRG;
        }());
        PROTO_BODY.SRG = SRG;
        var SAS = (function () {
            function SAS() {
            }
            return SAS;
        }());
        PROTO_BODY.SAS = SAS;
        var SDD = (function () {
            function SDD() {
            }
            return SDD;
        }());
        PROTO_BODY.SDD = SDD;
        var SLV = (function () {
            function SLV() {
            }
            return SLV;
        }());
        PROTO_BODY.SLV = SLV;
        var RAV = (function () {
            function RAV() {
            }
            return RAV;
        }());
        PROTO_BODY.RAV = RAV;
        var RHV = (function () {
            function RHV() {
            }
            return RHV;
        }());
        PROTO_BODY.RHV = RHV;
        var HAV = (function () {
            function HAV() {
            }
            return HAV;
        }());
        PROTO_BODY.HAV = HAV;
        var SHR = (function () {
            function SHR() {
            }
            return SHR;
        }());
        PROTO_BODY.SHR = SHR;
        var HHV = (function () {
            function HHV() {
            }
            return HHV;
        }());
        PROTO_BODY.HHV = HHV;
        var KAS = (function () {
            function KAS() {
            }
            return KAS;
        }());
        PROTO_BODY.KAS = KAS;
    })(PROTO_BODY = PROTO_FACTORY.PROTO_BODY || (PROTO_FACTORY.PROTO_BODY = {}));
    var PROTO_HEADER = (function () {
        function PROTO_HEADER(params) {
            this.field1 = '"msg_type"';
            this.field2 = '"msg_length"';
            this.field3 = '"endpoint_id"';
            this.delimeter = ' : ';
            this.seperator = ', ';
            this._type_8 = -1;
            this._length_16 = -1;
            this._eid_24 = -1;
            this._type_8 = params._type_8;
            this._length_16 = params._length_16;
            this._eid_24 = params._eid_24;
        }
        Object.defineProperty(PROTO_HEADER.prototype, "value", {
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
    PROTO_FACTORY.PROTO_HEADER = PROTO_HEADER;
})(PROTO_FACTORY || (PROTO_FACTORY = {}));
//# sourceMappingURL=ng-airound-protocol.js.map