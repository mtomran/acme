import { Injectable } from '@angular/core';
import { Device, DeviceResponse } from "./device";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {  
  private deviceUrl = 'server/device';
  private handleError(error:string, data){
    console.error("Error:"+error+":"+data+" Please try again later..");
  }

  constructor(private http: HttpClient) { }
  
  getDevices(): Observable<Device[]> {   
    return this.http.get<DeviceResponse>(this.deviceUrl)
    .pipe(map(res=>{
      return res.response.map(item => {        
        const device: Device = {
          id: item._id,
          title: item.title,
          type: item.type,
          sensors: item.sensors
        }
        return device;
      })      
    }));    
  }

  postDevice(device: Device): Observable<Device> {   
    return this.http.post<DeviceResponse>(this.deviceUrl, device)
    .pipe(map(res=>{
        device.id= res.response.deviceId;
        return device;
      
    }));    
  }

  
}
