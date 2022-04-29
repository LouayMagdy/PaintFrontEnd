import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasElementComponent } from './canvas-element.component';

describe('CanvasElementComponent', () => {
  let component: CanvasElementComponent;
  let fixture: ComponentFixture<CanvasElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
