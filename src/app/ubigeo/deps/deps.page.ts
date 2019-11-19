import { Component, OnInit, NgZone } from '@angular/core';
import { BaseUbigeosService } from '../services/base-ubigeos.service';

@Component({
  selector: 'app-deps',
  templateUrl: './deps.page.html',
  styleUrls: ['./deps.page.scss'],
})
export class DepsPage implements OnInit {
  deps: any;
  changes: any;
  zone: any;

  constructor(private baseUbigeoService: BaseUbigeosService) {

    this.zone = new NgZone( { enableLongStackTrace: false });
    this.subscribeChanges();

  }
  ngOnInit() {
    this.consultarLocalDb();
  }

  subscribeChanges() {
    this.changes = this.baseUbigeoService.changes('departamento')
    .on('change', (change) => {
      console.log('Cambio en la db: ' + JSON.stringify(change));
      this.consultarLocalDb();
    })
    .on('complete', function(info) {
      console.log('Cambios fue cancelado' + JSON.stringify(info) );
    })
    .on('error', function(err) {
      console.log(err);
    });
  }

  consultarLocalDb() {
    this.baseUbigeoService.getDbDepartamentos()
    .then((data) => {
      this.fijarDatos(data);
    })
    .catch(error => {
      console.log('Estoy en el error de getDeps');
      console.error(error);
    });
  }

  fijarDatos(data) {
    this.zone.run(() => {
      this.deps = data;
    });
  }
}
