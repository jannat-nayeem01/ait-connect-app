// information.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  private apiUrl = 'https://ait-connect-api-c055b80e8a12.herokuapp.com';// Update this with your API URL

  constructor(private http: HttpClient) {}

  // Example method, you can extend it based on your API
  getAllInformation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/information`);
  }

  // Example method to add information
  addInformation(data: any): Observable<any> {
    console.log('Hi Infor Service');
    return this.http.post<any>(`${this.apiUrl}/information`, data);
  }
}
