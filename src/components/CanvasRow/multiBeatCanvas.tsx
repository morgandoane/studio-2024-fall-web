import p5 from "p5";
import { SingleBeatCanvas } from "./singleBeatCanvas";
import { BalancerProps } from "@components/Balancer";

export class MultiBeatCanvas {
  p5: p5;
  height: number;
  width: number;
  singleBeats: SingleBeatCanvas[];
  data: Omit<BalancerProps, "width" | "maxEvents" | "thk">[];
  animationTotalFrameRate: number = 1000;

  constructor(
    p5: p5,
    width: number,
    height: number,
    data: Omit<BalancerProps, "width" | "maxEvents" | "thk">[]
  ) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    const maxSupply = Math.max(...data.map((b) => b.supply));
    const minSupply = Math.min(...data.map((b) => b.supply));
    const maxDemand = Math.max(...data.map((b) => b.demand));
    const minDemand = Math.min(...data.map((b) => b.demand));
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
        maxSupply,
        minSupply,
        maxDemand,
        minDemand,
        month: i + 1,
        animationTotalFrameRate: this.animationTotalFrameRate,
      });
    });
    this.data = data;
  }

  preprocessData(data: Omit<BalancerProps, "width" | "maxEvents" | "thk">[]) {
    const maxSupply = Math.max(...data.map((b) => b.supply));
    const minSupply = Math.min(...data.map((b) => b.supply));
    const maxDemand = Math.max(...data.map((b) => b.demand));
    const minDemand = Math.min(...data.map((b) => b.demand));
    this.singleBeats.forEach((singleBeat, i) => {
      singleBeat.changeData({
        supply: data[i].supply,
        demand: data[i].demand,
        events: data[i].events,
        maxSupply,
        minSupply,
        maxDemand,
        minDemand,
      });
    });
  }

  setData(data: Omit<BalancerProps, "width" | "maxEvents" | "thk">[]) {
    this.data = data;
    this.preprocessData(data);
  }

  render() {
    // console.log(frameCount);
    this.p5.clear();
    for (let i = 0; i < this.singleBeats.length; i++) {
      this.singleBeats[i].render();
    }
  }
}
