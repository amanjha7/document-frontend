// pdf-to-doc.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TransformService } from '../../services/transform.service';

@Component({
  selector: 'app-pdf-to-doc',
  standalone: false,
  templateUrl: './pdf-to-doc.component.html',
  styleUrls: ['./pdf-to-doc.component.scss']
})
export class PdfToDocComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  selectedFile: File | null = null;
  isLoading = false;
  convertedFileUrl: string | null = null;
  errorMessage: string | null = null;
  isDragging = false;

  constructor(private transformService: TransformService) {}

  onFileSelected(event: any): void {
    this.handleFile(event.target.files[0]);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }

  private handleFile(file: File): void {
    if (file.type !== 'application/pdf') {
      this.errorMessage = 'Please select a PDF file';
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      this.errorMessage = 'File size exceeds 50MB limit';
      return;
    }
    
    this.selectedFile = file;
    this.errorMessage = null;
    this.convertedFileUrl = null;
  }

  removeFile(): void {
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
  }

  async convertFile(): Promise<void> {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.errorMessage = null;

    try {
      const convertedFile = await this.transformService.convertPdfToDoc(this.selectedFile);
      this.convertedFileUrl = URL.createObjectURL(convertedFile);
    } catch (error) {
      this.errorMessage = 'Conversion failed. Please try again.';
      console.error('Conversion error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}