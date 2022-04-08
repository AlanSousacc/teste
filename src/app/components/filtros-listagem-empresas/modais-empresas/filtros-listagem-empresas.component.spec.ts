import { ComponentFixture, TestBed } from '@angular/core/testing';
describe('TableComponentComponent', () => {
  let component: FiltrosListagemEmpresasComponent;
  let fixture: ComponentFixture<FiltrosListagemEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosListagemEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosListagemEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
