import { Component } from '@angular/core';

import { Authority } from '@app/security/shared/authority.enum';
import { CrudListing } from '@app/shared/component/crud/crud-listing/crud-listing';
import { CrudService } from '@app/shared/service/crud.service';
import { AppRoute } from '@app/shared/enum/app-route.enum';
import { GrupoListFilter } from '../shared/grupo-list-filter.model';
import { GrupoListResponse } from './../shared/grupo-list-response.model';
import { GrupoResponse } from './../shared/grupo-response.model';
import { GrupoRequest } from './../shared/grupo-request.model';
import { GrupoService } from '../shared/grupo.service';

@Component({
  selector: 'app-grupo-listing',
  templateUrl: './grupo-listing.component.html',
  providers: [
    { provide: CrudService, useClass: GrupoService }
  ]
})
export class GrupoListingComponent extends CrudListing<GrupoRequest, GrupoResponse, GrupoListResponse> {

  filter = new GrupoListFilter();

  resetFiler(): void {
    this.filter = new GrupoListFilter();
  }

  hasActions(): boolean {
    return this.hasEditarAuthority();
  }

  hasEditarAuthority(): boolean {
    return this.hasAnyAuthority(Authority.ROLE_GRUPO_EDITAR);
  }

  hasAlterarStatusAuthority(): boolean {
    return this.hasAnyAuthority(Authority.ROLE_GRUPO_ALTERAR_STATUS);
  }

  getEditarRouterLink(id: number): string | any[] {
    return [`/${AppRoute.ADMINISTRATIVO_GRUPOS}/${AppRoute.GENERICO_EDITAR}`.replace(':id', String(id))];
  }

  get title(): string {
    return 'Grupos';
  }

  protected loadAdditionalData(): Promise<void> {
    return Promise.resolve();
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Grupos', [`/${AppRoute.ADMINISTRATIVO_GRUPOS}`]);
  }
}
