import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCardStackComponent } from './select-card-stack.component';

describe('SelectCardStackComponent', () => {
  let component: SelectCardStackComponent;
  let fixture: ComponentFixture<SelectCardStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCardStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCardStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
