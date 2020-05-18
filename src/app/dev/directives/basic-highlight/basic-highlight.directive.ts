import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[appBasicighlight]'
})
export class BasicHighLightDirective implements OnInit {
	@Input() defaultColor = 'transparent';
	@Input() hoverColor = 'green';

	@HostBinding('style.backgroundColor') backgroundColor = this.defaultColor;

	constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	ngOnInit() {
		this.backgroundColor = this.defaultColor;
	}

	@HostListener('mouseenter') mouseover() {
		this.backgroundColor = this.hoverColor;
		this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
	}

	@HostListener('mouseleave') mouseleave() {
		this.backgroundColor = this.defaultColor;
		this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
	}
}
