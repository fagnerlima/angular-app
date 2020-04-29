import { NgModule, Type } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AccordionModule } from 'primeng/accordion';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { SpinnerModule } from 'primeng/spinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

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
import { ValidationComponent } from './component/validation/validation.component';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import { BlockCopyPasteDirective } from './directive/block-copy-paste.directive';
import { TagDirective } from './directive/tag.directive';
import { BytePipe } from './pipe/byte.pipe';
import { StatusPipe } from './pipe/status.pipe';
import { TimeDifferencePipe } from './pipe/time-difference.pipe';
import { BreadcrumbService } from './service/breadcrumb.service';
import { FormValidationService } from './service/form-validation.service';
import { StorageService } from './service/storage.service';
import { TitleService } from './service/title.service';

// Modules
const angularModules: Array<Type<any> | any[]> = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
  FlexLayoutModule
];
const materialModules: Array<Type<any> | any[]> = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
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
  ValidationComponent
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
const primeNgProviders: Array<Type<any> | any[]> = [];
const sharedProviders: Array<Type<any> | any[]> = [
  BreadcrumbService,
  FormValidationService,
  StorageService,
  TitleService
];

@NgModule({
  imports: [
    angularModules,
    materialModules,
    primeNgModules
  ],
  exports: [
    angularModules,
    materialModules,
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
