import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativoComponent } from './administrativo.component';

describe('Administrativo: AdministrativoComponent', () => {
  let component: AdministrativoComponent;
  let fixture: ComponentFixture<AdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrativoComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
