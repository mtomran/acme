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

// device structure type
export interface Device {
  id: string;
  title: string;
  type: string;
  sensors: Sensor;
}

// key/value presentation of the device array using id as key
export interface DeviceMap {
  [key: string]: Device;
}

// device sensor key/value type
export interface Sensor {
  [key: string]: any;
}
