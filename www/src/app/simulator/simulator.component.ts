import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Device, Sensor, DeviceMap } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  constructor(private deviceService: DeviceService) { }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  deviceId: string;
  deviceTitle: string;
  deviceType: string;
  sensors: Sensor = {};

  ngOnInit() {
  }

  get Devices(): DeviceMap {
    return this.deviceService.Devices;
  }

  addSensor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add sensor
    if ((value || '').trim()) {
      this.sensors[value.trim()] = '';
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeSensor(sensor: string): void {
    delete this.sensors[sensor];
  }

  addDeviceClick() {
    const device: Device = {
      id: null,
      title: this.deviceTitle,
      type: this.deviceType,
      sensors: this.sensors
    };

    this.postDevice(device);
  }

  postDevice(device: Device): void {
    this.deviceService.postDevice(device)
    .subscribe(res => {
      console.log('Device add successful. Response:', res);
    });
  }

  updateDeviceClick() {
    const device: Device = {
      id: this.deviceId,
      title: this.deviceTitle,
      type: this.deviceType,
      sensors: this.sensors
    };

    this.putDevice(device);
  }

  putDevice(device: Device): void {
    this.deviceService.putDevice(device)
    .subscribe(res => {
      console.log('Device update successful. Response:', res);
    });
  }

  deleteDeviceClick() {
    const deviceId = this.deviceId;

    this.deleteDevice(deviceId);
  }

  deleteDevice(deviceId: string): void {
    this.deviceService.deleteDevice(deviceId)
    .subscribe(res => {
      console.log('Device delete successful. Response:', res);
    });
  }

  deviceSelectChange(): void {
    console.log('deviceSelectChange', this.deviceId);
    if ( !this.deviceId ) {
      return;
    }

    const device = this.Devices[this.deviceId];
    console.log('deviceSelectChange', this.deviceId);
    this.deviceTitle = device.title;
    this.deviceType = device.type;
    this.sensors = device.sensors;
  }

  resetDeviceClick(): void {
    this.deviceId = '';
    this.deviceTitle = '';
    this.deviceType = '';
    this.sensors = {};
  }
}
