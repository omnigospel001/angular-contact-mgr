import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { iContact } from '../models/iContact';
import { iGroup } from '../models/iGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private serverUrl = 'http://localhost:9000'

  constructor(private http: HttpClient) { }

  public getAllContacts(): Observable<iContact[]>{
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.http.get<iContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  public getContact(contactId: string): Observable<iContact>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.http.get<iContact>(dataUrl).pipe(catchError(this.handleError));
  }

  public saveContact(contact: iContact): Observable<iContact>{
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.http.post<iContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

   public updateContact(contact: iContact, contactId: string): Observable<iContact>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId} `;
    return this.http.put<iContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  public deleteContact(contactId: string): Observable<{}>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId} `;
    return this.http.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }

  public getAllGroups(): Observable<iGroup[]>{
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.http.get<iGroup[]>(dataUrl).pipe(catchError(this.handleError));
  } 
  
  public getGroup(contact: iContact): Observable<iGroup>{
    let dataUrl: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.http.get<iGroup>(dataUrl).pipe(catchError(this.handleError));
  }


  public handleError(error: HttpErrorResponse) {
    let erroeMessage: string = '';
    
    if(error.error instanceof ErrorEvent){
      //client error
      erroeMessage = `Error : ${error.error.message}`
    }
    else{
      //server error
      erroeMessage = `Status : ${error.status} \n Message : ${error.message}`;
    }
    return throwError(erroeMessage);
  }
}


