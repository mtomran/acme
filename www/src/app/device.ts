// response structure of a get http request
export interface DeviceGetResponse {
  response: Array<Device>;
  message: string;
  error: string;
}

// response structure of http requests other than get
export interface DeviceResponse {
  response: any;
  message: string;
  error: string;
}

// device structure used in the component
export interface Device {
  id: string;
  title: string;
  type: string;
  sensors: Sensor;
}

export interface DeviceMap {
  [key: string]: Device;
}

export interface Sensor {
  [key: string]: any;
}
