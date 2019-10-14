import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { GrupoRegistrationComponent } from './grupo-registration/grupo-registration.component';
import { GrupoComponent } from './grupo.component';
import { GrupoRoutingModule } from './grupo-routing.module';
import { GrupoListingComponent } from './grupo-listing/grupo-listing.component';
import { GrupoSerializer } from './shared/grupo-serializer';
import { GrupoService } from './shared/grupo.service';
import { PermissaoSerializer } from './shared/permissao-serializer';
import { PermissaoService } from './shared/permissao.service';

@NgModule({
  imports: [
    SharedModule,
    GrupoRoutingModule
  ],
  declarations: [
    GrupoComponent,
    GrupoListingComponent,
    GrupoRegistrationComponent
  ],
  providers: [
    GrupoSerializer,
    GrupoService,
    PermissaoSerializer,
    PermissaoService
  ]
})
export class GrupoModule { }
