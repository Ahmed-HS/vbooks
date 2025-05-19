import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { UserService } from '../user-service/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['signup']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignupComponent],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SignupComponent);
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

  it('typing a password less than 6 characters should show an error message', () => {
    const passwordInput = fixture.nativeElement.querySelector(
      '[data-test-id="password-input"]'
    );
    passwordInput.value = '12345';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector(
      '[data-test-id="password-error"]'
    );
    expect(errorMessage.textContent).toContain(
      'Password must be at least 6 characters long.'
    );
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

  it('should show an error message if passwords do not match', () => {
    const passwordInput = fixture.nativeElement.querySelector(
      '[data-test-id="password-input"]'
    );
    const confirmPasswordInput = fixture.nativeElement.querySelector(
      '[data-test-id="confirm-password-input"]'
    );
    passwordInput.value = 'password123';
    confirmPasswordInput.value = 'differentPassword123';
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector(
      '[data-test-id="confirm-password-error"]'
    );
    expect(errorMessage.textContent).toContain('Passwords do not match.');
  });

  it('should not show an error message if passwords match', () => {
    const passwordInput = fixture.nativeElement.querySelector(
      '[data-test-id="password-input"]'
    );
    const confirmPasswordInput = fixture.nativeElement.querySelector(
      '[data-test-id="confirm-password-input"]'
    );
    passwordInput.value = 'password123';
    confirmPasswordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector(
      '[data-test-id="confirm-password-error"]'
    );
    expect(errorMessage).toBeNull();
  });

  it('should call the signup method of UserService on form submission', () => {
    userServiceSpy.signup.and.returnValue(of({}));
    const emailInput = fixture.nativeElement.querySelector(
      '[data-test-id="email-input"]'
    );
    const passwordInput = fixture.nativeElement.querySelector(
      '[data-test-id="password-input"]'
    );
    const confirmPasswordInput = fixture.nativeElement.querySelector(
      '[data-test-id="confirm-password-input"]'
    );
    emailInput.value = 'Ahmed@gmail.com';
    passwordInput.value = 'validPassword123';
    confirmPasswordInput.value = 'validPassword123';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const signupButton = fixture.nativeElement.querySelector(
      '[data-test-id="signup-button"]'
    );
    signupButton.click();
    expect(userServiceSpy.signup).toHaveBeenCalledWith({
      email: 'Ahmed@gmail.com',
      password: 'validPassword123',
    });
  });
});
