// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendService } from './backend.service';
import { Login } from '../interfaces/login';

describe('BackendService', () => {
  let service: BackendService,
    httpTestingController: HttpTestingController; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BackendService);

    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Testing login

it('login should return value from observable', 
  (done: DoneFn) => {
    const testData: Login = { UserEmail: 'UserEmail', UserPass: 'UserPass'};

    service.login(testData).subscribe(data => {
      expect(data).toBe('observable value');
      done();
    });
  });

});
