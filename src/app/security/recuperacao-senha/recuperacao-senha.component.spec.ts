import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuarioModule } from '@app/administrativo/usuario/usuario.module';
import { SharedModule } from '@app/shared/shared.module';
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
        SharedModule,
        UsuarioModule
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
