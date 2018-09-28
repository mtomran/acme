import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimulatorComponent } from './simulator.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatTableModule, MatSelectModule, MatChipsModule, MatIconModule } from '@angular/material';
import { DevicesComponent } from '../devices/devices.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SimulatorComponent', () => {
  let component: SimulatorComponent;
  let fixture: ComponentFixture<SimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorComponent, DevicesComponent ],
      imports: [ BrowserAnimationsModule, HttpClientTestingModule, FormsModule, MatTableModule,
        MatInputModule, MatFormFieldModule, MatSelectModule, MatChipsModule, MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
