
export interface DeviceData {
    _id: string;
    title: string;
    type: string;
    sensors: object;
  }
  
export  interface DeviceResponse {
    response: Array<DeviceData>;
    message: string;
    error: string;
  }

export class Device {
    id: string;
    title: string;
    type: string;
    sensors: object;
}