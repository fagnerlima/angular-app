import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ErrorHandlerService } from './error-handler.service';

@NgModule({
  imports: [SharedModule],
  declarations: [],
  providers: [ErrorHandlerService]
})
export class CoreModule { }
