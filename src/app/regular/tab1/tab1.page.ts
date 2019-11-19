import { Component } from '@angular/core';
import { UbigeosService } from '../services/ubigeos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  deps: any;
  constructor(private ubigeosService: UbigeosService) {
    this.getDeps();
  }
  getDeps() {
    this.ubigeosService.getDepartamentos()
    .then(data => {
      this.deps = data;
    });
  }
}
