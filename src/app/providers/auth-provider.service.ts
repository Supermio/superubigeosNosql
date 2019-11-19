import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthProviderService {
  url = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }

  login (username, password) {
    let res: any;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const credentials = {
      username: username,
      password: password
    };
    console.log('Estoy en el login');
    return new Promise(resolve => {
      this.http.post(this.url + 'api/auth', credentials, {headers: headers})
      .subscribe(data => {
        console.log(data);
        res = data;
        resolve (res);
      }, err => {
        console.error(err);
      });
    });
  }
  reauthenticate(token) {
    let res: any;
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
    const credentials = {
      token: token
    };
    return new Promise (resolve => {
      this.http.post(this.url + 'api/checkToken', credentials, {headers: headers})
      .subscribe(data => {
        res = data;
        resolve (res);
      }, err => {
        console.log('Error en Reauthenticate:');
        console.error(err);
      });
    });
  }
}
