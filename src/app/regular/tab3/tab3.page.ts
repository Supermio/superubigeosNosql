import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UbigeosService } from '../services/ubigeos.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  dists: any;
  provincia: any;
  departamento: any;
  constructor(private route: ActivatedRoute, private ubigeoService: UbigeosService) {
  }
  ionViewWillEnter() {
    const ubiProv = this.route.snapshot.paramMap.get('id');
    console.log('El departamento es: ' + ubiProv);
    this.ubigeoService.getDistritos(ubiProv)
    .then(data => {
      this.dists = data;
      this.provincia = data[0].doc.provincia;
      this.departamento = data[0].doc.departamento;
    });
  }
}
