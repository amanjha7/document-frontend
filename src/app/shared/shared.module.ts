import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { DragDropDirective } from './directives/drag-drop.directive';



@NgModule({
  declarations: [
    ButtonComponent,
    FileSizePipe,
    DragDropDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
