import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../category';
import {Company} from '../company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private httpClient: HttpClient) {
  }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<any>('http://localhost:8000/api/companies');
  }
}
