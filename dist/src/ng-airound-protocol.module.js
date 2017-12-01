import { NgModule } from '@angular/core';
import { AiroundProtocolBuilder } from './ng-airound-protocol';
export function AiroundProtocolFactory() {
    return new AiroundProtocolBuilder();
}
;
export var AiroundProtocolModule = (function () {
    function AiroundProtocolModule() {
    }
    AiroundProtocolModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        {
                            provide: AiroundProtocolBuilder,
                            useFactory: AiroundProtocolFactory
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    AiroundProtocolModule.ctorParameters = function () { return []; };
    return AiroundProtocolModule;
}());
//# sourceMappingURL=ng-airound-protocol.module.js.map