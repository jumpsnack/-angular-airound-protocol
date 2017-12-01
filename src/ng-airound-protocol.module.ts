import { NgModule } from '@angular/core';

import { AiroundProtocolBuilder } from './ng-airound-protocol';

export function AiroundProtocolFactory() {
   return new AiroundProtocolBuilder();
};

@NgModule({
   providers: [
       {
           provide: AiroundProtocolBuilder,
           useFactory:AiroundProtocolFactory
       }
   ]
})

export class AiroundProtocolModule {}