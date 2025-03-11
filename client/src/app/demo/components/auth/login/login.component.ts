import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    loginForm: FormGroup;

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const formData = this.loginForm.value;
            console.log('Login data:', formData);
            // Here you would typically call your authentication service
        }
    }

    isFieldInvalid(field: string): boolean {
        const control = this.loginForm.get(field);
        return (
            !!control && control.invalid && (control.dirty || control.touched)
        );
    }

    getErrorMessage(field: string): string {
        const control = this.loginForm.get(field);

        if (control?.hasError('required')) {
            return 'This field is required';
        }

        if (control?.hasError('email')) {
            return 'Please enter a valid email address';
        }

        if (control?.hasError('minlength')) {
            return `Password must be at least ${control.errors?.['minlength'].requiredLength} characters`;
        }

        return '';
    }
}
