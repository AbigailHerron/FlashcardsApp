// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewStackComponent } from './view-stack.component';

// https://stackoverflow.com/questions/41019109/error-no-provider-for-router-while-writing-karma-jasmine-unit-test-cases

describe('ViewStackComponent', () => {
  let component: ViewStackComponent;
  let fixture: ComponentFixture<ViewStackComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ViewStackComponent ]
    })
    .compileComponents();

        // Inject the http service and test controller for each test
        httpTestingController = TestBed.inject(HttpTestingController);
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
