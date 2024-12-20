import { Component, ViewChild } from '@angular/core';
import { interval, map } from 'rxjs';

import { PoAccordionLiterals, PoNotificationService, PoSwitchComponent } from '@po-ui/ng-components';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConnectionMQTTService } from 'src/app/services/connectionMQTT/connection-mqtt.service';


@Component({
  selector: 'app-ph-sensor',
  templateUrl: './ph-sensor.component.html',
  styleUrls: ['./ph-sensor.component.css']
})
export class PhSensorComponent {
@ViewChild(PoSwitchComponent, { static: true }) switch: PoSwitchComponent;

  constructor(private formBuilder: UntypedFormBuilder, public connectionMQTTService : ConnectionMQTTService,public poNotification: PoNotificationService) {}

  form: UntypedFormGroup = this.formBuilder.group({
    intervaloInicial: ["0"],
    intervaloFinal: [14],
    tempoGeracaoDados: [5]
  });

  intervaloInicial?: number;
  intervaloFinal?: number;
  tempoGeracaoDados?: number;


  subscription: any;


  pHValue: number = 0;

  changeSwitch (): void {
    if(this.switch.value == false) this.cancelarSubscribe();
    this.gerarDadosPh();
    
  }

  changeValues(): void {

    this.intervaloInicial = this.form.get('intervaloInicial')?.value;
    this.intervaloFinal = this.form.get('intervaloFinal')?.value;
    this.tempoGeracaoDados = this.form.get('tempoGeracaoDados')?.value;
    this.cancelarSubscribe();
    this.gerarDadosPh();
    this.poNotification.success('Valores aplicados!')

  }

  enableSwitch() {
    this.switch.changeValue(true);
  }


  ngOnInit(): void {
    this.iniciarVariaveis();
    this.gerarDadosPh();
    this.enableSwitch();
    
  }

  iniciarVariaveis():void {
    this.intervaloFinal = this.form.get('intervaloFinal')?.value;
    this.intervaloInicial = this.form.get('intervaloInicial')?.value;
    this.tempoGeracaoDados = this.form.get('tempoGeracaoDados')?.value;
  }


  gerarDadosPh():void{
    if(this.switch.value == true){
      this.subscription = interval(this.tempoGeracaoDados * 1000) 
      .pipe(
        map(() => Math.random() * (this.intervaloFinal - this.intervaloInicial) + this.intervaloInicial) 
      )
      .subscribe(value => {
        this.pHValue = value;
        this.connectionMQTTService.publishTopic("waterwise/ph",this.gerarPayload() );
      });
    }else{
      this.pHValue = 0;
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
      "sensor": "ph",
      "value": ${this.pHValue},
      "measureUnit": "",
      "createDate": "${data_formated}",
      "sensorId": "108393be-86c4-4400-b1e5-6bcedff6634b"
    }`;
  }

  cancelarSubscribe() : void{
    if(this.subscription != null && this.subscription != undefined)
      this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.connectionMQTTService.disconnectBroker();
  }

}
