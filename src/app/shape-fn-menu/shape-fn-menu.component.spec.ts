import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeFnMenuComponent } from './shape-fn-menu.component';

describe('ShapeFnMenuComponent', () => {
  let component: ShapeFnMenuComponent;
  let fixture: ComponentFixture<ShapeFnMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeFnMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeFnMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
