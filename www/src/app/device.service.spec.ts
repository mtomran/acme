import { TestBed } from '@angular/core/testing';
import { DeviceService } from './device.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    expect(service).toBeTruthy();
  });
});
