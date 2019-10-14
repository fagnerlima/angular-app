import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { GrupoModule } from '@app/administrativo/grupo/grupo.module';
import { SharedModule } from '@app/shared/shared.module';
import { UsuarioRegistrationComponent } from './usuario-registration.component';
import { UsuarioModule } from '../usuario.module';

describe('Usuario: UsuarioRegistrationComponent', () => {
  let component: UsuarioRegistrationComponent;
  let fixture: ComponentFixture<UsuarioRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        UsuarioModule,
        SharedModule,
        GrupoModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
