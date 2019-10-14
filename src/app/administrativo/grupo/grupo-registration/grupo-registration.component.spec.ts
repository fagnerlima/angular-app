import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/components/panel/panel';

import { SharedModule } from '@app/shared/shared.module';
import { GrupoRegistrationComponent } from './grupo-registration.component';
import { GrupoModule } from '../grupo.module';

describe('Grupo: GrupoRegistrationComponent', () => {
  let component: GrupoRegistrationComponent;
  let fixture: ComponentFixture<GrupoRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        PanelModule,
        GrupoModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
