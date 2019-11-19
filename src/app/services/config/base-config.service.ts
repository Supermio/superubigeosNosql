import { Injectable } from '@angular/core';
import { DbService } from '../../providers/db.service';
import { DataFinderService } from '../utils/data-finder.service';

@Injectable({
  providedIn: 'root'
})
export class BaseConfigService {
  appName: string;
  appDbUrl: string;
  appDb: string;
  appSync: string;
  appDbUsername: string;
  appDbPassword: string;
  appPerUserDb: boolean;

  userName: string;
  userIsLooged: boolean;
  loaded: boolean;

  config: any;

  constructor(private dataFinder: DataFinderService, private db: DbService ) {
  }

  async init() {
    console.log('Estoy en el constructor del Config');
    await this.LoadConfig();
  }
  initDb() {
    this.db.initialize(
      this.getAppDbUrl(),
      this.getAppDbUsername(),
      this.getAppDbPassword(),
      this.getAppRemoteDb(),
      this.getAppSync(),
      this.getAppDb()
    );
    console.log('Estoy en el initDb');
    this.db.sync()
    .on('complete', (res) => {
      console.error('Ya completó el sync!!');
    });
  }
  setLoaded() {
    this.loaded = true;
  }
  query(pStart: any, pEnd: any) {
    return this.db.query(pStart, pEnd);
  }
  sync() {
    return this.db.sync();
  }
  changes(pFilter: any) {
    return this.db.changes(pFilter);
  }
  LoadConfig() {
    return new Promise((resolve) => {
      this.dataFinder.getJSONDataAsync('assets/data/config.json')
      .then(data => {
        console.log('Recien leida la config: ');
        console.log(JSON.stringify(data));
        this.SetConfigData(data);
        console.log('appName: ' + this.appName);
        console.log('appDbUrl: ' + this.appDbUrl);
        resolve(data);
      })
      .catch(error => {
        console.error('Error: ' + error);
      });
    });
  }

  SetConfigData(config: any) {
    this.appName = config.appName;
    this.appDbUrl = config.appDbUrl;
    this.appDb = config.appDB;
    this.appSync = config.appSync;
    this.appDbUsername = config.appDbUsername;
    this.appDbPassword = config.appDbPassword;
    this.appPerUserDb = config.appPerUserDb;
    console.log('Ya inicié los datos: ' + JSON.stringify(config));
  }
  getAppDbPerUser() {
    return this.appPerUserDb;
  }
  getAppName() {
    return this.appName;
  }
  getAppRemoteDb() {
    return this.appDb;
  }
  getAppDb() {
    if (this.appPerUserDb) {
      return this.userName + '-' + this.appDb;
    }
    return this.appDb;
  }
  getAppDbUrl() {
    return this.appDbUrl;
  }
  getAppSync() {
    return this.appSync;
  }
  getUserName() {
    return this.userName;
  }
  getAppDbUsername() {
    return this.appDbUsername;
  }
  getAppDbPassword() {
    return this.appDbPassword;
  }
  getUserIsLogged() {
    return this.userIsLooged;
  }
}
