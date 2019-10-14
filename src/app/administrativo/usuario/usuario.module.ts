import { NgModule } from '@angular/core';

import { GrupoModule } from '@app/administrativo/grupo/grupo.module';
import { SharedModule } from '@app/shared/shared.module';
import { RecuperacaoSenhaComponent } from './recuperacao-senha/recuperacao-senha.component';
import { UsuarioRegistrationComponent } from './usuario-registration/usuario-registration.component';
import { UsuarioComponent } from './usuario.component';
import { UsuarioListingComponent } from './usuario-listing/usuario-listing.component';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioSerializer } from './shared/usuario-serializer';
import { UsuarioService } from './shared/usuario.service';

@NgModule({
  imports: [
    SharedModule,
    UsuarioRoutingModule,
    GrupoModule
  ],
  declarations: [
    RecuperacaoSenhaComponent,
    UsuarioRegistrationComponent,
    UsuarioComponent,
    UsuarioListingComponent,
    UsuarioPerfilComponent
  ],
  providers: [
    UsuarioSerializer,
    UsuarioService
  ]
})
export class UsuarioModule { }
