import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalDistributionBoardComponent } from './electrical-distribution-board.component';

describe('ElectricalDistributionBoardComponent', () => {
  let component: ElectricalDistributionBoardComponent;
  let fixture: ComponentFixture<ElectricalDistributionBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricalDistributionBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricalDistributionBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
