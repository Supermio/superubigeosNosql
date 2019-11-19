import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataFinderService {

  constructor(private http: HttpClient) { }

  public getJSONDataAsync(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(filePath)
      .subscribe( res => {
          console.log('Estoy en el datafinder: ');
          console.log(res);
          resolve(res);
        }, error => {
          console.error('Error al leer: ' + error);
          reject ('Failed with status: ' + error.status + '\trying to find file at ' + filePath);
        }
      )
    })
    .catch((reason) => this.handleError(reason));
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
