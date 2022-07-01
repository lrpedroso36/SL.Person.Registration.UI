import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInterviewListComponent } from './person-interview-list.component';

describe('PersonInterviewListComponent', () => {
  let component: PersonInterviewListComponent;
  let fixture: ComponentFixture<PersonInterviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonInterviewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInterviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
