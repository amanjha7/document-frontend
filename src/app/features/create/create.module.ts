import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { EditorComponent } from './pages/editor/editor.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    EditorComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    NgxEditorModule,
    FormsModule
  ]
})
export class CreateModule { }
