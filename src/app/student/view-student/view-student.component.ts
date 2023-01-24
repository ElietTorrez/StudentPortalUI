import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId:string | null | undefined;
student: Student ={
  id: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  mobile: 0,
  profileImageUrl: '',
  genderId: '',
  gender: {
    id:'',
    description:''
  },
  address: {
    id:'',
    physicalAddress:'',
    postalAddress:''
  }
}

  constructor(private readonly studentService:StudentService,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
this.route.paramMap.subscribe(
  (params)=>{
    console.log(params)
   this.studentId= params.get('id');

   if (this.studentId){
   this.studentService.getStudent( this.studentId).subscribe(
    (response)=>{
      this.student=response;
      console.log(this.student)
    }

   );
  }
  }
)



  }

}
