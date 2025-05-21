import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransformRoutingModule } from './transform-routing.module';
import { TransformComponent } from './transform.component';
import { TransformHomeComponent } from './pages/transform-home/transform-home.component';
import { DocToPdfComponent } from './components/doc-to-pdf/doc-to-pdf.component';
import { PdfToDocComponent } from './components/pdf-to-doc/pdf-to-doc.component';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransformComponent,
    TransformHomeComponent,
    DocToPdfComponent,
    PdfToDocComponent,
  ],
  imports: [
    CommonModule,
    TransformRoutingModule,
    FileSizePipe,
    QuillModule.forRoot(),
    HttpClientModule,
    FormsModule
  ]
})
export class TransformModule { }
