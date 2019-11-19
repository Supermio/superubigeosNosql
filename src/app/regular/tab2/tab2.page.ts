import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UbigeosService } from '../services/ubigeos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  provs: any;
  departamento: any;
  constructor(private route: ActivatedRoute, private ubigeoService: UbigeosService) {
  }
  ionViewWillEnter() {
    const ubiDep = this.route.snapshot.paramMap.get('id');
    console.log('El departamento es: ' + ubiDep);
    this.ubigeoService.getProvincias(ubiDep)
    .then(data => {
      this.provs = data;
      this.departamento = data[0].doc.departamento;
    });
  }
}
