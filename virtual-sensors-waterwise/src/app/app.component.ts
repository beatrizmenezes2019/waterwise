import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string = "WaterWise Sensors";

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
    { label: 'Configurações', action: this.onClick.bind(this) }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

}
