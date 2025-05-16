import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfToDocComponent } from './pdf-to-doc.component';

describe('PdfToDocComponent', () => {
  let component: PdfToDocComponent;
  let fixture: ComponentFixture<PdfToDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfToDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfToDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
