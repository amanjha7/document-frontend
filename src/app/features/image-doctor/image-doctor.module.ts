import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageDoctorRoutingModule } from './image-doctor-routing.module';
import { ImageDoctorComponent } from './image-doctor.component';
import { ImageEditorComponent } from './pages/image-editor/image-editor.component';
import { ResizeComponent } from './components/resize/resize.component';
import { AnnotateComponent } from './components/annotate/annotate.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImageDoctorComponent,
    ImageEditorComponent,
    ResizeComponent,
    AnnotateComponent
  ],
  imports: [
    CommonModule,
    ImageDoctorRoutingModule,
    FormsModule
  ]
})
export class ImageDoctorModule { }
