import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { Gender } from '../models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private urlApi='https://localhost:44391/'

  constructor(private HttpClient:HttpClient) {

   }

   getStudents(){
    return this.HttpClient.get<Student[]>(this.urlApi+'Student')
   }

   getStudent(studenID:string):Observable <Student>{
    return this.HttpClient.get<Student>(this.urlApi+'Student/'+ studenID)
   }

    getGender(){
    return this.HttpClient.get<Gender[]>(this.urlApi+'Gender');
  }
}
