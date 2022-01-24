import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverModule } from '../driver/driver.module';
import { ManagerModule } from '../manager/manager.module';
import { FamilyModule } from '../family/family.module';
import { UserService } from 'src/app/services/user.service';
import { LogInComponent } from './log-in/log-in.component';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { DriverHomeComponent } from '../driver/driver-home/driver-home.component';
import { FamilyHomeComponent } from '../family/family-home/family-home.component';
import { ManagerHomeComponent } from '../manager/manager-home/manager-home.component';
import { LogInActivate } from './log-in-activate';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WebcamModule } from 'ngx-webcam';
import { PassportCameraComponent } from './sign-up/passport-camera/passport-camera.component';



const USER_ROUTE:Route[]=[
  {path:"user/driver",component:DriverHomeComponent,canActivate:[LogInActivate]},
  {path:"user/manager",component:ManagerHomeComponent,canActivate:[LogInActivate]},
  {path:"user/family",component:FamilyHomeComponent,canActivate:[LogInActivate]},
  {path:"user/signUp/:newEmail/:newPass",component:SignUpComponent,canActivate:[LogInActivate]}
]


@NgModule({
  declarations: [LogInComponent, SignUpComponent,PassportCameraComponent],
  imports: [ReactiveFormsModule,CommonModule,ManagerModule,FamilyModule,DriverModule,RouterModule.forChild(USER_ROUTE),FormsModule,WebcamModule],
  providers:[UserService,LogInActivate]
})
export class UserModule {}
