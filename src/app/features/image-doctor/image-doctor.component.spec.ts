import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDoctorComponent } from './image-doctor.component';

describe('ImageDoctorComponent', () => {
  let component: ImageDoctorComponent;
  let fixture: ComponentFixture<ImageDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
