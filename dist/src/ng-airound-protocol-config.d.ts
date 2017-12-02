export declare const PROTO_TYPES: {
    SGU: number;
    UVC: number;
    SGI: number;
    SGO: number;
    UPC: number;
    FPU: number;
    UDR: number;
    AUV: number;
    ASR: number;
    ASD: number;
    ASV: number;
    SRG: number;
    SAS: number;
    SDD: number;
    SLV: number;
    RAV: number;
    RHV: number;
    HAV: number;
    SHR: number;
    HHV: number;
    KAS: number;
};
export declare let CONFIG: {
    eid: number;
};
declare global  {
    interface String {
        hexBitsLength(): string;
        toHex(): string;
    }
}
export declare namespace QI {
    type AiroundString = string;
    namespace Error {
        function isInvalidInput(name: string, obj: any): void;
        function isEmptyValue(name: string, obj: any): void;
        function isWithinRange(name: string, obj: any, maxBits: number): void;
    }
}
export {};
