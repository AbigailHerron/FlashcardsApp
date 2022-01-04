import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStackComponent } from './view-stack.component';

describe('ViewStackComponent', () => {
  let component: ViewStackComponent;
  let fixture: ComponentFixture<ViewStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
