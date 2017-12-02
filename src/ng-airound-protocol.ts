import {Inject, Injectable} from '@angular/core';
import { isUndefined } from "util";
import { PROTO_TYPES, CONFIG, QI } from "./ng-airound-protocol-config";

@Injectable()
export class AiroundProtocolBuilder {
	public set CONFIG_EID(eid: number){
		CONFIG.eid = eid;
	}

	public get CONFIG_EID(){
		return CONFIG.eid;
	}

	public SGU(eid: number, params: PROTO_PARAMS.SGU){
		this.CONFIG_EID = eid;
		return new PROTO_FACTORY.PROTO_SGU(params).generate();
	}

	public UVC(params: PROTO_PARAMS.UVC){
		return new PROTO_FACTORY.PROTO_UVC(params).generate();
	}
}


export namespace PROTO_PARAMS {
	export interface HEADER {
		_type_8: number;
		_length_16: number;
		_eid_24: number;
	}

	export interface SGU {
		_birthdate_32: string;
		_gender_8: string;
		_email_tlv: string;
		_password_tlv: string;
		_firstname_tlv: string;
		_lastname_tlv: string;
	}

	export interface UVC {
		_nrofTriesDiffCodeTrans_8: number;
		_verifyCode_32: string;
		_authCode_160: string;
	}
}

namespace PROTO_FACTORY {

	interface I_PROTO {
		body: any;
		generate(): string;
	}

	export class PROTO_SGU implements I_PROTO{
		body: PROTO_BODY.SGU;
		header: PROTO_HEADER;

		constructor(params: PROTO_PARAMS.SGU){
			this.body = new PROTO_BODY.SGU(params);
			this.header = new PROTO_HEADER({_type_8: PROTO_TYPES.SGU, _length_16: this.body.value.length, _eid_24: CONFIG.eid});
		}

		generate(): string{
			let header = this.header.value;
			let body = this.body.value;

			return '{'+header+', '+body+'}'
		}
	}

	export class PROTO_UVC implements I_PROTO{
		header: PROTO_HEADER;
		body: PROTO_BODY.UVC;

		constructor(params: PROTO_PARAMS.UVC){
			this.body = new PROTO_BODY.UVC(params);
			this.header = new PROTO_HEADER({_type_8: PROTO_TYPES.UVC, _length_16: this.body.value.length, _eid_24: CONFIG.eid});
		}

		generate (): string {
			let header = this.header.value;
			let body = this.body.value;

			return '{'+header+','+body+'}';
		}
	}

	export namespace PROTO_BODY {

		export class SGU {
			readonly MAX_SIZE_BIRTHDATE = 32;

			private _birthdate_32: string;
			private _gender_8: string;
			private _tlv: SGU_TLV;

			constructor(params: PROTO_PARAMS.SGU){
				this.birthdate = params._birthdate_32;
				this.gender = params._gender_8;
				this.tlv = new PROTO_BODY.SGU_TLV(params._email_tlv, params._password_tlv, params._firstname_tlv, params._lastname_tlv);
			}

			set birthdate (date: string) {

				// if(isUndefined( date )) throw 'Invalid input';
				QI.Error.isInvalidInput('set birthdate', date);

				let splitedDate = date.split( '/' );
				let sequenceDate = '';
				let numDate = -1;

				for( let fragment of splitedDate ) {
					sequenceDate += fragment;
				}

				try {
					numDate = Number( sequenceDate );
				} catch(e) {
					throw e;
				}

				if(numDate < 0 || numDate > 2 ** this.MAX_SIZE_BIRTHDATE) {
					throw new RangeError();
				}
				this._birthdate_32 = sequenceDate;
			}

			get birthdate () {
				// if(isUndefined( this._birthdate_32 )) throw 'Empty value';
				QI.Error.isEmptyValue('get birthdate', this._birthdate_32)
				return this._birthdate_32;
			}

