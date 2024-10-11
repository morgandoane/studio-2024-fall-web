import p5 from "p5";
import { SingleBeatCanvas } from "./singleBeatCanvas";

export class MultiBeatCanvas {
  p5: p5;
  height: number;
  width: number;
  singleBeats: SingleBeatCanvas[];

  constructor(p5: p5, width: number, height: number) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    this.singleBeats = Array.from({ length: 12 }, (_, i) => {
      return new SingleBeatCanvas(p5, width / 12, height, (i * width) / 12, 0);
    });
  }

  render() {
    for (let i = 0; i < this.singleBeats.length; i++) {
      this.singleBeats[i].render();
    }
  }
}
