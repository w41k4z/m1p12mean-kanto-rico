import { FormGroup } from '@angular/forms';

export class FormContainerComponent {
    public componentForm: FormGroup;

    protected constructor(formGroup: FormGroup) {
        this.componentForm = formGroup;
    }

    isFieldInvalid(field: string): boolean {
        const control = this.componentForm.get(field);
        return (
            !!control && control.invalid && (control.dirty || control.touched)
        );
    }

    get f() {
        return this.componentForm.controls;
    }

    resetForm() {
        this.componentForm.reset();
    }

    onSubmit() {
        console.log('Confirm method to implement');
    }

    submit() {
        if (this.componentForm.invalid) {
            return;
        }
        this.onSubmit();
    }
}
