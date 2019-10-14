import { NgModule, Type } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'primeng/components/accordion/accordion';
import { BreadcrumbModule } from 'primeng/components/breadcrumb/breadcrumb';
import { ButtonModule } from 'primeng/components/button/button';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CardModule } from 'primeng/components/card/card';
import { ChartModule } from 'primeng/components/chart/chart';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { GrowlModule } from 'primeng/components/growl/growl';
import { InputSwitchModule } from 'primeng/components/inputswitch/inputswitch';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { KeyFilterModule } from 'primeng/components/keyfilter/keyfilter';
import { PanelModule } from 'primeng/components/panel/panel';
import { PanelMenuModule } from 'primeng/components/panelmenu/panelmenu';
import { PasswordModule } from 'primeng/components/password/password';
import { MenuModule } from 'primeng/components/menu/menu';
import { MessageService } from 'primeng/components/common/messageservice';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { SpinnerModule } from 'primeng/components/spinner/spinner';
import { TableModule } from 'primeng/components/table/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { CheckboxComponent } from './component/form/checkbox/checkbox.component';
import { DropdownComponent } from './component/form/dropdown/dropdown.component';
import { InputSwitchComponent } from './component/form/input-switch/input-switch.component';
import { InputTextComponent } from './component/form/input-text/input-text.component';
import { MultiSelectComponent } from './component/form/multi-select/multi-select.component';
import { PageFooterComponent } from './component/page-footer/page-footer.component';
import { PageHeaderComponent } from './component/page-header/page-header.component';
import { PanelLoaderComponent } from './component/panel-loader/panel-loader.component';
import { PasswordComponent } from './component/form/password/password.component';
import { SpinnerComponent } from './component/form/spinner/spinner.component';
import { ValidationMessageComponent } from './component/validation-message/validation-message.component';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import { BlockCopyPasteDirective } from './directive/block-copy-paste.directive';
import { TagDirective } from './directive/tag.directive';
import { BytePipe } from './pipe/byte.pipe';
import { StatusPipe } from './pipe/status.pipe';
import { TimeDifferencePipe } from './pipe/time-difference.pipe';
import { BreadcrumbService } from './service/breadcrumb.service';
import { StorageService } from './service/storage.service';
import { TitleService } from './service/title.service';
import { ToastService } from './service/toast.service';

// Modules
const angularModules: Array<Type<any> | any[]> = [
  CommonModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule
];
const primeNgModules: Array<Type<any> | any[]> = [
  AccordionModule,
  BreadcrumbModule,
  ButtonModule,
  CalendarModule,
  CardModule,
  ChartModule,
  CheckboxModule,
  ConfirmDialogModule,
  DropdownModule,
  DialogModule,
  GrowlModule,
  InputSwitchModule,
  InputTextModule,
  FieldsetModule,
  KeyFilterModule,
  MenuModule,
  MultiSelectModule,
  PanelModule,
  PanelMenuModule,
  PasswordModule,
  SpinnerModule,
  TableModule,
  ToastModule,
  TooltipModule
];

// Components, Directives and Pipes
const sharedComponents: Array<Type<any> | any[]> = [
  BreadcrumbComponent,
  CheckboxComponent,
  DropdownComponent,
  InputSwitchComponent,
  InputTextComponent,
  MultiSelectComponent,
  PageHeaderComponent,
  PageFooterComponent,
  PasswordComponent,
  PanelLoaderComponent,
  SpinnerComponent,
  ValidationMessageComponent
];
const sharedDirectives: Array<Type<any> | any[]> = [
  AutoFocusDirective,
  BlockCopyPasteDirective,
  TagDirective
];
const sharedPipes: Array<Type<any> | any[]> = [
  BytePipe,
  StatusPipe,
  TimeDifferencePipe
];

// Services
const angularProviders: Array<Type<any> | any[]> = [DecimalPipe];
const primeNgProviders: Array<Type<any> | any[]> = [
  ConfirmationService,
  MessageService
];
const sharedProviders: Array<Type<any> | any[]> = [
  BreadcrumbService,
  StorageService,
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
