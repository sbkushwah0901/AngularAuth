import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIConstant } from 'src/app/constant/api';

@Injectable({
  providedIn: 'root'
})
export class AdminPagesService {

  constructor(private httpClient: HttpClient) { }

  public getAllCount(): Observable<any>{
    const url = `${APIConstant.getAllCount}`
    return this.httpClient.get(url)
  }

  public GetAllUsers(): Observable<any>{
    const url = `${APIConstant.GetAllUsers}`
    return this.httpClient.get(url)
  }

  public getGetSpaceConfiguration(): Observable<any>{
    const url = `${APIConstant.getGetSpaceConfiguration}`
    return this.httpClient.get(url)
  }

  public postUpdateSpaceConfig(updateConfig:any): Observable<any>{
    const url = `${APIConstant.postUpdateSpaceConfig}`
    return this.httpClient.post(url,updateConfig)
  }


  // public postVerifyUser(verifyModel: any): Observable<any>{
  //   const url = `${APIConstant.verifyUser}`
  //   return this.httpClient.post(url , verifyModel)
  // }
  // public postuserLogin(userModel: any): Observable<any>{
  //   const url = `${APIConstant.userLogin}`
  //   return this.httpClient.post(url , userModel)
  // }

  // public postUpdateExternalUser(profileModel: any): Observable<any>{
  //   const url = `${APIConstant.postUpdateExternalUser}`
  //   return this.httpClient.post(url , profileModel)
  // }
}
