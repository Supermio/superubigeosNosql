import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUbigeosService } from '../services/base-ubigeos.service';

@Component({
  selector: 'app-dists',
  templateUrl: './dists.page.html',
  styleUrls: ['./dists.page.scss'],
})
export class DistsPage implements OnInit {
  dists: any;
  provincia: any;
  departamento: any;
  changes: any;
  zone: any;


  constructor(private route: ActivatedRoute, private baseUbigeoService: BaseUbigeosService) {
    this.zone = new NgZone( { enableLongStackTrace: false });
    this.subscribeChanges();
  }
  ngOnInit() {
    this.consultarLocalDb();
  }

  subscribeChanges() {
    this.changes = this.baseUbigeoService.changes('distrito')
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
    const ubiProv = this.route.snapshot.paramMap.get('id');
    console.log('La provincia es: ' + ubiProv);
    this.baseUbigeoService.getDbDistritos(ubiProv)
    .then(data => {
      this.fijarDatos(data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  fijarDatos (data) {
    console.log('Refrescando datos...');
    this.zone.run(() => {
      this.dists = data;
      this.provincia = data[0].doc.provincia;
      this.departamento = data[0].doc.departamento;
    });
  }

}
