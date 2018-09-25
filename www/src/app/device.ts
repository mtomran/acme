// structure of device array in get http request
export interface DeviceData {
  _id: string;
  title: string;
  type: string;
  sensors: Sensor;
}

// response structure of a get http request
export interface DeviceResponse {
  response: Array<DeviceData>;
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

export interface Sensor {
  [key: string]: any;
}