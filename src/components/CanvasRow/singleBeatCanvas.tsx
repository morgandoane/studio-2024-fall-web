import p5 from "p5";

export class SingleBeatCanvas {
  p5: p5;
  height: number;
  width: number;
  leftTopX: number;
  leftTopY: number;
  supply: number;
  demand: number;
  events: number;
  amplitude: number;
  frequency: number;

  constructor({
    p5,
    width,
    height,
    leftTopX,
    leftTopY,
    supply,
    demand,
    events,
  }: {
    p5: p5;
    width: number;
    height: number;
    leftTopX: number;
    leftTopY: number;
    supply: number;
    demand: number;
    events: number;
  }) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    this.leftTopX = leftTopX;
    this.leftTopY = leftTopY;
    this.supply = supply;
    this.demand = demand;
    this.events = events;
    this.amplitude = this.height / 2 - this.height / 10;
    this.frequency = 0.01;
    console.log(leftTopX, leftTopY, width, height);
  }

  render() {
    // draw a heart beat
    // It should be like - ^ -
    // this.p5.fill(255);
    // this.p5.rect(this.leftTopX, this.leftTopY, this.width, this.height);
    // this.p5.clear();
    this.p5.line(
      this.leftTopX,
      this.leftTopY + this.height / 2,
      this.leftTopX + this.width / 4,
      this.leftTopY + this.height / 2
    );
    this.p5.stroke(255);
    this.p5.strokeWeight(2);
  }
}
