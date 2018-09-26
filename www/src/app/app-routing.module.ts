import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { SimulatorComponent } from './simulator/simulator.component';

const routes: Routes = [
  { path: 'devices', component: DevicesComponent },
  { path: 'simulator', component: SimulatorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
