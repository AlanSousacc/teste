import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ListempresasdctfComponent } from './listempresasdctf.component'

describe('DashboardComponent', () => {
  let component: ListempresasdctfComponent
  let fixture: ComponentFixture<ListempresasdctfComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListempresasdctfComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListempresasdctfComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
