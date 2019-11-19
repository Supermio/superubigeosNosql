import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { BaseConfigService } from './services/config/base-config.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private baseConfig: BaseConfigService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.baseConfig.init()
    .then( resolve => {
      console.log('Estoy en initializeApp');
      if (this.baseConfig.getAppDbPerUser()) {
      }
      console.log('El config es: ' + this.baseConfig.getAppDb());
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
