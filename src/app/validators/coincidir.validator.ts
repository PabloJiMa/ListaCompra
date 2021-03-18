import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function DebeCoincidir(nombreControl: string, nombreControlCoincidir: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[nombreControl];
        const matchingControl = formGroup.controls[nombreControlCoincidir];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ debeCoincidir: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

