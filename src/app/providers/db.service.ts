import { Injectable } from '@angular/core';
import * as $PouchDB from 'pouchdb/dist/pouchdb';
import * as $CordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
const PouchDB = $PouchDB['default'];
const CordovaSqlitePlugin = $CordovaSqlitePlugin['default'];

/*@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class DbService {
  data: any;
  db: any;
  remote: any;
  dbRemote = {
    url : 'https://a6305753-8857-48ab-8ee2-f7dbf616d804-bluemix.cloudantnosqldb.appdomain.cloud',
    userName : 'a6305753-8857-48ab-8ee2-f7dbf616d804-bluemix',
    password : 'ba1b753332d777136876c7eb9a6c5af8218a0390fbe584aef0429b7e9b21a1b5',
    base : 'ubigeos',
    local: 'ubigeos'
  };
  opts = {
    auth: {
      username: this.dbRemote.userName,
      password: this.dbRemote.password
    },
    skip_setup: true
  };
  SyncOpts = {
    live: true,
    retry: true
  };

  constructor() {
    console.log('Estoy en el constructor de db.service');
    PouchDB.plugin(CordovaSqlitePlugin);
  }

  initialize(pDbRemoteUrl, pDbUserName, pDbPassword, pDbRemoteName, pDbSync, pDbLocalName) {
    this.dbRemote.url = pDbRemoteUrl;
    this.dbRemote.userName = pDbUserName;
    this.dbRemote.password = pDbPassword;
    this.dbRemote.base = pDbRemoteName;
    this.dbRemote.local = pDbLocalName;
    this.SyncOpts.live = pDbSync;
    console.log('Estoy en el Initialize del db.service: ' + JSON.stringify(this.dbRemote));
    console.log('Parametros: ' + pDbRemoteUrl + ':' + pDbUserName);
    this.open();
  }
  open() {
    if (this.db) {
      console.log('Base local ya estuvo abierta');
    } else {
      this.db = new PouchDB(this.dbRemote.local, { adapter: 'cordova-sqlite', size: 100, auto_compaction: true});
      console.error('Base recién abierta');
    }
  }

  sync() {
    this.remote = new PouchDB(this.dbRemote.url + '/' + this.dbRemote.base, this.opts);
    console.log('En el db.service vamos a sincronizar');
    return PouchDB.replicate(this.remote, this.db, this.SyncOpts);
  }

  query(pStart, pEnd) {
    if (!this.db) {
      console.log('La base estaba cerrada');
      this.open();
    }
    console.log('la base ahora está abierta');
    const queryOpts = {
      startkey: pStart,
      endkey: pEnd ,
      include_docs: true
    };
    return this.db.allDocs( queryOpts );
  }

  changes(pFilter) {
    return this.db.changes( {
      since: 'now',
      live: true,
      filter: '_view',
      view: 'vistas/' + pFilter
    });
  }
}
