import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTableRecordComponent } from './update-table-record.component';

describe('UpdateTableRecordComponent', () => {
  let component: UpdateTableRecordComponent;
  let fixture: ComponentFixture<UpdateTableRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTableRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTableRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
