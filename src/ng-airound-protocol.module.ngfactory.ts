/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from './ng-airound-protocol.module';
import * as import2 from '@angular/core/src/di/injector';
import * as import3 from './ng-airound-protocol';
class AiroundProtocolModuleInjector extends import0.NgModuleInjector<import1.AiroundProtocolModule> {
  _AiroundProtocolModule_0:import1.AiroundProtocolModule;
  __AiroundProtocolBuilder_1:any;
  constructor(parent:import2.Injector) {
    super(parent,([] as any[]),([] as any[]));
  }
  get _AiroundProtocolBuilder_1():any {
    if ((this.__AiroundProtocolBuilder_1 == null)) { (this.__AiroundProtocolBuilder_1 = import1.AiroundProtocolFactory()); }
    return this.__AiroundProtocolBuilder_1;
  }
  createInternal():import1.AiroundProtocolModule {
    this._AiroundProtocolModule_0 = new import1.AiroundProtocolModule();
    return this._AiroundProtocolModule_0;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import1.AiroundProtocolModule)) { return this._AiroundProtocolModule_0; }
    if ((token === import3.AiroundProtocolBuilder)) { return this._AiroundProtocolBuilder_1; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const AiroundProtocolModuleNgFactory:import0.NgModuleFactory<import1.AiroundProtocolModule> = new import0.NgModuleFactory(AiroundProtocolModuleInjector,import1.AiroundProtocolModule);