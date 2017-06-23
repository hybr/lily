import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTableRecordComponent } from './create-table-record.component';

describe('CreateTableRecordComponent', () => {
  let component: CreateTableRecordComponent;
  let fixture: ComponentFixture<CreateTableRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTableRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTableRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
