import p5 from "p5";

export class SingleBeatCanvas {
  p5: p5;
  height: number;
  width: number;
  leftTopX: number;
  leftTopY: number;

  constructor(
    p5: p5,
    width: number,
    height: number,
    leftTopX: number,
    leftTopY: number
  ) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    this.leftTopX = leftTopX;
    this.leftTopY = leftTopY;
  }

  render() {
    this.p5.fill(255);
    this.p5.rect(this.leftTopX, this.leftTopY, this.width, this.height);
  }
}
