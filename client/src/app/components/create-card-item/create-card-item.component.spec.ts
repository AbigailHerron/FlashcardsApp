import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardItemComponent } from './create-card-item.component';

describe('CreateCardItemComponent', () => {
  let component: CreateCardItemComponent;
  let fixture: ComponentFixture<CreateCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
