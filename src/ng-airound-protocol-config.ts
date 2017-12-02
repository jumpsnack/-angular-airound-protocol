export const PROTO_TYPES = {
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
}

export let CONFIG = {
	eid: -1
}

declare global {
	interface String {
		hexBitsLength(): string;
		toHex(): string;
	}
}

interface Function {
	name: string;
}

interface Set{
	name: string;
}

String.prototype.hexBitsLength = function (this: string){
	return (this.length*8).toString(16);
};

String.prototype.toHex = function (this: string){
	let result = '';
	for(let i=0; i<this.length; i++){
		result += this.charCodeAt(i).toString(16);
	}

	return result;
};

export namespace QI {

	export type AiroundString = string;

	export namespace Error {
		export function isInvalidInput (name: string, obj: any) {
			if(obj instanceof String && !obj) {
				throw '[QI.Error.isInvalidInput]: '+name+'=> Invalid input';
			}
		}

		export function isEmptyValue (name: string, obj: any){
			if(!obj) {
				throw '[QI.Error.isEmptyValue]: '+name+'=> Empty value';
			}
		}

		export function isWithinRange (name: string, obj: any, maxBits: number){
			if( typeof obj === 'string'){
				if(obj.length*8 > maxBits) throw '[QI.Error.isWithinRange]: '+name+' '+obj.length*8+' => Out of range (<'+maxBits+')'
			} else if (typeof obj === 'number'){
				if(obj >= 2**maxBits) throw '[QI.Error.isWithinRange]: '+name+' '+obj+' => Out of range (<'+2**maxBits+')'
			}
		}
	}

}
