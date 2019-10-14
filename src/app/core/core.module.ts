import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ErrorHandlerService } from './error-handler.service';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  imports: [SharedModule],
  declarations: [TopbarComponent],
  providers: [ErrorHandlerService]
})
export class CoreModule { }
