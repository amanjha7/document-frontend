import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransformRoutingModule } from './transform-routing.module';
import { TransformComponent } from './transform.component';
import { TransformHomeComponent } from './pages/transform-home/transform-home.component';
import { DocToPdfComponent } from './components/doc-to-pdf/doc-to-pdf.component';
import { PdfToDocComponent } from './components/pdf-to-doc/pdf-to-doc.component';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';


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
    FileSizePipe
  ]
})
export class TransformModule { }
