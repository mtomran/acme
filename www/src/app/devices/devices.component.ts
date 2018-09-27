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
  displayedColumns: string[] = ['id', 'title', 'type', 'sensors'];

  constructor(private deviceService: DeviceService) { }

  get Devices(): DeviceMap {
    return this.deviceService.Devices;
  }

  get DevicesArray(): Device[] {
    return Object.values(this.Devices);
  }

  ngOnInit() {
    // gets initial list of devices
    this.deviceService.loadDevices();

    // intialize sockets to update device list upon events
    this.deviceService.initSockets();

  }
}
