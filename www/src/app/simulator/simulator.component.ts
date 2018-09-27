import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Device, Sensor, DeviceMap } from '../device';
import { DeviceService } from '../device.service';
import * as _ from 'lodash';

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
  deviceSensors: Sensor = {};

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
      this.deviceSensors[value.trim()] = '';
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeSensor(sensor: string): void {
    delete this.deviceSensors[sensor];
  }

  addDeviceClick() {
    const device: Device = {
      id: null,
      title: this.deviceTitle,
      type: this.deviceType,
      sensors: this.deviceSensors
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
      sensors: this.deviceSensors
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
    this.resetDevice();
  }

  deleteDevice(deviceId: string): void {
    this.deviceService.deleteDevice(deviceId)
    .subscribe(res => {
      console.log('Device delete successful. Response:', res);
    });
  }

  /**
   * loads a device info to form fields when device dropdown selection changes
   * so it can be updated or deleted
   */
  deviceSelectChange(): void {
    // cloning the exiting data so angular two way binding
    // does not change the data while updating the form fields.
    const device = _.cloneDeep(this.Devices[this.deviceId]);

    this.deviceTitle = device.title;
    this.deviceType = device.type;
    this.deviceSensors = device.sensors;
  }

  resetDeviceClick(): void {
    this.resetDevice();
  }

  resetDevice(): void {
    this.deviceId = '';
    this.deviceTitle = '';
    this.deviceType = '';
    this.deviceSensors = {};
  }

  getSensorKeys(): Array<string> {
    return Object.keys(this.deviceSensors);
  }
}
