import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordFieldComponent } from './record-field.component';

describe('RecordFieldComponent', () => {
  let component: RecordFieldComponent;
  let fixture: ComponentFixture<RecordFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
