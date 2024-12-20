import { Component, signal, ViewChild } from '@angular/core';
import { interval, map } from 'rxjs';

import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';

import { PoNotificationService, PoSwitchComponent } from '@po-ui/ng-components';
import { ConnectionMQTTService } from 'src/app/services/connectionMQTT/connection-mqtt.service';

@Component({

  selector: 'app-temperature-sensor',
  templateUrl: './temperature-sensor.component.html',
  styleUrls: ['./temperature-sensor.component.css']
})
export class TemperatureSensorComponent {

  @ViewChild(PoSwitchComponent, { static: true }) switch: PoSwitchComponent;

  constructor(private formBuilder: UntypedFormBuilder,public connectionMQTTService : ConnectionMQTTService,public poNotification: PoNotificationService) {}

  form: UntypedFormGroup = this.formBuilder.group({
    intervaloInicial: [10],
    intervaloFinal: [60],
    tempoGeracaoDados: [5]
  });

  intervaloInicial?: number;
  intervaloFinal?: number;
  tempoGeracaoDados?: number;

  temperaturaValue: number = 0;

  dataUltimaGeracaoSensorFisico : Date;
  mensagemTopico: string;

  subscriptionDadosTemperatura: any;

  subscriptionSensorFisico: any;

  panelOpenState = signal(false);

  changeValues(): void {

    this.intervaloInicial = this.form.get('intervaloInicial')?.value;
    this.intervaloFinal = this.form.get('intervaloFinal')?.value;
    this.tempoGeracaoDados = this.form.get('tempoGeracaoDados')?.value;
    this.cancelarSubscribe();
    this.gerarDadosTemperatura();
    this.poNotification.success('Valores aplicados!')

  }

  disableSwitch() {
    this.switch.changeValue(false);
  }

  enableSwitch() {
    this.switch.changeValue(true);
  }

  ngOnInit(): void {
    this.iniciarVariaveis();
    this.disableSwitch();
    this.gerarDadosTemperatura();
    this.observarSensorFisico();
    
  }

  observarSensorFisico(){

    this.subscriptionSensorFisico = interval(5000).pipe(
      map(() => this.connectionMQTTService.message) 
    ).subscribe(value => {
        this.mensagemTopico = value;

        if(this.mensagemTopico != null && this.mensagemTopico != undefined){
          var json = JSON.parse(this.mensagemTopico)
          if(json.sensorId == "ceb43fd3-a047-4c6a-9c7c-ee1fd3897e2c"){
            this.dataUltimaGeracaoSensorFisico = new Date(json.createDate);
            var dataAtual = new Date();
            const differenceInMilliseconds = dataAtual.getTime() - this.dataUltimaGeracaoSensorFisico.getTime();
            const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
            if(differenceInSeconds > 15){
              console.log("Habilitando Sensor Virtual de Temperatura.");
              this.enableSwitch();
            }else{
              console.log("Desabilitando Sensor Virtual de Temperatura.");
              this.disableSwitch();
            }
          }
        }
      });

    
  }

  changeSwitch (): void {
    if(this.switch.value == false) this.cancelarSubscribe();
    this.gerarDadosTemperatura();
    
  }

  iniciarVariaveis():void {
    this.intervaloFinal = this.form.get('intervaloFinal')?.value;
    this.intervaloInicial = this.form.get('intervaloInicial')?.value;
    this.tempoGeracaoDados = this.form.get('tempoGeracaoDados')?.value;
  }


  gerarDadosTemperatura():void{

    if(this.switch.value == true){
      this.subscriptionDadosTemperatura = interval(this.tempoGeracaoDados * 1000) 
      .pipe(
        map(() => Math.random() * (this.intervaloFinal - this.intervaloInicial) + this.intervaloInicial) 
      )
      .subscribe(value => {
        this.temperaturaValue = value;
        this.connectionMQTTService.publishTopic("waterwise/temperature",this.gerarPayload() );
      });
    }else{
      this.temperaturaValue = 0;
    }
  }

  gerarPayload():string{
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), 
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear(), 
        hora = data.getHours(), 
        horaF = (hora < 10) ? '0'+hora.toString() : hora, 
        minuto = data.getMinutes(),
        minutoF = (minuto < 10) ? '0' + minuto.toString() : minuto,
        segundo = data.getSeconds(),
        segundoF = (segundo < 10) ? '0' + segundo.toString() : segundo;

    var data_formated = anoF + "-" + mesF + "-" + diaF + " " + horaF + ":" + minutoF + ":" + segundoF;


    return `{
      "sensor": "temperature",
      "value": ${this.temperaturaValue},
      "measureUnit": "Celcius",
      "createDate": "${data_formated}",
      "sensorId": "f8ef2ae1-2539-4eb6-9dc9-c5e57c5c327f"
    }`;
  }

  cancelarSubscribe() : void{
    if(this.subscriptionDadosTemperatura != null && this.subscriptionDadosTemperatura != undefined)
      this.subscriptionDadosTemperatura.unsubscribe();
  }

  ngOnDestroy() {
    if(this.subscriptionDadosTemperatura != null && this.subscriptionDadosTemperatura != undefined)
      this.subscriptionDadosTemperatura.unsubscribe();

    if(this.subscriptionSensorFisico != null && this.subscriptionSensorFisico != undefined)
      this.subscriptionSensorFisico.unsubscribe();

    this.connectionMQTTService.disconnectBroker();
  }

}
