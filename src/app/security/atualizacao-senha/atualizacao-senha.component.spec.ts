import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ToastService } from '@app/shared/service/toast.service';
import { SharedModule } from '@app/shared/shared.module';
import { AuthService } from '../shared/auth.service';
import { AtualizacaoSenhaComponent } from './atualizacao-senha.component';

describe('Security: AtualizacaoSenhaComponent', () => {
  let component: AtualizacaoSenhaComponent;
  let fixture: ComponentFixture<AtualizacaoSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [AtualizacaoSenhaComponent],
      providers: [
        AuthService,
        MessageService,
        ToastService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizacaoSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
