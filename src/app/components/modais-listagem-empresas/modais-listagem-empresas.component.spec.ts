import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaisEmpresaComponent } from './modais-listagem-empresas.component';

describe('TableComponentComponent', () => {
  let component: ModaisEmpresaComponent;
  let fixture: ComponentFixture<ModaisEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaisEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaisEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