			set gender (gender: string) {
				if(gender.toLowerCase() === 'male') {
					this._gender_8 = 'm';
				} else if(gender.toLowerCase() === 'female') {
					this._gender_8 = 'f';
				} else if(gender.toLowerCase() === 'other') {
					this._gender_8 = 'o';
				} else {
					throw 'invalid input'
				}
			}

			get gender () {
				// if(isUndefined( this._gender_8 )) throw 'Empty value';
				QI.Error.isEmptyValue('get gender', this._gender_8);
				return this._gender_8;
			}

			set tlv (tlv: SGU_TLV) {
				this._tlv = tlv;
			}

			get tlv () {
				// if(isUndefined( this._tlv )) throw 'Empty value';
				QI.Error.isEmptyValue('get tlv', this._tlv);
				return this._tlv;
			}

			get value () {
				return '"body": {' +
					'"birthdate": ' + '"'+this.birthdate +'"'+
					', "gender": ' + '"' + this.gender + '"' +
					', "tlv": ' + '"'+(this.tlv.value) +'"'
					+ '}';
			}
		}

		export class SGU_TLV {
			private readonly _id_type: string = '01';
			private _id: QI.AiroundString;
			private _id_length: string;

			private readonly _password_type: string = '02';
			private _password: QI.AiroundString;
			private _password_length: string;

			private readonly _firstname_type: string = '03';
			private _firstname: QI.AiroundString;
			private _firstname_length: string;

			private readonly _lastname_type: string = '04';
			private _lastname: QI.AiroundString;
			private _lastname_length: string;

			constructor (id: QI.AiroundString, password: QI.AiroundString, firstname: QI.AiroundString, lastname: QI.AiroundString) {
				this.id = id;
				this.password = password;
				this.firstname = firstname;
				this.lastname = lastname;
			}

			set id (id: QI.AiroundString) {
				this._id_length = id.hexBitsLength();
				this._id = id.toHex();
			}

			set password (password: QI.AiroundString) {
				this._password_length = password.hexBitsLength();
				this._password = password.toHex();
			}

			set firstname (firstname: QI.AiroundString) {
				this._firstname_length = firstname.hexBitsLength();
				this._firstname = firstname.toHex();
			}

			set lastname (lastname: QI.AiroundString) {
				this._lastname_length = lastname.hexBitsLength();
				this._lastname = lastname.toHex();
			}

			get value () {
				return this._id_type + this._id_length + this._id
					+ this._password_type + this._password_length + this._password
					+ this._firstname_type + this._firstname_length + this._firstname
					+ this._lastname_type + this._lastname_length + this._lastname;
			}
		}

		export class UVC {
			private MAX_SIZE_NR_OF_TRIES_DIFF_CODE_TRANS = 8;
			private MAX_SIZE_VERIFY_CODE = 32;
			private MAX_SIZE_AUTH_CODE = 160;

			private _nrofTriesDiffCodeTrans_8: number;
			private _verifyCode_32: string;
			private _authCode_160: string;

			constructor(params: PROTO_PARAMS.UVC){
				this.nrofTriesDiffCodeTrans = params._nrofTriesDiffCodeTrans_8;
				this.verifyCode = params._verifyCode_32;
				this.authCode = params._authCode_160;
			}

			set nrofTriesDiffCodeTrans (nrofTriesDiffCodeTrans: number){
				if(isUndefined(nrofTriesDiffCodeTrans) || nrofTriesDiffCodeTrans < -1) throw 'Invalid input'

				// if(nrofTriesDiffCodeTrans >= 2**this.MAX_SIZE_NR_OF_TRIES_DIFF_CODE_TRANS) throw '[nrofTriesDiffCodeTrans]: '+nrofTriesDiffCodeTrans+' => Out of range (<'+2**this.MAX_SIZE_NR_OF_TRIES_DIFF_CODE_TRANS+')'
				QI.Error.isWithinRange('set nrofTriesDiffCodeTrans', nrofTriesDiffCodeTrans, this.MAX_SIZE_NR_OF_TRIES_DIFF_CODE_TRANS);

				this._nrofTriesDiffCodeTrans_8 = parseInt(nrofTriesDiffCodeTrans.toString(16));
			}

