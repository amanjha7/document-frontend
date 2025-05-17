import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  standalone:false,
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  editors: Editor[] = [];
  pages: string[] = [];
  currentPageIndex = 0;
  isAnimating = false;

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right'],
    ['undo', 'redo'],
    ['superscript', 'subscript', 'horizontal_rule'],
    ['align_justify','format_clear','outdent','link','code']
  ];

  viewMode: 'book' | 'normal' = 'book';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.pages = ['', '']; // Start with two empty pages
    // Create 2 editors for book view, 1 for normal view
    this.editors = [new Editor(), new Editor()];
  }

  ngOnDestroy() {
    this.editors.forEach(e => e.destroy());
  }

  toggleView() {
    this.viewMode = this.viewMode === 'book' ? 'normal' : 'book';
    if (this.viewMode === 'normal' && this.editors.length > 1) {
      // In normal view, only one editor needed
      this.editors[1].destroy();
      this.editors = [this.editors[0]];
    } else if (this.viewMode === 'book' && this.editors.length === 1) {
      // Back to book view, recreate second editor if missing
      this.editors.push(new Editor());
    }
  }

  nextPage() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    if (this.currentPageIndex + 2 >= this.pages.length) {
      this.pages.push('', '');
    }
    this.currentPageIndex += 2;

    // no need to recreate editors, just update view
    setTimeout(() => {
      this.isAnimating = false;
      this.cdr.detectChanges();
    }, 400);
  }

  prevPage() {
    if (this.isAnimating || this.currentPageIndex === 0) return;
    this.isAnimating = true;
    this.currentPageIndex -= 2;

    setTimeout(() => {
      this.isAnimating = false;
      this.cdr.detectChanges();
    }, 400);
  }

  getPageNumber(pageIndex: number): number {
    return pageIndex + 1;
  }
}
