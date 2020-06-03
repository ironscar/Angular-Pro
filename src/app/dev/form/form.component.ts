import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

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
	reactiveForm: FormGroup;

	constructor() {}

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
			username: new FormControl(this.nameInput2),
			usermail: new FormControl(null),
			sex: new FormControl(this.genders[0]),
			usersecret: new FormControl(this.secretInput2)
		});
	}

	submitReactiveForm() {
		console.log(this.reactiveForm);
	}
}

/**
 * ngModelGroup groups the controls as well as the values inside form object
 * this group has its own validity checks
 */
