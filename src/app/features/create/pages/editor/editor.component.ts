import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  standalone: false,
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  editor!: Editor;
  html: string = '';
  viewMode: 'book' | 'normal' = 'book';

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right'],
    ['undo', 'redo'],
  ];

  ngOnInit(): void {
    this.editor = new Editor();
  }

  toggleView() {
    this.viewMode = this.viewMode === 'book' ? 'normal' : 'book';
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
