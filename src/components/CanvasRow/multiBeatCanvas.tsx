import p5 from "p5";
import { SingleBeatCanvas } from "./singleBeatCanvas";
import { BalancerProps } from "@components/Balancer";

export class MultiBeatCanvas {
  p5: p5;
  height: number;
  width: number;
  singleBeats: SingleBeatCanvas[];

  constructor(
    p5: p5,
    width: number,
    height: number,
    data: Omit<BalancerProps, "width" | "maxEvents" | "thk">[]
  ) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    this.singleBeats = Array.from({ length: 12 }, (_, i) => {
      return new SingleBeatCanvas({
        p5,
        width: width / 12,
        height,
        leftTopX: i * (width / 12),
        leftTopY: 0,
        supply: data[i].supply,
        demand: data[i].demand,
        events: data[i].events,
      });
    });
  }

  render() {
    this.p5.clear();
    for (let i = 0; i < this.singleBeats.length; i++) {
      this.singleBeats[i].render();
    }
  }
}
