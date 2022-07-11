import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonLaborerViewComponent } from './person-laborer-view.component';

describe('PersonLaborerViewComponent', () => {
  let component: PersonLaborerViewComponent;
  let fixture: ComponentFixture<PersonLaborerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonLaborerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonLaborerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
