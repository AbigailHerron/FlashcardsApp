// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCardItemComponent } from './create-card-item.component';

describe('CreateCardItemComponent', () => {
  let component: CreateCardItemComponent;
  let fixture: ComponentFixture<CreateCardItemComponent>;
  let httpTestingController: HttpTestingController; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CreateCardItemComponent ]
    })
    .compileComponents();

    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
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
