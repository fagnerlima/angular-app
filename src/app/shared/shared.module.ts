import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuModule } from 'primeng/components/menu/menu';
import { ToastModule } from 'primeng/toast';

import { TitleService } from './service/title.service';
import { ToastService } from './service/toast.service';

// Modules
const angularModules: Array<Type<any> | any[]> = [
  CommonModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  RouterModule
];
const primeNgModules: Array<Type<any> | any[]> = [
  MenuModule,
  ToastModule
];

// Components, Directives and Pipes
const sharedComponents: Array<Type<any> | any[]> = [];
const sharedDirectives: Array<Type<any> | any[]> = [];
const sharedPipes: Array<Type<any> | any[]> = [];

// Services
const angularProviders: Array<Type<any> | any[]> = [];
const primeNgProviders: Array<Type<any> | any[]> = [];
const sharedProviders: Array<Type<any> | any[]> = [
  TitleService,
  ToastService
];

@NgModule({
  imports: [
    angularModules,
    primeNgModules
  ],
  exports: [
    angularModules,
    primeNgModules,
    sharedComponents,
    sharedDirectives,
    sharedPipes
  ],
  declarations: [
    sharedComponents,
    sharedDirectives,
    sharedPipes
  ],
  providers: [
    angularProviders,
    primeNgProviders,
    sharedProviders
  ]
})
export class SharedModule { }
