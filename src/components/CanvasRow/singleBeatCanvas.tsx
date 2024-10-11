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
  maxAmplitude: number;
  minAmplitude: number;
  maxSupply: number;
  minSupply: number;
  maxDemand: number;
  minDemand: number;
  supplyAmplitude: number;
  demandAmplitude: number;
  frequency: number;
  month: number;
  animationTotalFrameRate: number;
  heartbeatDot: { x: number; y: number; hidden: boolean }[] = [];

  constructor({
    p5,
    width,
    height,
    leftTopX,
    leftTopY,
    supply,
    demand,
    events,
    maxDemand,
    minDemand,
    maxSupply,
    minSupply,
    month,
    animationTotalFrameRate,
  }: {
    p5: p5;
    width: number;
    height: number;
    leftTopX: number;
    leftTopY: number;
    supply: number;
    demand: number;
    maxDemand: number;
    maxSupply: number;
    minDemand: number;
    minSupply: number;
    events: number;
    month: number;
    animationTotalFrameRate: number;
  }) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    this.leftTopX = leftTopX;
    this.leftTopY = leftTopY;
    this.supply = supply;
    this.demand = demand;
    this.events = events;
    this.maxAmplitude = this.height / 2 - this.height / 10;
    this.minAmplitude = this.height / 10;
    this.maxSupply = maxSupply;
    this.minSupply = minSupply;
    this.maxDemand = maxDemand;
    this.minDemand = minDemand;
    // find the point based on the supply and demand
    const maxUnit = Math.max(this.maxSupply, this.maxDemand);
    const minUnit = Math.min(this.minSupply, this.minDemand);
    this.supplyAmplitude =
      ((this.supply - minUnit) / (maxUnit - minUnit)) * this.maxAmplitude;
    this.demandAmplitude =
      ((this.demand - minUnit) / (maxUnit - minUnit)) * this.maxAmplitude;
    this.frequency = 0.01;
    this.month = month;
    this.animationTotalFrameRate = animationTotalFrameRate;
    // we will render the dots along the way
    for (let i = 0; i < events; i++) {
      this.heartbeatDot.push({
        x: this.leftTopX + this.width / 2,
        y: this.leftTopY + this.height / 2,
        hidden: true,
      });
    }
  }

  setSupply(supply: number) {
    this.supply = supply;
  }

  setDemand(demand: number) {
    this.demand = demand;
  }

  setMaxSupply(maxSupply: number) {
    this.maxSupply = maxSupply;
  }

  setMinSupply(minSupply: number) {
    this.minSupply = minSupply;
  }

  setMaxDemand(maxDemand: number) {
    this.maxDemand = maxDemand;
  }

  setMinDemand(minDemand: number) {
    this.minDemand = minDemand;
  }

  changeData({
    supply,
    demand,
    events,
    maxSupply,
    minSupply,
    maxDemand,
    minDemand,
  }: {
    supply: number;
    demand: number;
    events: number;
    maxSupply: number;
    minSupply: number;
    maxDemand: number;
    minDemand: number;
  }) {
    this.supply = supply;
    this.demand = demand;
    this.maxSupply = maxSupply;
    this.minSupply = minSupply;
    this.maxDemand = maxDemand;
    this.minDemand = minDemand;
    this.events = events;
    const maxUnit = Math.max(this.maxSupply, this.maxDemand);
    const minUnit = Math.min(this.minSupply, this.minDemand);
    this.supplyAmplitude =
      ((this.supply - minUnit) / (maxUnit - minUnit)) * this.maxAmplitude;
    this.demandAmplitude =
      ((this.demand - minUnit) / (maxUnit - minUnit)) * this.maxAmplitude;
    this.heartbeatDot = [];
    for (let i = 0; i < events; i++) {
      this.heartbeatDot.push({
        x: this.leftTopX + this.width / 2,
        y: this.leftTopY + this.height / 2,
        hidden: true,
      });
    }
  }

  renderLines() {
    if (this.supply > this.demand) {
      this.p5.stroke(255, 0, 0, 200);
    } else {
      this.p5.stroke(15, 15, 15, 255);
    }
    this.p5.strokeWeight(2);
    this.p5.line(
      this.leftTopX,
      this.leftTopY + this.height / 2,
      this.leftTopX + this.width / 3,
      this.leftTopY + this.height / 2
    );
    // line going up
    this.p5.line(
      this.leftTopX + this.width / 3,
      this.leftTopY + this.height / 2,
      this.leftTopX + this.width * (5 / 12),
      this.leftTopY + (this.height / 2 - this.supplyAmplitude)
    );
    // line going down
    this.p5.line(
      this.leftTopX + this.width * (5 / 12),
      this.leftTopY + (this.height / 2 - this.supplyAmplitude),
      this.leftTopX + this.width * (7 / 12),
      this.leftTopY + this.height / 2 + this.demandAmplitude
    );
    // line going up to middle
    this.p5.line(
      this.leftTopX + this.width * (7 / 12),
      this.leftTopY + this.height / 2 + this.demandAmplitude,
      this.leftTopX + this.width * (2 / 3),
      this.leftTopY + this.height / 2
    );
    // line horizontal
    this.p5.line(
      this.leftTopX + this.width * (2 / 3),
      this.leftTopY + this.height / 2,
      this.leftTopX + this.width,
      this.leftTopY + this.height / 2
    );
  }

  findY(x: number) {
    const division1 = this.width / 3;
    const division2 = this.width * (5 / 12);
    const division3 = this.width * (7 / 12);
    const division4 = this.width * (2 / 3);
    if (x <= division1) {
      return this.leftTopY + this.height / 2;
    } else if (x <= division2) {
      return (
        this.leftTopY +
        this.height / 2 -
        (this.supplyAmplitude * (x - division1)) / (division2 - division1)
      );
    } else if (x <= division3) {
      return (
        this.leftTopY +
        (this.height / 2 - this.supplyAmplitude) +
        ((this.height / 2 +
          this.demandAmplitude -
          (this.height / 2 - this.supplyAmplitude)) *
          (x - division2)) /
          (division3 - division2)
      );
    } else if (x <= division4) {
      return (
        this.leftTopY +
        (this.height / 2 + this.demandAmplitude) -
        ((this.height / 2 + this.demandAmplitude - this.height / 2) *
          (x - division3)) /
          (division4 - division3)
      );
    } else {
      return this.leftTopY + this.height / 2;
    }
  }

  renderDots() {
    this.p5.noStroke();
    const frameCount = this.p5.frameCount;
    const animationDuration = frameCount % this.animationTotalFrameRate;
    // console.log(animationDuration, this.animationTotalFrameRate / 12);
    const showDot =
      animationDuration >
        (this.month - 1) * (this.animationTotalFrameRate / 12) &&
      animationDuration < this.month * (this.animationTotalFrameRate / 12);

    // console.log(
    //   this.month,
    //   (this.month - 1) * (this.animationTotalFrameRate / 12),
    //   this.month * (this.animationTotalFrameRate / 12)
    // );
    const deltaPerFrame = this.width / (this.animationTotalFrameRate / 12);
    const xValue = (frameCount * deltaPerFrame) % this.width;
    // draw a dot
    this.heartbeatDot.forEach((dot) => {
      if (dot.hidden) {
        dot.hidden = false;
        // dot.x = xValue + this.width * (this.month - 1);
        dot.x = xValue + this.leftTopX;
        dot.y = this.height / 2;
      }
    });
    if (showDot) {
      if (this.heartbeatDot.length > 0) {
        this.p5.fill(255, 0, 0);
        const y = this.findY(xValue);
        this.p5.ellipse(xValue + this.leftTopX, y, 5, 5);
        for (let i = 0; i < this.heartbeatDot.length; i++) {
          const dot = this.heartbeatDot[i];

          // if (dot.y > y) {
          //   dot.y -= 1;
          // } else {
          //   dot.hidden = true;
          // }
        }
      } else {
        this.p5.fill(255, 0, 0);
        const y = this.findY(xValue);
        this.p5.ellipse(xValue + this.leftTopX, y, 4, 4);
      }
    }
  }

  render() {
    this.renderLines();
    this.renderDots();
    // const frameCount = this.p5.frameCount;
    // const xValue = (frameCount * 2) % this.width;
    // this.p5.fill(255, 0, 0);
    // const y = this.findY(xValue);
    // this.p5.ellipse(xValue + this.leftTopX, y, 2, 2);
  }
}
