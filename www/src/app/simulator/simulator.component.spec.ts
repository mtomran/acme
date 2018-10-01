import { async, ComponentFixture, TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimulatorComponent } from './simulator.component';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSelectModule,
  MatChipsModule,
  MatIconModule } from '@angular/material';
import { DevicesComponent } from '../devices/devices.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SimulatorComponent', () => {
  let component: SimulatorComponent;
  let fixture: ComponentFixture<SimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorComponent, DevicesComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatChipsModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill input fields', () => {
    const compElm: HTMLElement = fixture.nativeElement;
    const title: HTMLInputElement = compElm.querySelector('input.device-title');
    title.value = 'sim-device';
    title.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const type = fixture.debugElement.query(By.css('mat-select.device-type .mat-select-trigger')).nativeElement;
    type.click();
    fixture.detectChanges();

    const carType: HTMLElement = fixture.debugElement.query(By.css('mat-option.device-type-car')).nativeElement;
    carType.click();
    fixture.detectChanges();
    console.log('********', component.deviceTitle, component.deviceType, component.deviceSensors);    
  });
});
