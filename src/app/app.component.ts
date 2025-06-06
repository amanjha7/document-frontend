import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Required
  imports: [
    RouterOutlet,
    RouterModule,
    HttpClientModule // ✅ Required here or in main.ts bootstrap
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'document-service-frontend';
}
