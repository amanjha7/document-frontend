// transform.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransformService {
  private baseUrl = environment.apiUrl;
  private apiUrl = '/convert-pdf-to-docx';

  constructor(private http: HttpClient) { }

  async convertPdfToDoc(file: File): Promise<Blob> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.http.post(`${this.baseUrl}${this.apiUrl}`, formData, {
      responseType: 'blob'
    }).toPromise();

    return response as Blob;
  }
}