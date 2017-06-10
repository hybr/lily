import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DbUserComponent } from './user.component';

describe('DbUserComponent', () => {
  let component: DbUserComponent;
  let fixture: ComponentFixture<DbUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
