import { Component, OnInit } from '@angular/core';
import { Device, DeviceMap } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  // device inforamtion is stored in an object map for quicker reference
  constructor(private deviceService: DeviceService) { }

  devicesById;

  get Devices(): DeviceMap {
    return this.deviceService.Devices;
  }

  ngOnInit() {
    // gets initial list of devices
    this.deviceService.loadDevices();

    // intialize sockets to update device list upon events
    this.deviceService.initSockets();
  }
}
