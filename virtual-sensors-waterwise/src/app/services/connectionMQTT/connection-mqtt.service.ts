import { Injectable } from '@angular/core';
import mqtt, { MqttClient } from "mqtt";
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { connect, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionMQTTService {

  private subscription: Subscription;
  public message: string;

  constructor(private _mqttService: MqttService) {
    this.subscription = this._mqttService.observe('waterwise/temperature').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
    });
  }

  public publishTopic(topic: string, message: string): void {
    console.log("pubish on topic: "+ topic)
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }


  public disconnectBroker():void {
    this.subscription.unsubscribe();
  }


}



