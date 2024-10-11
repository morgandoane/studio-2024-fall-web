import p5 from 'p5';

export class HeartbeatRenderer {
	p5: p5;
	height: number;
	width: number;
	constructor(p5: p5, width: number, height: number) {
		this.p5 = p5;
		this.width = width;
		this.height = height;
		this.setup = p5.setup.bind(this);
		this.draw = p5.draw.bind(this);
	}

	// set width(width: number) {
	//   this.width = width;
	// }

	setup() {
		console.log('hi');
		console.log(this.width, this.height);
	}

	draw() {
		this.p5.background(0);
		this.p5.fill(255);
		this.p5.ellipse(250, 250, 50, 50);
		console.log('hiihi');
	}
}
