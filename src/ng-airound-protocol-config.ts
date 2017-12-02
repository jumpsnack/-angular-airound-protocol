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
		export let isUndefined = (obj: any) => {
			if(obj === undefined) {
				throw '[QI.Error.isUndefined]: '+ obj._name + ' => undefined';
			}
		}
	}
}
