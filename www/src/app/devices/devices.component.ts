import { Component, OnInit } from '@angular/core';
import { Device } from "../device";
import { DeviceService } from "../device.service";
import { SocketService } from "../socket.service";
import { Socket } from "../socket";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  // device inforamtion is stored in an object map for quicker reference
  devicesById: {[key: string]:Device}= {};

  constructor(private deviceService: DeviceService, private socketService: SocketService) { }

  /**
   * gets devices using the http service
   */
  getDevices(): void {
    this.deviceService.getDevices()
    .subscribe(devices => {      
      for(let device of devices){
        this.devicesById[device.id]= device;
      }      
    });    
  }

  ngOnInit() {
    // gets initial list of devices
    this.getDevices();
    
    // intialize sockets to update device list upon events
    this.initSockets()
  }

  /**
   * intialize sockets to update device list upon events
   */
  initSockets(){
    // socket event for adding a new device
    this.socketService.onEvent("post:/device")
    .subscribe(data => {
      console.log("Socket: post device", data);
      const device: Device = {
          id: data._id,
          title: data.title,
          type: data.type,
          sensors: data.sensors
      }
      
      this.devicesById[device.id]= device;
    })

    // socket event for updating an existing device
    this.socketService.onEvent("put:/device")
    .subscribe(data => {
      console.log("Socket: put device", data);
      const device= this.devicesById[data._id];
      device.title= data.title || device.title;
      device.sensors= data.sensors || device.sensors;
    })

    // socket event for deleting an exiting device
    this.socketService.onEvent("delete:/device")
    .subscribe(data => {
      console.log("Socket: delete device", data);
      delete this.devicesById[data._id];
    })
  }
}