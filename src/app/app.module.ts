import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ptBR from '@angular/common/locales/pt';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared.module';
import { ToastService } from './shared/service/toast.service';

registerLocaleData(ptBR);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    SecurityModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    ConfirmationService,
    MessageService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
