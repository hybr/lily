import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordFieldGroupComponent } from './record-field-group.component';

describe('RecordFieldGroupComponent', () => {
  let component: RecordFieldGroupComponent;
  let fixture: ComponentFixture<RecordFieldGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordFieldGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordFieldGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
