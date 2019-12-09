import { Component } from '@angular/core';

import { CrudListing } from '@app/shared/component/crud/crud-listing/crud-listing';
import { CrudService } from '@app/shared/service/crud.service';
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
    return this.hasAnyAuthority('GRUPO_CADASTRAR');
  }

  get title(): string {
    return 'Grupos';
  }

  protected loadAdditionalData(): Promise<void> {
    return Promise.resolve();
  }

  protected initBreadcrumb(): void {
    this.breadcrumbService.clearAndAdd('Grupos', ['/administrativo/grupos']);
  }
}
