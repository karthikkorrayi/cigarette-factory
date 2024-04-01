import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private _http: HttpClient) {}

  public generateToken(req) {
    return this._http.post('http://localhost:9090/authenticate', req, {
      responseType: 'text' as 'json',
    });
  }

  public welcome(token) {
    let tokenstr = 'Bearer ' + token;

    const myHeader = new HttpHeaders().set('Authorization', tokenstr);

    return this._http.get('http://localhost:9090/home', {
      headers: myHeader,
      responseType: 'text' as 'json',
    });
  }
}
