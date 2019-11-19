import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

declare const Buffer;

const apiUrl = 'https://a6305753-8857-48ab-8ee2-f7dbf616d804-bluemix.cloudantnosqldb.appdomain.cloud';
const userName = 'a6305753-8857-48ab-8ee2-f7dbf616d804-bluemix';
const password = 'ba1b753332d777136876c7eb9a6c5af8218a0390fbe584aef0429b7e9b21a1b5';
const base = '/ubigeos/';


const options = {
  host: 'a6305753-8857-48ab-8ee2-f7dbf616d804-bluemix.cloudantnosqldb.appdomain.cloud',
  port: 443,
  path: '/ubigeos/_all_docs?inclusive_end=true&include_docs=true&start_key="dep"&end_key="dep%5Cuffff"',
  headers: {
    'Authorization' : 'Basic ' + btoa(userName + ':' + password)
  }
};

@Injectable({
  providedIn: 'root'
})
export class UbigeosService {

  constructor(private http: HttpClient) { }
  /* getDataAll(): Observable<any> {
    let response1 = this.http.get('https://' + userName + ':' + password + '@' + apiUrl + query);
    return response1;
  } */

  private getQueryDep() {
    const queryDeps = base + '_all_docs?inclusive_end=true&include_docs=true&start_key="dep-"&end_key="dep-%5Cuffff"';
    return queryDeps;
  }
  private getQueryProv(pDep) {
    let queryProvs = base + '_all_docs?inclusive_end=true&include_docs=true&start_key="prov-' + pDep;
    queryProvs += '"&end_key="prov-' + pDep + '%5Cuffff"';
    return queryProvs;
  }
  private getQueryDist(pProv) {
    let queryDists = base + '_all_docs?inclusive_end=true&include_docs=true&start_key="dist-' + pProv;
    queryDists += '"&end_key="dist-' + pProv + '%5Cuffff"';
    return queryDists;
  }
  getDepartamentos() {
    let res: any;
    options.path = this.getQueryDep();
    return new Promise(resolve => {
      this.http.get(apiUrl + options.path, options).subscribe(data => {
        res = data;
        resolve(res.rows);
      }, err => {
        console.error(err);
      });
    });
  }
  getProvincias(pDep: string) {
    let res: any;
    options.path = this.getQueryProv(pDep);
    return new Promise(resolve => {
      this.http.get(apiUrl + options.path, options).subscribe(data => {
        res = data;
        resolve(res.rows);
      }, err => {
        console.error(err);
      });
    });
  }
  getDistritos(pProv) {
    let res: any;
    options.path = this.getQueryDist(pProv);
    return new Promise(resolve => {
      this.http.get(apiUrl + options.path, options).subscribe(data => {
        res = data;
        resolve(res.rows);
      }, err => {
        console.error(err);
      });
    });
  }
}
