import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Device, DeviceMap, DeviceResponse, DeviceGetResponse } from './device';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {
  constructor(private http: HttpClient, private socketService: SocketService) {
    // gets initial list of devices
    this.loadDevices();

    // initialize sockets to update device list upon events
    this.initSockets();
  }

  private deviceUrl = 'server/device';

  // stores the device map using id as key
  // device information is stored in an object map for quicker reference
  private devicesById: DeviceMap = {};

  // returns the device map
  get Devices(): DeviceMap {
    return this.devicesById;
  }

  private handleError(error: string, data) {
    console.error('Error:' + error + ':' + data + ' Please try again later..');
  }

  /**
   * loads the list of devices using http call
   */
  loadDevices() {
    this.loadDevicesHttp()
    .subscribe(devices => {
      for (const device of devices) {
        this.devicesById[device.id] = device;
      }
      console.log('Device get successful. Data:', this.devicesById);
    });
  }

  /**
   * http call to get the device list
   */
  loadDevicesHttp(): Observable<Device[]> {
    return this.http.get<DeviceGetResponse>(this.deviceUrl)
    .pipe(map(res => {
      return res.response.map(item => {
        const device: Device = {
          id: item.id,
          title: item.title,
          type: item.type,
          sensors: item.sensors
        };
        return device;
      });
    }));
  }

  /**
   * device add service
   * @param device device object to be added
   * @return [ Device ] added device
   */
  postDevice(device: Device): Observable<Device> {
    return this.http.post<DeviceResponse>(this.deviceUrl, device)
    .pipe(map(res => {
        device.id = res.response.id;
        return device;
    }));
  }

  /**
   * device update service
   * @param device device object to be updated
   * @return [ Device ] updated device
   */
  putDevice(device: Device): Observable<Device> {
    return this.http.put<DeviceResponse>(this.deviceUrl, device).pipe(map(res => {
      device.id = res.response.id;
      return device;
    }));
  }

  /**
   * device delete service
   * @param deviceID device ID to be deleted
   * @return [ string ] deleted device ID
   */
  deleteDevice(deviceId: string): Observable<string> {
    return this.http.delete<DeviceResponse>(this.deviceUrl + '/' + deviceId).pipe(map(res => {
      return deviceId;
    }));
  }

  /**
   * initialize sockets to update device list upon events
   */
  initSockets() {
    // socket event for adding a new device
    this.socketService.onEvent('post:/device')
    .subscribe(data => {
      console.log('Socket: post device', data);
      const device: Device = {
          id: data.id,
          title: data.title,
          type: data.type,
          sensors: data.sensors
      };

      this.devicesById[device.id] = device;
    });

    // socket event for updating an existing device
    this.socketService.onEvent('put:/device')
    .subscribe(data => {
      console.log('Socket: put device', data);
      const device = this.devicesById[data.id];
      device.title = data.title || device.title;
      device.type = data.type || device.type;
      device.sensors = data.sensors || device.sensors;
    });

    // socket event for deleting an exiting device
    this.socketService.onEvent('delete:/device/:id')
    .subscribe(data => {
      console.log('Socket: delete device', data);

      // delete the device record
       delete this.devicesById[data.id];
    });

    // socket event for deleting all exiting devices
    this.socketService.onEvent('delete:/device')
    .subscribe(data => {
      console.log('Socket: delete all devices', data);

      // delete all devices
      this.devicesById = {};
    });
  }
}
