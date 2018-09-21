import { Component, OnInit } from '@angular/core';
import { Device } from "../device";
import { DeviceService } from "../device.service";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devices: Device[];
  constructor(private deviceService: DeviceService) { }

  getDevices(): void {
    this.deviceService.getDevices()
    .subscribe(devices => this.devices= devices);    
  }

  ngOnInit() {
    this.getDevices();
    setTimeout(()=>{
      this.devices[0].title= "test";
    }, 3000)
  }

}
