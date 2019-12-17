import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ToastService } from '@app/shared/service/toast.service';
import { SharedModule } from '@app/shared/shared.module';
import { AuthService } from '../shared/auth.service';
import { RecuperacaoSenhaComponent } from './recuperacao-senha.component';

describe('Security: RecuperacaoSenhaComponent', () => {
  let component: RecuperacaoSenhaComponent;
  let fixture: ComponentFixture<RecuperacaoSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [RecuperacaoSenhaComponent],
      providers: [
        AuthService,
        MessageService,
        ToastService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperacaoSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
