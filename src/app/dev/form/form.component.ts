import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
	@ViewChild('templateForm') templateForm: NgForm;

	constructor() {}

	ngOnInit() {}

	onTemplateFormSubmit() {
		console.log('tempalte form submitted');
		console.log(this.templateForm.form);
	}
}
