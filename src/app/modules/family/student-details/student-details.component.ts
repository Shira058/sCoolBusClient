import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { Student } from 'src/app/models/student.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { RouteService } from 'src/app/services/route.service';
import { StudentService } from 'src/app/services/student.service';
import { PassportCameraComponent } from '../passport-camera/passport-camera.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  constructor(public dialog:MatDialog,private _acr: ActivatedRoute,private route:RouteService,private currUser:CurrentUserService,private nav:Router,private student:StudentService) { }
  // email!: string | null
  // pass!: string | null
  newStudent:Student=new Student();
  routes:Route[]=new Array<Route>();
  ngOnInit(): void {
  this.route.getAllRoutes().subscribe(data=>{
    this.routes=data,
    console.log("jj",this.routes)
  })
 }
 registerStudentForm: FormGroup = new FormGroup({
   "firstName":new FormControl("", Validators.required),
   "personalPhone":new FormControl("",Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")),
   "grade":new FormControl("", Validators.required),
  "route": new FormControl("", Validators.required)
});
Register()
{
  this.newStudent.firstName= this.registerStudentForm.controls["firstName"].value;
  this.currUser.getFamily().subscribe( data=>{this.newStudent.lastName=data.familyName,this.newStudent.familyId=data.id}); 
  this.newStudent.phone= this.registerStudentForm.controls["personalPhone"].value;
  this.newStudent.grade= this.registerStudentForm.controls["grade"].value;
  this.newStudent.routId=this.routes.filter(r=>r.name==this.registerStudentForm.controls["route"].value)[0].id
  this.newStudent.passport=(this._acr.snapshot.paramMap.get('imgURL'))?.toString();
  this.student.AddNewStudent(this.newStudent).subscribe(data=>{
    this.newStudent=data;
  this.newStudent.imageRoute="././././assets/"+data.id;

  })
}
navigateToPicture()
{
  let dialogRef = this.dialog.open(PassportCameraComponent, {
    height: '500px',
    width: '500px',
  });

  
  
  // this.nav.navigate(['user/family/student/picture']) 
}


}
