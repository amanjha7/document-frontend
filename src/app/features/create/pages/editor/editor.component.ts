import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

// Add a module declaration for untyped module


@Component({
  selector: 'app-editor',
  standalone:false,
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  editors: Editor[] = [];
  pages: string[] = [];
  pageLabels: string[] = [];
  isPdfReady: boolean = true;

  activeEditor!: Editor;

  @ViewChildren('pageElement', { read: ElementRef }) pageElements!: QueryList<ElementRef>;

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
    ['align_justify', 'format_clear', 'outdent', 'link', 'code']
  ];

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit() {
    this.addPage(); // one initial page
  }

  ngAfterViewInit() {
    this.observeOverflow();
  }

  ngOnDestroy() {
    this.editors.forEach(editor => editor.destroy());
  }

  addPage() {
    const editor = new Editor();
    this.editors.push(editor);
    this.pages.push('');
    this.pageLabels.push('');
    this.setActiveEditor(editor);
  }

  setActiveEditor(editor: Editor) {
    this.activeEditor = editor;
  }

  observeOverflow() {
    const observer = new ResizeObserver(() => {
      this.pageElements.forEach((pageRef, i) => {
        const page = pageRef.nativeElement;
        if (page.scrollHeight > page.clientHeight && i === this.pages.length - 1) {
          this.addPage();
        }
      });
    });

    this.pageElements.forEach(pageRef => observer.observe(pageRef.nativeElement));
  }

  onPageInput(index: number) {
  setTimeout(() => {
    const pageElement = this.pageElements.toArray()[index].nativeElement;
    const content = pageElement.querySelector('.page-content');

    const scrollHeight = content.scrollHeight;
    const clientHeight = content.clientHeight;

    // Threshold of 20px to avoid premature triggering
    if (scrollHeight >= clientHeight - 20 && index === this.pages.length - 1) {
      this.addPage();
      this.cdr.detectChanges();
    }
  }, 100);
}

  downloadPdf() {
     const element = document.getElementById('printArea');
      if (!element) return;

      const htmlContent = element.innerHTML;

      this.http.post('http://localhost:5000/api/create/generate-pdf', { htmlContent }, { responseType: 'blob' })
        .subscribe(blob => {
          saveAs(blob, 'document.pdf');
        }, err => {
          console.error('PDF download failed', err);
        });
  }
}
