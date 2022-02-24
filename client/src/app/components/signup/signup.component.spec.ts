// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from 'src/app/services/backend.service';

import { SignupComponent } from './signup.component';

//-------------------------------------------------- Isolated Test (Component Class Logic)

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpTestingController: HttpTestingController;

  //__________

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ SignupComponent ]
    })
    .compileComponents();

    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //__________

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //__________

  const validUser  = { username: 'user', email: 'user@mail.com', password: 'userpassword', confirmPassword: 'userpassword'};
  const blankUser = {  username: '', email: '', password: '', confirmPassword: '' };

  function updateForm(username: string, email: string, password: string, confirmPassword: string) {
    component.signupForm.controls['username'].setValue(username);
    component.signupForm.controls['email'].setValue(email);
    component.signupForm.controls['password'].setValue(password);
    component.signupForm.controls['confirmPassword'].setValue(confirmPassword);
  }

  //__________

  it('Component succesfully created', () => {
    expect(component).toBeTruthy();
  });

    //__________

    it('Component initial state', () => {
      expect(component.submitted).toBeFalsy();
      expect(component.signupForm).toBeDefined();
      expect(component.signupForm.invalid).toBeTruthy();
      expect(component.authError).toBeFalsy();
      expect(component.authErrorMsg).toBeUndefined();
    });
  
    //__________
  
    it('Submitted should be true when onSubmit()', () => {
      component.onSubmit();
      expect(component.submitted).toBeTruthy();
      expect(component.authError).toBeFalsy();
    });
  
    //__________
  
    it('Form value should update when you change the input', (() => {
      updateForm(validUser.username ,validUser.email, validUser.password, validUser.confirmPassword);
      expect(component.signupForm.value).toEqual(validUser);
    }));
  
    //__________
  
    it('Form invalid should be true when the form is invalid', (() => {
      updateForm(blankUser.username, blankUser.email, blankUser.password, blankUser.confirmPassword);
      expect(component.signupForm.invalid).toBeTruthy();
    }));
});

//-------------------------------------------------- Shallow Test (Template Rendering)

describe('SignUpComponent shallow test', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpTestingController: HttpTestingController;

  //__________

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ SignupComponent ]
    })
    .compileComponents();

    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //__________

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //__________

  const validUser  = { username: 'user', email: 'user@mail.com', password: 'userpassword', confirmPassword: 'userpassword'};
  const blankUser = {  username: '', email: '', password: '', confirmPassword: '' };

  function updateForm(username: string, email: string, password: string, confirmPassword: string) {
    component.signupForm.controls['username'].setValue(username);
    component.signupForm.controls['email'].setValue(email);
    component.signupForm.controls['password'].setValue(password);
    component.signupForm.controls['confirmPassword'].setValue(confirmPassword);
  }
  //__________

  it('Form created with email and password inputs, and login button', () => {

    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username');
    const emailContainer = fixture.debugElement.nativeElement.querySelector('#email');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password');
    const confirmPasswordContainer = fixture.debugElement.nativeElement.querySelector('#confirmPassword')
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#button');

    expect(usernameContainer).toBeDefined();
    expect(emailContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(confirmPasswordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  //__________

  it('Display username error message when username is blank', () => {
    updateForm(blankUser.username, validUser.email, validUser.password, validUser.confirmPassword);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#button');
    button.click();
    fixture.detectChanges();

    expect(component.signupForm.get('username')!.errors?.required).toBeTruthy();
  });

  //__________

  it('Display email error message when email is blank', () => {
    updateForm(validUser.email ,blankUser.email, validUser.password, validUser.confirmPassword);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#button');
    button.click();
    fixture.detectChanges();

    expect(component.signupForm.get('email')!.errors?.required).toBeTruthy();
  });

  //__________

  it('Display password error message when both password fields are blank', () => {
    updateForm(validUser.email ,validUser.email, blankUser.password, blankUser.confirmPassword);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    expect(component.signupForm.get('password')!.errors?.required).toBeTruthy();
    expect(component.signupForm.get('confirmPassword')!.errors?.required).toBeTruthy();
  });

  //__________

  it('Display confirmPassword error message when confirm password field is blank', () => {
    updateForm(validUser.email ,validUser.email, validUser.password, blankUser.confirmPassword);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    expect(component.signupForm.get('confirmPassword')!.errors?.required).toBeTruthy();
  });

  //__________

  it('Display password error message when confirm password field is blank', () => {
    updateForm(validUser.email ,validUser.email, blankUser.password, validUser.confirmPassword);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    expect(component.signupForm.get('password')!.errors?.required).toBeTruthy();
  });

  //__________

});

//-------------------------------------------------- Integrated Test (Testing backend service and router to ensure the whole component and dependencies behave correctly)

describe('SignUpComponent integrated testing', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpTestingController: HttpTestingController;

  let service: BackendService;
  let serviceSpy: any;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  //__________

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [ SignupComponent ],
      providers: [
        {
          provide: Router, useValue: routerSpy
        }
      ]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(BackendService);
  });

  //__________

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //__________

  const validUser  = { username: 'user', email: 'user@mail.com', password: 'userpassword', confirmPassword: 'userpassword'};

  function updateForm(username: string, email: string, password: string, confirmPassword: string) {
    component.signupForm.controls['username'].setValue(username);
    component.signupForm.controls['email'].setValue(email);
    component.signupForm.controls['password'].setValue(password);
    component.signupForm.controls['confirmPassword'].setValue(confirmPassword);
  }


    //__________
  
fit('backendService signup() should be called', fakeAsync(() => {
  
    serviceSpy = spyOn(service, 'signup').and.callThrough();

    updateForm(validUser.email ,validUser.email, validUser.password, validUser.confirmPassword);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#button');
    button.click();
    fixture.detectChanges();

    expect(serviceSpy).toHaveBeenCalled();
  }));

});