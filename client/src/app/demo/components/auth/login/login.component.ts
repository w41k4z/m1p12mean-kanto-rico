import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { FormContainerComponent } from 'src/app/core/components/form.container.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormContainerComponent {
    public errorMessages: Message[] = [];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
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
                    const accessToken = res.payload?.accessToken;
                    if (accessToken) {
                        this.authService.saveSession(accessToken);
                        this.resetForm();
                        this.authService.redirectToHomePage(this.router);
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this.errorMessages = [];
                    switch (err.status) {
                        case 401:
                            this.errorMessages.push({
                                severity: 'error',
                                summary: 'Authentication error',
                                detail: 'Invalid credentials',
                            });
                            break;
                        case 500:
                            this.errorMessages.push({
                                severity: 'error',
                                summary: 'Server error',
                                detail: 'Uknown internal server error',
                            });
                            break;
                        default:
                            this.errorMessages.push({
                                severity: 'error',
                                summary: '',
                                detail: err.message,
                            });
                            break;
                    }
                },
            });
    }
}
