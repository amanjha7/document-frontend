import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocToPdfComponent } from './doc-to-pdf.component';

describe('DocToPdfComponent', () => {
  let component: DocToPdfComponent;
  let fixture: ComponentFixture<DocToPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocToPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
