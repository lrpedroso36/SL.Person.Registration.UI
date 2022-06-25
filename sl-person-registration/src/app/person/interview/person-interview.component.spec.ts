import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInterviewComponent } from './person-interview.component';

describe('PersonInterviewComponent', () => {
  let component: PersonInterviewComponent;
  let fixture: ComponentFixture<PersonInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
