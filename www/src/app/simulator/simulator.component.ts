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

  heading = 'Device Simulator';
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

  /**
   * gets device map from the service
   */
  get Devices(): DeviceMap {
    return this.deviceService.Devices;
  }

  /**
   * adds a new sensor to the sensor map
   * @param event add material chip item event
   */
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

  // deletes a sensor when cross button is clicked
  removeSensor(sensor: string): void {
    delete this.deviceSensors[sensor];
  }

  /**
   * on click event of the 'Add Device' button
   */
  addDeviceClick() {
    const device: Device = {
      id: null,
      title: this.deviceTitle,
      type: this.deviceType,
      sensors: this.deviceSensors
    };

    this.postDevice(device);
  }

  /**
   * call to device service to add a new device
   * @param device device object
   */
  postDevice(device: Device): void {
    this.deviceService.postDevice(device)
    .subscribe(res => {
      console.log('Device add successful. Response:', res);
    });
  }

  /**
   * on click event of the 'Update Device' button
   */
  updateDeviceClick() {
    const device: Device = {
      id: this.deviceId,
      title: this.deviceTitle,
      type: this.deviceType,
      sensors: this.deviceSensors
    };

    this.putDevice(device);
  }

  /**
   * call to device service to update the device
   * @param device device object
   */
  putDevice(device: Device): void {
    this.deviceService.putDevice(device)
    .subscribe(res => {
      console.log('Device update successful. Response:', res);
    });
  }

  /**
   * on click event for the 'Delete Device' button
   */
  deleteDeviceClick() {
    const deviceId = this.deviceId;

    this.deleteDevice(deviceId);

    // clear the form fields after deleting
    this.resetDevice();
  }

  /**
   * call to device service to remove the device
   * @param deviceId ID of the device to be removed
   */
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

  /**
   * on click event for the 'Reset' button
   */
  resetDeviceClick(): void {
    this.resetDevice();
  }

  /**
   * resets the variables holding form field values
   */
  resetDevice(): void {
    this.deviceId = '';
    this.deviceTitle = '';
    this.deviceType = '';
    this.deviceSensors = {};
  }

  /**
   * gets the array of all sensor keys
   * @return [ Array[string] ] array of keys in sensor map
   */
  getSensorKeys(): Array<string> {
    return Object.keys(this.deviceSensors);
  }
}
