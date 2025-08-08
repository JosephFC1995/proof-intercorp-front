import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsChartQs } from './stats-chart-qs';

describe('StatsChartQs', () => {
  let component: StatsChartQs;
  let fixture: ComponentFixture<StatsChartQs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsChartQs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsChartQs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
