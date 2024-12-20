import {Component, OnInit, ViewChild} from '@angular/core';
import { interval, map } from 'rxjs';

import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { PoNotificationService, PoSwitchComponent } from '@po-ui/ng-components';
import { ConnectionMQTTService } from 'src/app/services/connectionMQTT/connection-mqtt.service';

@Component({
  selector: 'app-conductivity-sensor',
  templateUrl: './conductivity-sensor.component.html',
  styleUrls: ['./conductivity-sensor.component.css']
})
export class ConductivitySensorComponent {
@ViewChild(PoSwitchComponent, { static: true }) switch: PoSwitchComponent;

  constructor(private formBuilder: UntypedFormBuilder, public connectionMQTTService : ConnectionMQTTService,public poNotification: PoNotificationService) {}

  form: UntypedFormGroup = this.formBuilder.group({
    intervaloInicial: ["0"],
    intervaloFinal: [1000],
    tempoGeracaoDados: [5]
  });

  intervaloInicial?: number;
  intervaloFinal?: number;
  tempoGeracaoDados?: number;


  subscription: any;


  condutividadeValue: number = 0;

  changeSwitch (): void {
    if(this.switch.value == false) this.cancelarSubscribe();
    this.gerarCondutividade();
    
  }

  changeValues(): void {

    this.intervaloInicial = this.form.get('intervaloInicial')?.value;
    this.intervaloFinal = this.form.get('intervaloFinal')?.value;
    this.tempoGeracaoDados = this.form.get('tempoGeracaoDados')?.value;
    this.cancelarSubscribe();
    this.gerarCondutividade();
    this.poNotification.success('Valores aplicados!')

  }

  enableSwitch() {
    this.switch.changeValue(true);
  }


  ngOnInit(): void {
    this.iniciarVariaveis();
    this.gerarCondutividade();
    this.enableSwitch();
    
  }

  iniciarVariaveis():void {
    this.intervaloFinal = this.form.get('intervaloFinal')?.value;
    this.intervaloInicial = this.form.get('intervaloInicial')?.value;
    this.tempoGeracaoDados = this.form.get('tempoGeracaoDados')?.value;
  }


  gerarCondutividade():void{
    if(this.switch.value == true){
      this.subscription = interval(this.tempoGeracaoDados * 1000) 
      .pipe(
        map(() => Math.random() * (this.intervaloFinal - this.intervaloInicial) + this.intervaloInicial) 
      )
      .subscribe(value => {
        this.connectionMQTTService.publishTopic("waterwise/conductivity",this.gerarPayload() );
        this.condutividadeValue = value;
        
      });
    }else{
      this.condutividadeValue = 0;
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
      "sensor": "conductivity",
      "value": ${this.condutividadeValue},
      "measureUnit": "µS/cm",
      "createDate": "${data_formated}",
      "sensorId": "6b09f007-cc3b-4f48-a5eb-1c745c1e163a"
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
