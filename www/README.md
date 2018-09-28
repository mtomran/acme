# ACME Application Web Server
The ACME Application Web Server is generated using [Angular CLI](https://cli.angular.io/) which uses Node.js and npm to install necessary packages and tools to run the Web Server.

## How to use
Once docker containers are running, navigate to http://localhost:8080/ to view the landing page. From the landing page you can either view the list of devices or view the simulator page by clicking the corresponding buttons.

### Devices Page
Shows the list of devices and their information and sensor status. Device information will update in real-time as they change.

### Simulator Page
The simulator is used to create, update, delete, and view devices.
The left panel is used to manipulate the device info/state. 

#### Create a new device
To create a new device, fill in the provided input and press `Add Device` button when done.
Please note, a new input field would be generated as you add new sensors so you can provide initial sensor state.

#### Update an existing device
To update an existing device, select the device from the dropdown list to load the device info into the fields and change any input value as required. Once done, press the `Update Device` button.

#### Delete an existing device 
To Delete an exiting device, select the device from the dropdown list and press the `Delete Device` button.

To reset the field at any time, press the `Reset` button.

The list of devices are also shown in the simulator page for easier tracking of the changes.

Please note, in this version of the application, no validation is in place.

## To Do
- Handle ajax call error
- Add input field validations
- Add front-end unit/e2e tests.
- Use automated testing