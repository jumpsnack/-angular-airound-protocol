export declare class AiroundProtocolBuilder {
    static SGU(user: {
        birthdate: string;
        gender: string;
        id: string;
        password: string;
        firstname: string;
        lastname: string;
    }): string;
}
declare global  {
    interface String {
        hexBitsLength(): string;
        toHex(): string;
    }
}
export {};
