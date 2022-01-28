import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStackMenuComponent } from './view-stack-menu.component';

describe('ViewStackMenuComponent', () => {
  let component: ViewStackMenuComponent;
  let fixture: ComponentFixture<ViewStackMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStackMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStackMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
