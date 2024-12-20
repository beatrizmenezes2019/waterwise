#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <iostream>
#include <string>
#include <stdio.h>
#include <time.h>
#include <ESPDateTime.h>

const char *ssid = ""; //Definir aqui o SSID da rede
const char *password = ""; // Definir aqui a senha da rede
const char *mqtt_broker = "ec2-184-72-169-38.compute-1.amazonaws.com";
const char *mqtt_topic = "waterwise/temperature";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient mqtt_client(espClient);

OneWire barramento(D4);

DallasTemperature sensor(&barramento);

void connectToWiFi();

void connectToMQTTBroker();

void subscribeMessage();

void setup() {
     Serial.begin(9600);
     sensor.begin(); 
     Serial.print("Connecting to WiFi");
     connectToWiFi();
     
     mqtt_client.setServer(mqtt_broker, mqtt_port);
     connectToMQTTBroker();
}

void connectToWiFi() {
    WiFi.begin(ssid, password);
     while (WiFi.status() != WL_CONNECTED) {
         delay(500);
         Serial.println("Try to connect wifi...");
     }
     Serial.println("\nConnected to the WiFi network");
}

void connectToMQTTBroker() {
     while (!mqtt_client.connected()) {
         String client_id = "esp8266-client-" + String(WiFi.macAddress());
         Serial.printf("Connecting to MQTT Broker as %s.....\n", client_id.c_str());
         if (mqtt_client.connect(client_id.c_str())) {
             Serial.println("Connected to MQTT broker");
         } else {
            Serial.print("Failed to connect to MQTT broker, rc=");
            Serial.print(mqtt_client.state());
            Serial.println(" try again in 5 seconds");
             delay(5000);
      }
     }
      
     

}

void subscribeMessge() {
  
      sensor.requestTemperatures();
      float temperatura = sensor.getTempCByIndex(0);

      String temp_string = String(temperatura);

      DateTime.setTimeZone("<-03>3");
      DateTime.begin(1000);
      String data = DateTime.toString();

      String mensagem = "{\"sensor\":\"temperature\",\"value\": "+temp_string+",\"measureUnit\":\"Celcius\",\"createDate\":\""+data+"\",\"sensorId\":\"ceb43fd3-a047-4c6a-9c7c-ee1fd3897e2c\"}";

      mqtt_client.subscribe(mqtt_topic);
      mqtt_client.publish(mqtt_topic, mensagem.c_str());

      delay(5000);
}


void loop() {
    if (!mqtt_client.connected()) {
        connectToMQTTBroker();
    }
    subscribeMessge();
    mqtt_client.loop();
}
