import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBR from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AdministrativoModule } from './administrativo/administrativo.module';

registerLocaleData(ptBR);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    SecurityModule,
    AdministrativoModule,
    HomeModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-PT' }],
  bootstrap: [AppComponent]
})
export class AppModule { }