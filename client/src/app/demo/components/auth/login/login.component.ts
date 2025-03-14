import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormContainerComponent } from 'src/app/core/components/form.container.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormContainerComponent {
    protected errorSubject = new BehaviorSubject<string | null>(null);
    public error$ = this.errorSubject.asObservable();

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService
    ) {
        super(
            new FormGroup({
                email: new FormControl('', [
                    Validators.required,
                    Validators.email,
                ]),
                password: new FormControl('', [Validators.required]),
            })
        );
    }

    override onSubmit(): void {
        const formData = this.componentForm.value;
        this.authService
            .authenticate(formData.email, formData.password)
            .subscribe({
                next: (res) => {
                    console.log('Login response:', res);
                    this.resetForm();
                },
                error: (err: HttpErrorResponse) => {
                    console.error('Login error:', err);
                    switch (err.status) {
                        case 401:
                            this.errorSubject.next('Invalid credentials');
                            break;
                        case 500:
                            this.errorSubject.next(
                                'An error occurred on the server'
                            );
                            break;
                        default:
                            this.errorSubject.next(err.message);
                            break;
                    }
                    // wait 5 seconds before clearing the error message
                    setTimeout(() => {
                        this.errorSubject.next(null);
                    }, 5000);
                },
            });
    }
}
