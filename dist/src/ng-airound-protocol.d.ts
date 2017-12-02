export declare class AiroundProtocolBuilder {
    CONFIG_EID: number;
    SGU(eid: number, params: PROTO_PARAMS.SGU): string;
    UVC(params: PROTO_PARAMS.UVC): string;
}
export declare namespace PROTO_PARAMS {
    interface HEADER {
        _type_8: number;
        _length_16: number;
        _eid_24: number;
    }
    interface SGU {
        _birthdate_32: string;
        _gender_8: string;
        _email_tlv: string;
        _password_tlv: string;
        _firstname_tlv: string;
        _lastname_tlv: string;
    }
    interface UVC {
        _nrofTriesDiffCodeTrans_8: number;
        _verifyCode_32: string;
        _authCode_160: string;
    }
}
