import { Injectable } from '@angular/core';
import {AbstractService} from "../../shared/abstract.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListItemsService extends AbstractService<any>{

  protected constructor(httpService: HttpClient) {
    super(httpService,'item');
  }
}
