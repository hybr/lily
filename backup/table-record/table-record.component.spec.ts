import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRecordComponent } from './table-record.component';

describe('TableRecordComponent', () => {
  let component: TableRecordComponent;
  let fixture: ComponentFixture<TableRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
