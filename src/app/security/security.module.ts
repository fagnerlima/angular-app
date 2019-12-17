import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth.service';
import { TokenInterceptor } from './shared/token-interceptor';
import { AuthGuard } from './shared/auth.guard';
import { AuthorityGuard } from './shared/authority.guard';
import { SecurityRoutingModule } from './security-routing.module';

@NgModule({
  imports: [
    SharedModule,
    SecurityRoutingModule
  ],
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
