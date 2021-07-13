import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidator {

    public static matchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        const hasError: boolean = password && confirmPassword && password.value !== confirmPassword.value;

        return hasError ? { password: true } : null;
    };
}
