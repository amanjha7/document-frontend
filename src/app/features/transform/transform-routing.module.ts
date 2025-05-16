// src/app/features/transform/transform-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransformComponent } from './transform.component';
import { PdfToDocComponent } from './components/pdf-to-doc/pdf-to-doc.component';
import { DocToPdfComponent } from './components/doc-to-pdf/doc-to-pdf.component';

const routes: Routes = [
  { path: '', component: TransformComponent,
  children: [
    {
      path: 'pdf-doc',
      component: PdfToDocComponent
    },
        {
      path: 'doc-pdf',
      component: DocToPdfComponent
    },
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransformRoutingModule {}
