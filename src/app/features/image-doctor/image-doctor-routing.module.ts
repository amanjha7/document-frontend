import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDoctorComponent } from './image-doctor.component';

const routes: Routes = [{ path: '', component: ImageDoctorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageDoctorRoutingModule { }
