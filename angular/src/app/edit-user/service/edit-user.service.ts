import { Injectable } from '@angular/core';
import {AbstractService} from "../../shared/abstract.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditUserService extends AbstractService<any>{

  protected constructor(httpService: HttpClient) {
    super(httpService,'user');
  }

  setActiveStatus(id: number, isActive: boolean): Observable<any> {
    return this.httpService.put<any>(`${this.url}/${id}/access`, { active: isActive });
  }

}
