import { AfterViewInit, ChangeDetectorRef, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { timer, Subscription } from 'rxjs';

import { ConfirmationService } from 'primeng/components/common/api';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { SelectItem } from 'primeng/components/common/selectitem';
import { SortMeta } from 'primeng/components/common/sortmeta';
import { Table } from 'primeng/components/table/table';

import { AuthService } from '@app/security/shared/auth.service';
import { Pageable } from '../../../interface/pageable';
import { RequestModel } from '../../../interface/request-model';
import { ResponseListModel } from '../../../interface/response-list-model';
import { ResponseModel } from '../../../interface/response-model';
import { ListFilter } from '../../../model/list-filter.model';
import { BreadcrumbService } from '../../../service/breadcrumb.service';
import { CrudService } from '../../../service/crud.service';
import { StorageService } from '../../../service/storage.service';
import { TitleService } from '../../../service/title.service';
import { ToastService } from '../../../service/toast.service';

@Injectable()
export abstract class CrudListing<T extends RequestModel, U extends ResponseModel, L extends ResponseListModel>
  implements OnInit, AfterViewInit, OnDestroy {

  filter = new ListFilter();

  protected _autoUpdate = false;
  protected _listInitialized = false;
  protected _loading = false;
  protected _loadingDataTable = false;
  protected _loadingExpandedRow: boolean;
  protected _register: U;
  protected _registerList: L[];
  protected _rows = 0;
  protected _totalRecords = 0;
  protected autoUpdatePeriod = 10000;
  protected autoUpdateSubscripion: Subscription;

  @ViewChild('table', { static: false }) protected table: Table;

  constructor(
    protected authService: AuthService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected confirmationService: ConfirmationService,
    protected service: CrudService<T, U, L>,
    protected titleService: TitleService,
    protected toastService: ToastService,
    protected breadcrumbService: BreadcrumbService,
    protected storageService: StorageService
  ) { }

  async ngOnInit(): Promise<void> {
    this._loading = true;
    this.titleService.setTitle(this.title);
    this.initBreadcrumb();
    await this.loadAdditionalData();
    this._loading = false;
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.stopAutoUpdate();
  }

  list(page = 0): void {
    this._listInitialized = true;
    this._loadingDataTable = true;
    this.filter.page = page;

    this.service.list(this.filter).subscribe((pageable: Pageable<L[]>) => {
      if (pageable) {
        this._registerList = pageable.content;
        this._rows = pageable.size;
        this._totalRecords = pageable.totalElements;

        if (page === 0) {
          this.resetTable();
        }
      } else {
        this._registerList = [];
        this._rows = 0;
        this._totalRecords = 0;
      }

      this._loadingDataTable = false;
    }, () => (this._loadingDataTable = false));
  }

  update(): void {
    this.list(this.actualPage);
  }

  changePage(event: LazyLoadEvent): void {
    if (!this.table) {
      return;
    }

    const page = event.rows ? event.first / event.rows : 0;
    this.list(page);
  }

  changeSort(event: SortMeta[]): void {
    this.filter.sort = event.map(e => ({
      field: e.field,
      order: 1 === e.order ? 'asc' : 'desc'
    }));
  }

  resetTable(): void {
    this.table.first = 0;
  }

  find(id: number, expanded: boolean): void {
    if (expanded || (this._register && this._register.id === id)) {
      return;
    }

    this._loadingExpandedRow = true;

    this.service.find(id).subscribe(register => {
      this._register = register;
      this._loadingExpandedRow = false;
    }, () => this._loadingExpandedRow = false);
  }

  resetFilter(): void {
    this.filter = new ListFilter();
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    return this.authService.hasAnyAuthorityOrAdmin(authorities);
  }

  confirmChangeStatus(model: ResponseListModel): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja ${model.ativo ? 'desativar' : 'ativar'} o registro?`,
      accept: () => this.changeStatus(model)
    });
  }

  changeStatus(model: ResponseListModel): void {
    this.service.changeStatus(model.id).subscribe(() => {
      model.ativo = !model.ativo;
      this.toastService.addSuccess('', `Registro ${model.ativo ? 'ativado' : 'desativado'} com sucesso.`);
    });
  }

  get actualPage(): number {
    return this.table.first / this.table.rows;
  }

  get autoUpdate(): boolean {
    return this._autoUpdate;
  }

  set autoUpdate(value: boolean) {
    this._autoUpdate = value;
    this.configAutoUpdate();
  }

  get footer(): string {
    if (!this.table) {
      return null;
    }

    const rows = this.table.rows;
    const total = this.table.totalRecords;
    const first = this.table.first;
    const last = first + rows <= total ? first + rows : total;

    return `${first + 1} a ${last} de ${total} ${total > 1 ? 'registros' : 'registro'}`;
  }

  get listInitialized(): boolean {
    return this._listInitialized;
  }

  get loading(): boolean {
    return this._loading;
  }

  get loadingDataTable(): boolean {
    return this._loadingDataTable;
  }

  get loadingExpandedRow(): boolean {
    return this._loadingExpandedRow;
  }

  get register(): U {
    return this._register;
  }

  get registerList(): L[] {
    return this._registerList;
  }

  get sizeFilterOptions(): SelectItem[] {
    return [
      { label: '--', value: 1000 },
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '30', value: 30 },
      { label: '50', value: 50 },
      { label: '100', value: 100 }
    ];
  }

  get statusFilterOptions(): SelectItem[] {
    return [
      { label: '--', value: null },
      { label: 'Ativos', value: true },
      { label: 'Inativos', value: false }
    ];
  }

  get rows(): number {
    return this._rows;
  }

  get totalRecords(): number {
    return this._totalRecords;
  }

  protected configAutoUpdate(): void {
    this._autoUpdate ? this.startAutoUpdate() : this.stopAutoUpdate();
  }

  protected startAutoUpdate(): void {
    this.autoUpdateSubscripion = timer(3000, this.autoUpdatePeriod).subscribe(() => this.update());
  }

  protected stopAutoUpdate(): void {
    if (this.autoUpdateSubscripion) {
      this.autoUpdateSubscripion.unsubscribe();
    }
  }

  protected createEnumFilter(enumObject: object): SelectItem[] {
    const filter: SelectItem[] = [{ label: '--', value: '' }];
    Object.keys(enumObject).forEach(value => filter.push({ label: enumObject[value], value }));

    return filter;
  }

  abstract hasActions(): boolean;

  abstract get title(): string;

  protected abstract loadAdditionalData(): Promise<void>;

  protected abstract initBreadcrumb(): void;
}
