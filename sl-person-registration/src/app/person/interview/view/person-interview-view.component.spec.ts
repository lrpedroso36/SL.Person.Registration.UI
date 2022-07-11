import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInterviewViewComponent } from './person-interview-view.component';

describe('PersonInterviewViewComponent', () => {
  let component: PersonInterviewViewComponent;
  let fixture: ComponentFixture<PersonInterviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonInterviewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInterviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});