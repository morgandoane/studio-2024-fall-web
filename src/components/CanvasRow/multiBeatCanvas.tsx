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
  numBins = 15;

  constructor(
    p5: p5,
    width: number,
    height: number,
    data: Omit<BalancerProps, "width" | "maxEvents" | "thk">[],
    maxSupplyIn?: number,
    maxDemandIn?: number
  ) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    const maxSupply = maxSupplyIn
      ? maxSupplyIn
      : Math.max(...data.map((b) => b.supply));
    const minSupply = maxDemandIn
      ? maxDemandIn
      : Math.min(...data.map((b) => b.supply));
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

  preprocessData(
    data: Omit<BalancerProps, "width" | "maxEvents" | "thk">[],
    maxSupplyIn?: number,
    maxDemandIn?: number,
    minSupplyIn?: number,
    minDemandIn?: number
  ) {
    const maxSupply = maxSupplyIn
      ? maxSupplyIn
      : Math.max(...data.map((b) => b.supply));
    const minSupply = minSupplyIn
      ? minSupplyIn
      : Math.min(...data.map((b) => b.supply));
    const maxDemand = maxDemandIn
      ? maxDemandIn
      : Math.max(...data.map((b) => b.demand));
    const minDemand = minDemandIn
      ? minDemandIn
      : Math.min(...data.map((b) => b.demand));
    const numberOfBins = this.numBins;
    const minUnit = Math.min(minSupply, minDemand);
    const maxUnit = Math.max(maxSupply, maxDemand);
    console.log(maxSupply, maxDemand, minDemand, minSupply);

    this.singleBeats.forEach((singleBeat, i) => {
      const supply = data[i].supply;
      const demand = data[i].demand;

      // const supply = Math.floor(
      //   ((data[i].supply - minUnit) / (maxUnit - minUnit)) * numberOfBins
      // );
      // const demand = Math.floor(
      //   ((data[i].demand - minUnit) / (maxUnit - minUnit)) * numberOfBins
      // );
      const binnedSupply =
        Math.floor(((supply - minUnit) / (maxUnit - minUnit)) * numberOfBins) /
        numberOfBins;
      const binnedDemand =
        Math.floor(((demand - minUnit) / (maxUnit - minUnit)) * numberOfBins) /
        numberOfBins;

      // console.log("binnedSupply", binnedSupply);
      // console.log(
      //   "binnedDemand",
      //   Math.floor(((demand - minUnit) / (maxUnit - minUnit)) * numberOfBins) /
      //     numberOfBins
      // );

      singleBeat.changeData({
        // supply: data[i].supply,
        // demand: data[i].demand,
        supply: supply,
        demand: demand,
        events: data[i].events,
        maxSupply,
        minSupply,
        maxDemand,
        minDemand,
      });
    });
  }

  setData(
    data: Omit<BalancerProps, "width" | "maxEvents" | "thk">[],
    maxSupplyIn?: number,
    maxDemandIn?: number,
    minSupplyIn?: number,
    minDemandIn?: number
  ) {
    this.data = data;
    this.preprocessData(
      data,
      maxSupplyIn,
      maxDemandIn,
      minSupplyIn,
      minDemandIn
    );
  }

  render() {
    // console.log(frameCount);
    this.p5.clear();
    for (let i = 0; i < this.singleBeats.length; i++) {
      this.singleBeats[i].render();
    }
  }
}
