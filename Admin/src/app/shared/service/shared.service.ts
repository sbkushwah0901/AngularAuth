import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIConstant } from 'src/app/constant/api';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) { }

  public postCreateUser(model:any): Observable<any>{
    const url = `${APIConstant.postCreateUser}`
    return this.httpClient.post(url,model)
  }

  public postBlockUser(model:any): Observable<any>{
    const url = `${APIConstant.postBlockUser}`
    return this.httpClient.post(url,model)
  }
}
