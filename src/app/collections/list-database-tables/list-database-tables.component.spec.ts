import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDatabaseTablesComponent } from './list-database-tables.component';

describe('ListDatabaseTablesComponent', () => {
  let component: ListDatabaseTablesComponent;
  let fixture: ComponentFixture<ListDatabaseTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDatabaseTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDatabaseTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
