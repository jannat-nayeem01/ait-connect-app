// group.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://https://ait-connect-api-c055b80e8a12.herokuapp.com';
  private groupsSubject = new BehaviorSubject<any[]>([]);
  groups$: Observable<any[]> = this.groupsSubject.asObservable();

  constructor(private http: HttpClient,private router:Router) {}

  
  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groups`);
  }


  createGroup(group: any): Observable<any> {
    console.log('Hi from Service',group)

    return this.http.post<any>(`${this.apiUrl}/groups`, group);
  }

  updateGroup(group: any): Observable<any> {
    console.log('Hi from Service');

    const url = `${this.apiUrl}/groups/${group._id}`;
    return this.http.put<any>(url, group);
  }
  deleteGroup(group: any): Observable<any> {
    const url = `${this.apiUrl}/groups/${group._id}`;
    return this.http.delete<any>(url);
  }
  
  // joinGroup(groupId: string): Observable<any> {
  //   console.log('Hi from Service Join',groupId)

  //   const joinGroupUrl = `${this.apiUrl}/groups/join/${groupId}`;
  //   return this.http.post(joinGroupUrl, {});

  // }

  // leaveGroup(groupId: string): Observable<any> {
  //   const url = `${this.apiUrl}/groups/leave/${groupId}`;
  //   return this.http.post<any>(url, {});
  // }


  joinGroup(groupId: string, userId: string): Observable<any> {
        console.log('hello Kumu from Service',groupId,userId);


    return this.http.post(`${this.apiUrl}/groups/${groupId}/join`, { userId });
  }

  leaveGroup(groupId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/groups/${groupId}/leave`, { userId });
  }


  
  // joinGroup(groupId: string): Observable<any> {
  //   console.log('Hi from Service Join',groupId)

  //   return this.http.post<any>(`${this.apiUrl}/groups/${groupId}/join`, {});
  // }

  // leaveGroup(groupId: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/groups/${groupId}/leave`, {});
  // }


}
