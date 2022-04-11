import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatAdminComponent } from './stat-admin.component';

describe('StatAdminComponent', () => {
  let component: StatAdminComponent;
  let fixture: ComponentFixture<StatAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
