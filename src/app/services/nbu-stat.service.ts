import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {INbuStat} from "../models/nbuStat";

@Injectable({
  providedIn: 'root'
})
export class NbuStatService {

  constructor(private http:HttpClient) { }

  getAll():Observable<INbuStat[]>{
    return this.http.get<INbuStat[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
  }
}
