import { Directive, ElementRef, Renderer2, Input, OnChanges } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective implements OnChanges {
	@Input() dropdownVisible = false;
	@Input() dropdownCloseClass: string;

	constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	ngOnChanges() {
		if (this.dropdownVisible) {
			this.renderer.removeClass(this.elementRef.nativeElement, this.dropdownCloseClass);
		} else {
			this.renderer.addClass(this.elementRef.nativeElement, this.dropdownCloseClass);
		}
	}
}
