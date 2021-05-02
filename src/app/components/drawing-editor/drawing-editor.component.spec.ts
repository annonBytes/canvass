import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingEditorComponent } from './drawing-editor.component';

describe('DrawingEditorComponent', () => {
  let component: DrawingEditorComponent;
  let fixture: ComponentFixture<DrawingEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