			get nrofTriesDiffCodeTrans (){
				// if(isUndefined(this._nrofTriesDiffCodeTrans_8)) throw 'Empty value'
				QI.Error.isEmptyValue('get nrofTriesDiffCodeTrans', this._nrofTriesDiffCodeTrans_8);
				return this._nrofTriesDiffCodeTrans_8;
			}

			set verifyCode (verifyCode: string){
				// if(isUndefined(verifyCode)) throw 'Invalid input'
				QI.Error.isInvalidInput('set verifyCode', verifyCode);

				// if(verifyCode.length*8 >= 2 ** this.MAX_SIZE_VERIFY_CODE) throw '[verifyCode]: '+verifyCode.length*8+' => Out of range (<'+2**this.MAX_SIZE_VERIFY_CODE+')'
				QI.Error.isWithinRange('set verifyCode', verifyCode, this.MAX_SIZE_VERIFY_CODE);

				this._verifyCode_32 = verifyCode;
			}

			get verifyCode (){
				// if(isUndefined(this._verifyCode_32)) throw 'Empty value';
				QI.Error.isEmptyValue('get verifyCode', this._verifyCode_32);

				return this._verifyCode_32;
			}

			set authCode (authCode: string){
				//if(isUndefined(authCode)) throw 'Invalid input';
				QI.Error.isInvalidInput('set authCode', authCode);

				// if(authCode.length*8 >= 2**this.MAX_SIZE_AUTH_CODE) throw '[authCode]: '+authCode.length*8+' => Out of range (<'+2**this.MAX_SIZE_AUTH_CODE+')'
				QI.Error.isWithinRange('set authCode', authCode,this.MAX_SIZE_AUTH_CODE);

				this._authCode_160 = authCode;
			}

			get authCode() {
				// if(isUndefined(this._authCode_160)) throw 'Empty value';
				QI.Error.isEmptyValue('get authCode', this._authCode_160);

				return this._authCode_160;
			}

			get value () {
				return '"body": {' +
					'"nrofTriesDiffCodeTrans": ' + ''+this._nrofTriesDiffCodeTrans_8 +''+
					', "verifyCoe": ' + '"' + this._verifyCode_32 + '"' +
					', "authCode": ' + '"'+ this._authCode_160 +'"'
					+ '}'
			}
		}

		export class SGI {}
		export class SGO {}
		export class UPC {}
		export class FPU {}
		export class UDR {}
		export class AUV {}
		export class ASR {}
		export class ASD {}
		export class ASV {}
		export class SRG {}
		export class SAS {}
		export class SDD {}
		export class SLV {}
		export class RAV {}
		export class RHV {}
		export class HAV {}
		export class SHR {}
		export class HHV {}
		export class KAS {}
	}

	export class PROTO_HEADER {
		field1 = '"msg_type"';
		field2 = '"msg_length"';
		field3 = '"endpoint_id"';

		delimeter = ' : ';
		seperator = ', ';

		private _type_8: number = -1;
		private _length_16: number = -1;
		private _eid_24: number = -1;

		constructor (params: PROTO_PARAMS.HEADER) {
			this._type_8 = params._type_8;
			this._length_16 = params._length_16;
			this._eid_24 = params._eid_24;
		}

		get value () {
			try {
				if(this._type_8 * this._length_16 * this._eid_24 < 0) throw new RangeError();

				let builtHeader = '"header": {';
				builtHeader += this.field1 + this.delimeter + this._type_8 + this.seperator;
				builtHeader += this.field2 + this.delimeter + this._length_16 + this.seperator;
				builtHeader += this.field3 + this.delimeter + this._eid_24;
				builtHeader += '}';

				return builtHeader

			} catch(e) {
				if(e instanceof RangeError) {
					console.log( 'Invalid value' );
				} else {
					console.log( 'Unexpected error' );
				}
				return '';
			}
		}
	}
}
  