import { UsuarioSerializer } from './usuario-serializer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ResponseBody } from '@app/shared/model/response-body.model';
import { CrudService } from '@app/shared/service/crud.service';
import { UsuarioListResponse } from './usuario-list-response.model';
import { UsuarioPerfilInformacoesPessoaisRequest, UsuarioPerfilSenhaRequest } from './usuario-perfil-request.model';
import { UsuarioRequest } from './usuario-request.model';
import { UsuarioResponse } from './usuario-response.model';

@Injectable()
export class UsuarioService extends CrudService<UsuarioRequest, UsuarioResponse, UsuarioListResponse> {

  private _endpointPerfilUrl = '/me';

  constructor(
    protected httpClient: HttpClient,
    protected _serializer: UsuarioSerializer
  ) {
    super(httpClient, environment.apiAuthUrl, '/usuarios', _serializer);
  }

  findPerfil(): Observable<UsuarioListResponse> {
    return this.httpClient.get<ResponseBody<UsuarioListResponse>>(this.resourceBasePerfilUrl)
      .pipe(map(response => this._serializer.fromJsonToResponseListModel(response.data)));
  }

  updatePerfilInformacoesPessoais(model: UsuarioPerfilInformacoesPessoaisRequest): Observable<UsuarioListResponse> {
    return this.httpClient.put<ResponseBody<UsuarioListResponse>>(this.resourceBasePerfilUrl, model)
      .pipe(map(response => this._serializer.fromJsonToResponseListModel(response.data)));
  }

  updatePerfilSenha(model: UsuarioPerfilSenhaRequest): Observable<UsuarioListResponse> {
    return this.httpClient.patch<ResponseBody<UsuarioListResponse>>(`${this.resourceBasePerfilUrl}/atualizar-senha`, model)
      .pipe(map(response => this._serializer.fromJsonToResponseListModel(response.data)));
  }

  recoverySenha(email: string): Observable<any> {
    return this.httpClient.patch(`${this.resourceBaseUrl}/recuperar-senha`, { email });
  }

  updateSenha(token: string, senha: string): Observable<any> {
    return this.httpClient.patch(`${this.resourceBaseUrl}/atualizar-senha`, { token, senha });
  }

  get endpointPerfilUrl(): string {
    return this._endpointPerfilUrl;
  }

  get resourceBasePerfilUrl(): string {
    return this._baseUrl + this._endpointPerfilUrl;
  }
}
