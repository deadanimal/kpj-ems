import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorAccessSystemComponent } from './door-access-system.component';

describe('DoorAccessSystemComponent', () => {
  let component: DoorAccessSystemComponent;
  let fixture: ComponentFixture<DoorAccessSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoorAccessSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorAccessSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
