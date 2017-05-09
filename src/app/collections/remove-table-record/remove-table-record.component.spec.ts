import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTableRecordComponent } from './remove-table-record.component';

describe('RemoveTableRecordComponent', () => {
  let component: RemoveTableRecordComponent;
  let fixture: ComponentFixture<RemoveTableRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveTableRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTableRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 
