import { ComponentFixture, TestBed } from '@angular/core/testing';
describe('TableComponentComponent', () => {
  let component: FiltrosTelaPrincipalComponent;
  let fixture: ComponentFixture<FiltrosTelaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosTelaPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosTelaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
