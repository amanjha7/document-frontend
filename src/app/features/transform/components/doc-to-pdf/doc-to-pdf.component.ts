// doc-to-pdf.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { TransformService } from '../../services/transform.service';

@Component({
  selector: 'app-doc-to-pdf',
  standalone: false,
  templateUrl: './doc-to-pdf.component.html',
  styleUrls: ['./doc-to-pdf.component.scss']
})
export class DocToPdfComponent {
  isDragging = false;
  selectedFile: File | null = null;
  statusMessage = '';
  statusType: 'success' | 'error' | null = null;

  // Supported MIME types
  readonly supportedTypes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text',
    'application/rtf'
  ];

  constructor(private apiService:ApiService, private transformService: TransformService){}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    
    if (event.dataTransfer?.files) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File) {
    if (this.validateFile(file)) {
      this.selectedFile = file;
      this.statusMessage = '';
      this.statusType = null;
    }
  }

  private validateFile(file: File): boolean {
    if (!this.supportedTypes.includes(file.type)) {
      this.showError('Unsupported file type. Please upload a valid document.');
      return false;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      this.showError('File size exceeds maximum limit of 50MB');
      return false;
    }

    return true;
  }

  clearFile() {
    this.selectedFile = null;
  }

  // convertToPdf() {
  //   if (!this.selectedFile) return;

  //   // Add your conversion logic here
  //   this.showSuccess('Conversion started...');
  //   console.log('Converting:', this.selectedFile);
  // }

  convertToPdf() {
    if (!this.selectedFile) return;

    this.apiService.convertDocToPdf(this.selectedFile).subscribe({
      next: (data) => {
        this.showSuccess('Conversion complete! Click below to download.');
        this.statusMessage += ` Download will expire in 2 minutes.`;

        const downloadUrl = this.apiService.getDownloadUrl(data.id);
        window.open(downloadUrl, '_blank');
      },
      error: () => {
        this.showError('Conversion failed. Please try again.');
      }
    });
  }

  private showError(message: string) {
    this.statusMessage = message;
    this.statusType = 'error';
  }

  private showSuccess(message: string) {
    this.statusMessage = message;
    this.statusType = 'success';
  }
}