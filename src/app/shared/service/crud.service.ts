import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryParamsFactory } from '../factory/query-params-factory';
import { Pageable } from '../interface/pageable';
import { RequestModel } from '../interface/request-model';
import { ResponseListModel } from '../interface/response-list-model';
import { ResponseModel } from '../interface/response-model';
import { Serializer } from '../interface/serializer';
import { ListFilter } from '../model/list-filter.model';
import { ResponseBody } from '../model/response-body.model';

export abstract class CrudService<T extends RequestModel, U extends ResponseModel, L extends ResponseListModel> {

  protected queryParamsFactory = new QueryParamsFactory();

  constructor(
    protected httpClient: HttpClient,
    protected _baseUrl: string,
    protected _endpointUrl: string,
    protected _serializer: Serializer<T, U, L>
  ) { }

  list(listFilter: ListFilter): Observable<Pageable<L>> {
    const params = this.queryParamsFactory.create(listFilter);

    return this.httpClient.get<ResponseBody<Pageable<L>>>(this.resourceBaseUrl, { params })
      .pipe(map(response => response ? this.deserializePageable(response.data) : null));
  }

  find(id: number): Observable<U> {
    return this.httpClient.get<ResponseBody<U>>(`${this.resourceBaseUrl}/${id}`)
      .pipe(map(response => response ? this._serializer.fromJsonToResponseModel(response.data) : null));
  }

  save(model: T): Observable<U> {
    return this.httpClient.post<ResponseBody<U>>(this.resourceBaseUrl, model)
      .pipe(map(response => this._serializer.fromJsonToResponseModel(response.data)));
  }

  update(model: T, id: number): Observable<U> {
    return this.httpClient.put<ResponseBody<U>>(`${this.resourceBaseUrl}/${id}`, model)
      .pipe(map(response => this._serializer.fromJsonToResponseModel(response.data)));
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.resourceBaseUrl}/${id}`);
  }

  changeStatus(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.resourceBaseUrl}/${id}/ativo`, null);
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  get endpointUrl(): string {
    return this._endpointUrl;
  }

  get resourceBaseUrl(): string {
    return this._baseUrl + this._endpointUrl;
  }

  get serializer(): Serializer<T, U, L> {
    return this._serializer;
  }

  protected deserializePageable(pageable: Pageable<any>): Pageable<L> {
    pageable.content = pageable.content.map(item => this._serializer.fromJsonToResponseListModel(item));

    return pageable;
  }
}
