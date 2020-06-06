import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
	// template form variables
	nameInput = 'Sasha';
	genders = ['male', 'female', 'others'];
	secretInput = 'pet';
	@ViewChild('templateForm') templateForm: NgForm;

	// reactive form variables
	nameInput2 = 'Lana';
	secretInput2 = 'maiden';
	forbiddenUserNames = ['Chris', 'Anna'];
	forbiddenUserNamesAsync = ['David', 'Brianna'];
	reactiveForm: FormGroup;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.createReactiveForm();
	}

	onTemplateFormSubmit() {
		console.log('tempalte form submitted');
		console.log(this.templateForm.form);
	}

	onTemplateFormReset() {
		this.templateForm.resetForm();
		console.log(this.templateForm.form);
		this.templateForm.form.controls.secret.setValue(this.secretInput);
	}

	createReactiveForm() {
		this.reactiveForm = new FormGroup({
			userDetails: new FormGroup({
				username: new FormControl(
					this.nameInput2,
					[Validators.required, this.forbiddenNames.bind(this)],
					this.forbiddenNamesAsync.bind(this)
				),
				usermail: new FormControl(null, [Validators.required, Validators.email]),
				sex: new FormControl(this.genders[0], Validators.required)
			}),
			hobbies: new FormArray([]),
			usersecret: new FormControl(this.secretInput2, Validators.required)
		});
		this.reactiveForm.statusChanges.subscribe(() => {
			this.cdr.detectChanges();
		});
	}

	addControlToReactiveForm() {
		const control = new FormControl(null, Validators.required);
		(this.reactiveForm.get('hobbies') as FormArray).push(control);
	}

	getReactiveFormArray() {
		return (this.reactiveForm.get('hobbies') as FormArray).controls;
	}

	forbiddenNames(control: FormControl): { nameIsForbidden: boolean } {
		// custom validator for name
		if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
			return { nameIsForbidden: true };
		}
		return null;
	}

	forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
		return new Promise<any>(resolve => {
			setTimeout(() => {
				if (this.forbiddenUserNamesAsync.indexOf(control.value) !== -1) {
					resolve({ asyncNameForbidden: true });
				} else {
					resolve(null);
				}
			}, 2000);
		});
	}

	submitReactiveForm() {
		console.log(this.reactiveForm);
	}

	resetReactiveForm() {
		this.reactiveForm.reset();
		this.reactiveForm.get('usersecret').setValue('maiden');
	}
}

/**
 * ngModelGroup groups the controls as well as the values inside form object
 * this group has its own validity checks
 * a custom validator must return null if nothing is wrong
 * when added to the formControl constuctor, bind (this) to it
 * each control will have its own error code when its in that state
 * use status changes with change detector ref to react to async validators
 */
