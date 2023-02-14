import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../../models/student.model';
import { Gender } from '../../models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };


  header: string = '';
  gender: Gender[] = [];
  isNew: any;
  displayImage: string = '';

  constructor(
    private readonly studentService: StudentService,
    private route: ActivatedRoute,
    private notificacion: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    debugger
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');

      if (this.studentId) {
        if (this.studentId.toLocaleLowerCase() === 'Add'.toLocaleLowerCase()) {
          this.isNew = true;
          this.header = 'Nuevo estudiante';
          this.setImage();

        } else {
          this.isNew = false;
          this.header = 'Vista estudiante';
          this.setImage();

        }


        this.studentService.getStudent(this.studentId).subscribe((response) => {
          this.student = response;
          this.setImage();
        },(error)=>{
          this.setImage();
        });
      }

      this.studentService.getGender().subscribe((response) => {
        this.gender = response;
      });
    });
  }

  actualizar(): void {
    this.studentService.update(this.student.id, this.student).subscribe(
      (response) => {
        console.log(response);
        this.notificacion.open('Registro actualizado', undefined, {
          duration: 2000
        });

      },
      (error) => {
        this.notificacion.open('Contacte al administrador', undefined, {
          duration: 2000
        });
      }
    );
  }

  nuevo() {
    this.studentService.Add(this.student).subscribe(
      (response) => {
        console.log(response);
        this.notificacion.open('Registro agregado', undefined, {
          duration: 2000
        });


      },
      (error) => {
        this.notificacion.open('Contacte al administrador', undefined, {
          duration: 2000
        });
      }
    );
  }

  setImage(): void {
    if (this.student.profileImageUrl) {
      this.displayImage= this.studentService.getRuta(this.student.profileImageUrl);
    } else {
    this.displayImage='/assets/imagen/blog.png'
    }

  }

  async capturarFile(event: any) {
    const imagen = event.target.files[0];


    this.studentService.upload(this.student.id, imagen).subscribe(

      (response) => {
        this.student.profileImageUrl=response;
        this.setImage();
       },
      (error) => {
        this.notificacion.open('Contacte al administrador', undefined, {
          duration: 2000
        });
      })
  }

}
