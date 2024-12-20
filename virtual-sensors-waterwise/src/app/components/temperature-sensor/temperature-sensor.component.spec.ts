import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureSensorComponent } from './temperature-sensor.component';

describe('TemperatureSensorComponent', () => {
  let component: TemperatureSensorComponent;
  let fixture: ComponentFixture<TemperatureSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
