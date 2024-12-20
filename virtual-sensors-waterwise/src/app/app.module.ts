import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { PoModule } from '@po-ui/ng-components';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PhSensorComponent } from './components/ph-sensor/ph-sensor.component';
import { TurbiditySensorComponent } from './components/turbidity-sensor/turbidity-sensor.component';
import { DissolvedOxygenSensorComponent } from './components/dissolved-oxygen-sensor/dissolved-oxygen-sensor.component';
import { ConductivitySensorComponent } from './components/conductivity-sensor/conductivity-sensor.component';
import { TemperatureSensorComponent } from './components/temperature-sensor/temperature-sensor.component';
import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';


export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'ec2-184-72-169-38.compute-1.amazonaws.com',
  port: 8083,
};


@NgModule({
  declarations: [
    AppComponent,
    PhSensorComponent,
    ConductivitySensorComponent,
    TurbiditySensorComponent,
    DissolvedOxygenSensorComponent,
    TemperatureSensorComponent
  ],
  imports: [
    BrowserModule,
    PoModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
