import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthProtectedEquipmentComponent } from './health-protected-equipment.component';

describe('HealthProtectedEquipmentComponent', () => {
  let component: HealthProtectedEquipmentComponent;
  let fixture: ComponentFixture<HealthProtectedEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthProtectedEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthProtectedEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
