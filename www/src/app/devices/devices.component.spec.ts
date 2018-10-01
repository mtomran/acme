import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DevicesComponent } from './devices.component';
import { MatTableModule, MatChipsModule } from '@angular/material';
import { DeviceService } from '../device.service';
import { DeviceMap } from '../device';

class MockDeviceService {
  devices: DeviceMap = {
    'a43243b43243c434': {
      id: 'a43243b43243c434',
      title: 'test-device1',
      type: 'car',
      sensors: {fuel: '90', engine: 'ON'}
    },
    'a43243b43243c435': {
      id: 'a43243b43243c435',
      title: 'test-device2',
      type: 'car',
      sensors: {fuel: '80', engine: 'OFF'}
    }
  };

  get Devices(): DeviceMap {
    return this.devices;
  }
}
describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;
  let deviceService: DeviceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: DeviceService, useClass: MockDeviceService}],
      declarations: [ DevicesComponent ],
      imports: [ HttpClientTestingModule, MatTableModule, MatChipsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    deviceService = TestBed.get(DeviceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should device table column names array', () => {
    expect(component.displayedColumns).toEqual(['id', 'title', 'type', 'sensors']);
  });

  it('should return array of devices', () => {
    expect(component.DevicesArray.length).toEqual(2);
    expect(component.DevicesArray[0].id).toEqual('a43243b43243c434');
    expect(component.DevicesArray[1].id).toEqual('a43243b43243c435');
  });

  it('should show Devices heading element', () => {
    const compElm: HTMLElement = fixture.nativeElement;
    const heading = compElm.querySelector('h2');
    expect(heading.textContent).toEqual(component.heading);
  });

  it('should display table column headers', () => {
    const compElm: HTMLElement = fixture.nativeElement;
    const id = compElm.querySelector('.mat-column-id');
    expect(id.textContent).toContain('ID');

    const title = compElm.querySelector('.mat-column-title');
    expect(title.textContent).toContain('Title');

    const type = compElm.querySelector('.mat-column-type');
    expect(type.textContent).toContain('Type');

    const sensors = compElm.querySelector('.mat-column-sensors');
    expect(sensors.textContent).toContain('Sensors');
  });

  it('should display two rows of device info', () => {
    const compElm: HTMLElement = fixture.nativeElement;
    const rows = compElm.querySelectorAll('tr td.mat-column-id');
    expect(rows.length).toEqual(2);
    expect(rows[0].textContent).toContain(component.DevicesArray[0].id);
    const sensors = compElm.querySelectorAll('tr td.mat-column-sensors mat-chip');
    expect(sensors.length).toEqual(4);
    expect(sensors[0].textContent).toContain('engine:');
    expect(sensors[0].textContent).toContain('ON');
    expect(sensors[1].textContent).toContain('fuel:');
    expect(sensors[1].textContent).toContain('90');

    expect(rows[1].textContent).toContain(component.DevicesArray[1].id);
    expect(sensors[2].textContent).toContain('engine:');
    expect(sensors[2].textContent).toContain('OFF');
    expect(sensors[3].textContent).toContain('fuel:');
    expect(sensors[3].textContent).toContain('80');
  });

  it('should update device title', () => {
    const compElm: HTMLElement = fixture.nativeElement;
    deviceService.Devices['a43243b43243c434'].title = 'device-test';
    fixture.detectChanges();
    const titles = compElm.querySelectorAll('tr td.mat-column-title');
    expect(titles[0].textContent).toContain('device-test');
  });
});
