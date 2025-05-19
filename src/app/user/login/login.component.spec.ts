import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../user-service/user.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['login']);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('typing an invalid email should show an error message', () => {
    const emailInput = fixture.nativeElement.querySelector(
      '[data-test-id="email-input"]'
    );
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector(
      '[data-test-id="email-error"]'
    );
    expect(errorMessage.textContent).toContain('Please enter a valid email.');
  });

  it('typing a valid email should not show an error message', () => {
    const emailInput = fixture.nativeElement.querySelector(
      '[data-test-id="email-input"]'
    );
    emailInput.value = 'Ahmed@gmail.com';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector(
      '[data-test-id="email-error"]'
    );
    expect(errorMessage).toBeNull();
  });

  it('leaving the email input empty should show an error message', () => {
    const emailInput = fixture.nativeElement.querySelector(
      '[data-test-id="email-input"]'
    );
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector(
      '[data-test-id="email-error"]'
    );
    expect(errorMessage.textContent).toContain('Email is required.');
  });

  it('typing a valid password should not show an error message', () => {
    const passwordInput = fixture.nativeElement.querySelector(
      '[data-test-id="password-input"]'
    );
    passwordInput.value = 'validPassword123';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector(
      '[data-test-id="password-error"]'
    );
    expect(errorMessage).toBeNull();
  });
  it('leaving the password input empty should show an error message', () => {
    const passwordInput = fixture.nativeElement.querySelector(
      '[data-test-id="password-input"]'
    );
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector(
      '[data-test-id="password-error"]'
    );
    expect(errorMessage.textContent).toContain('Password is required.');
  });

  it('should call userService.login() on valid form submit', () => {
    userServiceSpy.login.and.returnValue(of({}));
    const emailInput = fixture.nativeElement.querySelector(
      '[data-test-id="email-input"]'
    );
    const passwordInput = fixture.nativeElement.querySelector(
      '[data-test-id="password-input"]'
    );
    emailInput.value = 'Ahmed@gmail.com';
    passwordInput.value = 'validPassword123';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const loginButton = fixture.nativeElement.querySelector(
      '[data-test-id="login-button"]'
    ) as HTMLButtonElement;
    loginButton.click();
    expect(userServiceSpy.login).toHaveBeenCalledWith({
      email: 'Ahmed@gmail.com',
      password: 'validPassword123',
    });
  });

  it('should show error message on invalid login', () => {
    userServiceSpy.login.and.returnValue(
      throwError(() => new Error('Invalid email or password!'))
    );
    const emailInput = fixture.nativeElement.querySelector(
      '[data-test-id="email-input"]'
    );
    const passwordInput = fixture.nativeElement.querySelector(
      '[data-test-id="password-input"]'
    );
    emailInput.value = 'Ahmed@gmail.com';
    passwordInput.value = 'validPassword123';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const loginButton = fixture.nativeElement.querySelector(
      '[data-test-id="login-button"]'
    ) as HTMLButtonElement;
    loginButton.click();
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector(
      '[data-test-id="error-message"]'
    );
    expect(errorMessage.textContent).toContain('Invalid email or password!');
  });
});
