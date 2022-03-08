import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPublicStackComponent } from './select-public-stack.component';

describe('SelectPublicStackComponent', () => {
  let component: SelectPublicStackComponent;
  let fixture: ComponentFixture<SelectPublicStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPublicStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPublicStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
