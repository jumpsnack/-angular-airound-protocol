export var PROTO_TYPES = {
    SGU: 0x65,
    UVC: 0x67,
    SGI: 0x69,
    SGO: 0x6B,
    UPC: 0x6D,
    FPU: 0x6F,
    UDR: 0x71,
    AUV: 0x73,
    ASR: 0x75,
    ASD: 0x77,
    ASV: 0x79,
    SRG: 0x7B,
    SAS: 0x7D,
    SDD: 0x7F,
    SLV: 0x81,
    RAV: 0x83,
    RHV: 0x85,
    HAV: 0x87,
    SHR: 0x89,
    HHV: 0x9B,
    KAS: 0x9D
};
export var CONFIG = {
    eid: -1
};
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
export var QI;
(function (QI) {
    var Error;
    (function (Error) {
        Error.isUndefined = function (obj) {
            if (!obj) {
                throw '[QI.Error.isUndefined]: ' + getVariableName(function () { return obj; }) + ' => undefined';
            }
        };
    })(Error = QI.Error || (QI.Error = {}));
    var varExtractor = new RegExp("return (.*);");
    function getVariableName(name) {
        var m = varExtractor.exec(name + "");
        if (m == null)
            throw "The function does not contain a statement matching 'return variableName;'";
        return m[1];
    }
    QI.getVariableName = getVariableName;
})(QI || (QI = {}));
//# sourceMappingURL=ng-airound-protocol-config.js.map