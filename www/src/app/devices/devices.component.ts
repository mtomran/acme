import { Component, OnInit } from '@angular/core';
import { Device, DeviceMap } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})

export class DevicesComponent implements OnInit {
  // table columns array
  heading = 'Devices';
  displayedColumns: string[] = ['id', 'title', 'type', 'sensors'];

  constructor(private deviceService: DeviceService) { }

  // gets devices stored in the service
  get Devices(): DeviceMap {
    return this.deviceService.Devices;
  }

  // devices array for the table data source
  get DevicesArray(): Device[] {
    return Object.values(this.Devices);
  }

  ngOnInit() {}
}
