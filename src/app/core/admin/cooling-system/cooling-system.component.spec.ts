import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolingSystemComponent } from './cooling-system.component';

describe('CoolingSystemComponent', () => {
  let component: CoolingSystemComponent;
  let fixture: ComponentFixture<CoolingSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolingSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
