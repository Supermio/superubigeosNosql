import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUbigeosService } from '../services/base-ubigeos.service';

@Component({
  selector: 'app-provs',
  templateUrl: './provs.page.html',
  styleUrls: ['./provs.page.scss'],
})
export class ProvsPage implements OnInit {

  provs: any;
  departamento: any;
  changes: any;
  zone: any;

  constructor(private route: ActivatedRoute, private baseUbigeoService: BaseUbigeosService) {
    this.zone = new NgZone( { enableLongStackTrace: false });
    this.subscribeChanges();
  }
  ionViewWillEnter() {  }

  ngOnInit() {
    this.consultarLocalDb();
  }

  subscribeChanges() {
    this.changes = this.baseUbigeoService.changes('provincia')
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
    const ubiDep = this.route.snapshot.paramMap.get('id');
    console.log('El departamento es: ' + ubiDep);
    this.baseUbigeoService.getDbProvincias(ubiDep)
    .then(data => {
      this.fijarDatos(data);
    });
  }

  fijarDatos (data) {
    console.log('Refrescando datos...');
    this.zone.run(() => {
      this.provs = data;
      this.departamento = data[0].doc.departamento;
    });
  }

}
