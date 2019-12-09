import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth.service';
import { TokenInterceptor } from './shared/token-interceptor';
import { AuthGuard } from './auth.guard';
import { AuthorityGuard } from './authority.guard';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard,
    AuthorityGuard
  ]
})
export class SecurityModule { }
