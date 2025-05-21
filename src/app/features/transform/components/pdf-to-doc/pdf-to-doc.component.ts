import { Component } from '@angular/core';
import { TransformService } from '../../services/transform.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Docxtemplater from 'docxtemplater';
import Pizzip from 'pizzip';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-pdf-to-doc',
  standalone: false,
  templateUrl: './pdf-to-doc.component.html',
  styleUrls: ['./pdf-to-doc.component.scss']
})
export class PdfToDocComponent {
selectedFile: File | null = null;
  extractedText: string = '';
  isLoading: boolean = false;
  error: string = '';
  
  // New properties
  editing: boolean = false;
  formattedText: SafeHtml = '';
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['clean']
    ]
  };

  constructor(
    private transformService: TransformService,
    private sanitizer: DomSanitizer
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.extractedText = '';
    this.error = '';
  }

  extractText(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.transformService.ocrExtractText(this.selectedFile)
      .then((res) => {
        this.extractedText = res.text;
        this.isLoading = false;
      })
      .catch((err) => {
        this.error = 'Something went wrong while extracting text.';
        this.isLoading = false;
      });
  }

  toggleEdit() {
    this.editing = !this.editing;
    if (!this.editing) {
      this.formatTextForPreview();
    }
  }

  private formatTextForPreview() {
    // Basic formatting - enhance this based on your OCR results
    const formatted = this.extractedText
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/ {2,}/g, ' &nbsp;');
    this.formattedText = this.sanitizer.bypassSecurityTrustHtml(`<p>${formatted}</p>`);
  }

  downloadDocx() {
    const zip = new Pizzip();
    const doc = new Docxtemplater();
    doc.loadZip(zip);
    
    const content = this.extractedText.replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
    doc.setData({ content: content });
    
    try {
      doc.render();
      const buffer = doc.getZip().generate({ type: 'blob' });
      saveAs(buffer, 'extracted-content.docx');
    } catch (error:any) {
      console.error(error);
      this.error = 'Error generating document: ' + error.message;
    }
  }

  downloadTxt() {
    const blob = new Blob([this.extractedText], { type: 'text/plain' });
    saveAs(blob, 'extracted-content.txt');
  }
}
