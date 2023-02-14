import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { Gender } from '../models/gender.model';
import { UpdateStudent } from '../models/update-student.model';
import { AddStudent } from '../models/add-student.model';

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


  update(studentId:string, studentRequest:Student):Observable<Student>{
    const updateStudent:UpdateStudent={
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress,
    }

    return this.HttpClient.put<Student>(this.urlApi+'Student/'+ studentId,updateStudent);
  }


  Add(studentRequest:Student):Observable<Student>{
    const addStudent:AddStudent={
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress,
    }

    return this.HttpClient.post<Student>(this.urlApi+ 'Student/Add/' , addStudent);
  }


  upload(studentId: string, file: File): Observable<any> {
    const form = new FormData();
    form.append("image", file)

    return this.HttpClient.post(this.urlApi + 'Student/' + studentId + '/upload',
      form,
      {
        responseType: 'text'
      }
    );
  }


  getRuta(ruta:string){
    console.log(this.urlApi,ruta)
    return `${this.urlApi}${ruta}`

  }
}
