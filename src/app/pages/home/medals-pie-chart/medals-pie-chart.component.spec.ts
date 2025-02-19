import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalsPieChartComponent } from './medals-pie-chart.component';

describe('MedalsPieChartComponent', () => {
  let component: MedalsPieChartComponent;
  let fixture: ComponentFixture<MedalsPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedalsPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedalsPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
