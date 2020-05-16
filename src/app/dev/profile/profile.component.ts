import {
	Component,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef,
	ChangeDetectionStrategy,
	OnInit,
	OnChanges,
	AfterContentInit,
	AfterContentChecked,
	AfterViewInit,
	AfterViewChecked,
	OnDestroy,
	SimpleChanges,
	Input,
	DoCheck,
	ContentChild
} from '@angular/core';

@Component({
	selector: 'app-profile',
	// selector: '[app-profile]',
	// selector: '.app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent
	implements OnChanges, OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
	@Input() profileName = 'Profile Default';
	@Output() profileUpdate = new EventEmitter<string>();
	// use static true if using in ngOnInit, else leave as is
	@ViewChild('profileInput', { static: true }) profileInput: ElementRef;
	@ContentChild('mid', { static: true }) midSlot: ElementRef;
	@ContentChild('end', { static: true }) endSlot: ElementRef;

	constructor() {
		console.clear();
		console.log('constructor');
	}

	ngOnChanges(changes: SimpleChanges) {
		// only life cycle hook that takes an attribute
		console.log('changes');
		console.log(changes);
	}

	ngOnInit() {
		console.log('init');
		console.log(this.profileInput.nativeElement.value);
		console.log(this.midSlot.nativeElement.textContent);
		console.log(this.endSlot.nativeElement.textContent);
	}

	ngAfterContentInit() {
		console.log('content init');
	}

	ngAfterContentChecked() {
		console.log('content checked');
	}

	ngAfterViewInit() {
		console.log('view init');
		console.log(this.profileInput.nativeElement.value);
	}

	ngAfterViewChecked() {
		console.log('view checked');
	}

	ngOnDestroy() {
		console.log('destroy');
	}

	updateProfileName() {
		this.profileName = this.profileInput.nativeElement.value;
		this.profileUpdate.emit(this.profileName);
	}
}

/** Use selector as:
 * - element
 * - attribute
 * - class
 */
