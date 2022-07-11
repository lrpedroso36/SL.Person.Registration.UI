import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonLaborerComponent } from './person-laborer.component';

describe('PersonLaborerComponent', () => {
  let component: PersonLaborerComponent;
  let fixture: ComponentFixture<PersonLaborerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonLaborerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonLaborerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
