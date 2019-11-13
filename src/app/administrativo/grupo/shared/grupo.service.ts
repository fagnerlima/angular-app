import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ResponseBody } from '@app/shared/model/response-body.model';
import { CrudService } from '@app/shared/service/crud.service';
import { GrupoListResponse } from './grupo-list-response.model';
import { GrupoOptionResponse } from './grupo-option-response.model';
import { GrupoRequest } from './grupo-request.model';
import { GrupoResponse } from './grupo-response.model';
import { GrupoSerializer } from './grupo-serializer';

@Injectable()
export class GrupoService extends CrudService<GrupoRequest, GrupoResponse, GrupoListResponse> {

  constructor(
    protected httpClient: HttpClient,
    protected _serializer: GrupoSerializer
  ) {
    super(httpClient, environment.apiAuthUrl, '/grupos', _serializer);
  }

  findOptions(): Observable<GrupoOptionResponse[]> {
    return this.httpClient.get<ResponseBody<GrupoOptionResponse[]>>(`${this.resourceBaseUrl}/ativos`)
      .pipe(map(response => response.data.map(value => this._serializer.fromJsonToResponseOptionModel(value))));
  }
}