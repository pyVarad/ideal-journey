import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DIRECTIVES } from './directives';
import { defineCustomElements } from '@pfx/core/loader';

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true
    },
  ]
})
export class AngularComponentLibrary { }
