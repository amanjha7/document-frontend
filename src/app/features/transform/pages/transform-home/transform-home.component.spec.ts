import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformHomeComponent } from './transform-home.component';

describe('TransformHomeComponent', () => {
  let component: TransformHomeComponent;
  let fixture: ComponentFixture<TransformHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransformHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransformHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
