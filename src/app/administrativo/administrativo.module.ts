import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { GrupoModule } from './grupo/grupo.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AdministrativoComponent } from './administrativo.component';
import { AdministrativoRoutingModule } from './administrativo-routing.module';

@NgModule({
  imports: [
    SharedModule,
    GrupoModule,
    UsuarioModule,
    AdministrativoRoutingModule
  ],
  declarations: [AdministrativoComponent]
})
export class AdministrativoModule { }
