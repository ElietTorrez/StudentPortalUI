import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { threadId } from 'worker_threads';
import { Student } from '../models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
@ViewChild(MatPaginator) matPaginator!: MatPaginator;
@ViewChild(MatSort) matSort!: MatSort;

  students: Student[]=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'email','dateOfBirth','gender' ,'physicalAddress', 'edit'];
  dataSource : MatTableDataSource<Student>= new MatTableDataSource<Student>();
filterName:string='';

  constructor(private servicio: StudentService,
    public router: Router,   public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.servicio.getStudents().subscribe(
      (success)=>{
     this.students=success;
     this.dataSource=new MatTableDataSource<Student>(this.students);

     if (this.matPaginator){
      this.dataSource.paginator=this.matPaginator;
     }

     if (this.matSort){
      this.dataSource.sort=this.matSort;
     }


    },(error)=>{

      }
    );
  }

  filterStudents(){
    this.dataSource.filter=this.filterName.trim().toLocaleLowerCase();
  }
}
