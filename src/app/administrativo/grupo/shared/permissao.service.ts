import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ResponseBody } from '@app/shared/model/response-body.model';
import { PermissaoOptionResponse } from './permissao-option-response.model';
import { PermissaoSerializer } from './permissao-serializer';

@Injectable()
export class PermissaoService {

  constructor(
    private httpClient: HttpClient,
    private serializer: PermissaoSerializer
  ) { }

  findOptions(): Observable<PermissaoOptionResponse[]> {
    return this.httpClient.get<ResponseBody<PermissaoOptionResponse[]>>(`${this.resourceBaseUrl}/ativos`)
      .pipe(map(response => response.data.map(value => this.serializer.fromJsonToResponseOptionModel(value))));
  }

  get baseUrl(): string {
    return environment.apiAuthUrl;
  }

  get endpointUrl(): string {
    return '/permissoes';
  }

  get resourceBaseUrl(): string {
    return this.baseUrl + this.endpointUrl;
  }
}
