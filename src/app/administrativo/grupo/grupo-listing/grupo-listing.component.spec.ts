import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { SecurityModule } from '@app/security/security.module';
import { GrupoListingComponent } from './grupo-listing.component';
import { GrupoModule } from '../grupo.module';

describe('Grupo: GrupoListingComponent', () => {
  let component: GrupoListingComponent;
  let fixture: ComponentFixture<GrupoListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        GrupoModule,
        SecurityModule,
        CoreModule,
        SharedModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
