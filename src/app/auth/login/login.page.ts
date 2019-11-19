import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthProviderService } from '../../providers/auth-provider.service';
import { BaseConfigService } from '../../services/config/base-config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: any;
  username: string;
  password: string;
  credentialsForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public auth: AuthProviderService,
    private baseConfig: BaseConfigService,
    private formBuilder: FormBuilder,
    private logger: NGXLogger) {
  }
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.storage.get('token')
    .then((token) => {
      if (typeof(token) !== 'undefined') {
        console.log('Authenticating with token: ', token);
        this.auth.reauthenticate(token)
        .then(data => {
          console.log('Data init: ');
          console.log(data);
          this.initDb(token);
        })
        .catch(error => {
          console.log('Error init: ');
          console.log(error);
        });
      } else {
        console.log('No hay token');
      }
    });
  }
  login() {
    console.log('Entrando al login');
    console.log(this.credentialsForm.value);
    this.auth.login(this.credentialsForm.value.username, this.credentialsForm.value.password)
    .then(data => {
      // console.log('Token recibido: ' + data.token);
      // this.initDb(data.token);
    })
    .catch(error => {
      console.error('Error en Login: ' + error);
    });
  }
  log(lvl) {
    switch (lvl) {
      case 0:
      this.logger.debug('Mensaje Debug');
      break;
      case 1:
      this.logger.info('Mensaje info');
      break;
      case 2:
      this.logger.log('Mensaje log');
      break;
      case 3:
      this.logger.warn('Mensaje Warning');
      break;
      case 4:
      this.logger.error('Mensaje error');
      break;
    }
  }
  async showLoader() {
    this.loading = await this.loadingCtrl.create({
      message: 'Authenticating ..',
      spinner: 'crescent'
    });
    return await this.loading.present();
  }
  initDb(token) {
    this.baseConfig.initDb();
    this.storage.set('token', token);
    this.navCtrl.navigateRoot('deps');
  }
}
