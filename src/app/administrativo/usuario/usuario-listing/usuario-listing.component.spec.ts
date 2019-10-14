import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { SecurityModule } from '@app/security/security.module';
import { UsuarioListingComponent } from './usuario-listing.component';
import { UsuarioModule } from '../usuario.module';

describe('Usuario: UsuarioListingComponent', () => {
  let component: UsuarioListingComponent;
  let fixture: ComponentFixture<UsuarioListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        UsuarioModule,
        SecurityModule,
        CoreModule,
        SharedModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
