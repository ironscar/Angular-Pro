import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

const HIGHLIGHT = 'highlight';
const IN = 'in';
const NORMAL = 'normal';
const SHRUNKEN = 'shrunken';

@Component({
	selector: 'app-angular-anims',
	templateUrl: './angular-anims.component.html',
	styleUrls: ['./angular-anims.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('divState', [
			state(
				NORMAL,
				style({
					'background-color': 'red',
					transform: 'translateX(0)'
				})
			),
			state(
				HIGHLIGHT,
				style({
					'background-color': 'blue',
					transform: 'translateX(300px)'
				})
			),
			transition(NORMAL + ' <=> ' + HIGHLIGHT, animate(2000))
		]),
		trigger('firstList', [
			state(
				IN,
				style({
					opacity: 1
				})
			),
			// use * with void (as IN is a dummy and we just need some transition to occur)
			transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateX(-100px)'
				}),
				animate(1000)
			]),
			transition('* => void', [
				group([
					animate(
						300,
						style({
							color: 'red'
						})
					),
					animate(
						1000,
						style({
							opacity: 0,
							transform: 'translateX(100px)'
						})
					)
				])
			])
		]),
		trigger('secondList', [
			state(
				IN,
				style({
					opacity: 1,
					transform: 'translateX(0px)'
				})
			),
			transition(
				'void => *',
				animate(
					1500,
					keyframes([
						style({
							opacity: 0,
							transform: 'translateX(-100px)',
							offset: 0
						}),
						style({
							opacity: 0.5,
							transform: 'translateX(50px)',
							offset: 0.5
						}),
						style({
							opacity: 1,
							transform: 'translateX(0px)',
							offset: 1
						})
					])
				)
			),
			transition(
				'* => void',
				animate(
					1500,
					keyframes([
						style({
							opacity: 1,
							transform: 'translateX(0px)',
							offset: 0
						}),
						style({
							opacity: 0.5,
							transform: 'translateX(100px)',
							offset: 0.5
						})
					])
				)
			)
		]),
		trigger('complexState', [
			state(
				NORMAL,
				style({
					'background-color': 'red',
					transform: 'translateX(0) scaleX(1)'
				})
			),
			state(
				SHRUNKEN,
				style({
					'background-color': 'green',
					transform: 'translateX(100px) scaleX(0.5)'
				})
			),
			state(
				HIGHLIGHT,
				style({
					'background-color': 'blue',
					transform: 'translateX(300px) scaleX(1)'
				})
			),
			transition(NORMAL + ' => ' + HIGHLIGHT, animate(1000)),
			transition(HIGHLIGHT + ' => ' + NORMAL, animate(3000)),
			transition(SHRUNKEN + ' <=> *', [
				style({
					'background-color': 'orange',
					'border-radius': '0px'
				}),
				// 1000ms to change border-radius to 50px
				animate(
					1000,
					style({
						'border-radius': '50px'
					})
				),
				// 500 ms for the rest to transition from intermediate style to end state
				animate(500)
			])
		])
	]
})
export class AngularAnimsComponent implements OnInit {
	items: string[] = ['Milk', 'Sugar', 'Bread'];
	animState = NORMAL;
	complexAnimState = NORMAL;

	@ViewChild('itemInput') itemInput: ElementRef;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit() {}

	onMultipleStateControl() {
		this.onAnimate();
		setTimeout(() => {
			this.onShrink();
			this.cdr.detectChanges();
		}, 1000);
		setTimeout(() => {
			this.onAnimate();
			this.cdr.detectChanges();
		}, 3000);
	}

	onAddItem() {
		const input = this.itemInput.nativeElement as HTMLInputElement;
		this.items.push(input.value);
		input.value = '';
	}

	onRemoveItem(index: number) {
		this.items.splice(index, 1);
	}

	onAnimate() {
		this.animState = this.animState === NORMAL ? HIGHLIGHT : NORMAL;
		this.complexAnimState = this.complexAnimState === NORMAL ? HIGHLIGHT : NORMAL;
	}

	onShrink() {
		this.complexAnimState = SHRUNKEN;
	}

	onAnimationEvent(ev: Event, type: string) {
		console.log(type, ev);
	}
}

/**
 * animations is a property of component which is an array of trigger functions which takes a name & array of metadata
 * the metadata is an array of state functions and transition functions
 * all the value of the states are the ones ideally stored in a property of the component
 * transition function takes a string specifying the transition between which states separated by '=>' or '<=>'
 * '<=>' means the reverse transition should happen with the same time as the normal transition
 * it also takes an animate function which in most basic case takes time as a parameter
 * '*' can be used to specify transitions to/from any state as shown
 * complex transitions can be specified by letting the transition function take its own styles
 * moreover, animation functions can also take styles and specify time to get to that
 * more complex state transitions can be done by flipping states directly or with specific timeouts sequentially
 * this can also be done by the keyframes function shown in second list where each style is specified by a fraction offset
 * onPush will require detectChanges inside each timeout to trigger the animation
 * the void state is reserved and specifies a state that wasn't specified - like for adding/deleting here
 * the group function will execute animations with same or different times in parallel instead of sequentially as normally happens
 * CAVEAT: try to define all styles in initial state which are changed in intermediate styles for it to specify defaults properly
 * CAVEAT: angular animations are JS based and may eat performance during other JS stuff than a CSS one which are on seperate browser thread
 * CAVEAT: Generally try to follow with keyframes as that's the most understandable and use groups for parallel animations
 * Only use for really complex anims when using CSS requires too much code, but prefer CSS when possible
 */
