// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from 'src/app/services/backend.service';
import { LoginComponent } from './login.component';

//-------------------------------------------------- Isolated Test (Component Class Logic)

describe('LoginComponent isolated test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;

  //__________

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //__________

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //__________

  const validUser  = { email: 'user@mail.com', password: 'userpassword'};
  const blankUser = { email: '', password: ''};

  function updateForm(email: string, password: string) {
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
  }

  //__________

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  //__________

  it('Component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
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
    updateForm(validUser.email, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
  }));

  //__________

  it('Form invalid should be true when the form is invalid', (() => {
    updateForm(blankUser.email, blankUser.password);
    expect(component.loginForm.invalid).toBeTruthy();
  }));
});

//-------------------------------------------------- Shallow Test (Template Rendering)

describe('LoginComponent shallow test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController; 

  //__________

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //__________

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //__________

  const validUser  = { email: 'user@mail.com', password: 'userpassword'};
  const blankUser = { email: '', password: ''};

  function updateForm(email: string, password: string) {
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
  }

  //__________

  it('Form created with email and password inputs, and login button', () => {

    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#email');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#button');

    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  //__________

  it('Display email error message when email is blank', () => {
    updateForm(blankUser.email, validUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#button');
    button.click();
    fixture.detectChanges();

    expect(component.loginForm.get('email')!.errors?.required).toBeTruthy();
  });

  //__________

  it('Display password error message when password is blank', () => {
    updateForm(validUser.email, blankUser.password);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​
    expect(component.loginForm.get('password')!.errors?.required).toBeTruthy();
  });

  //__________

  it('Display both username & password error messages when both fields are blank', () => {
    updateForm(blankUser.email, blankUser.password);
    fixture.detectChanges();
​
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
​

    expect(component.loginForm.get('email')!.errors?.required).toBeTruthy();
    expect(component.loginForm.get('password')!.errors?.required).toBeTruthy();
  });

});

//-------------------------------------------------- Integrated Test (Testing backend service and router to ensure the whole component and dependencies behave correctly)

describe('LoginComponent integrated testing', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController; 

  let service: BackendService;
  let serviceSpy: any;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  //__________

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers: [
        { 
          provide: Router, useValue: routerSpy
        }
      ]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(BackendService);
    serviceSpy = spyOn(service, 'login').and.callThrough();
  });

  //__________

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //__________

  const validUser  = { email: 'user@mail.com', password: 'userpassword'};

  function updateForm(email: string, password: string) {
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
  }

  //__________

  it('backendService login() should be called ', fakeAsync(() => {

    updateForm(validUser.email, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#button');
    button.click();
    fixture.detectChanges();
​
    expect(serviceSpy.login).toHaveBeenCalledTimes(1);
  }));
​
  //__________

  it('Should navigate to home if login is successful', fakeAsync(() => {
    updateForm(validUser.email, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#button');
    button.click();
    advance(fixture);
​
    expect(serviceSpy.login).toHaveBeenCalled();
    advance(fixture);
​
    //const navArgs = routerSpy.navigate.calls.first().args[0];

    // Should redirect to dashboard
    expect(routerSpy.navigate).toEqual(['/dashboard']);
  }));
  
  //__________

  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
});
