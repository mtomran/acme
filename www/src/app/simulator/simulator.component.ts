import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Device, Sensor } from "../device";
import { DeviceService } from "../device.service";

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {

  constructor(private deviceService: DeviceService,) { }

  ngOnInit() {
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  deviceTitle: "";
  deviceType: "";
  sensors: Sensor = {};

  addSensor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add sensor
    if ((value || '').trim()) {      
      this.sensors[value.trim()]= "";      
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeSensor(sensor: string): void {
    delete this.sensors[sensor];
  }

  addDeviceClick(){
    const device: Device = {
      id: null,
      title: this.deviceTitle,
      type: this.deviceType,
      sensors: this.sensors
    }

    this.postDevice(device);
  }

  postDevice(device: Device): void {
    this.deviceService.postDevice(device)
    .subscribe(res => {      
      // for(let device of devices){
      //   this.devicesById[device.id]= device;
      // }      
      console.log("Device add successful. Response:", res);
    });    
  }

}
