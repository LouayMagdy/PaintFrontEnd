import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeListComponent } from './shape-list.component';

describe('ShapeListComponent', () => {
  let component: ShapeListComponent;
  let fixture: ComponentFixture<ShapeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
