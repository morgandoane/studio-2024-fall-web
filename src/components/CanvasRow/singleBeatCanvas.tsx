import { Event } from "@data/events/Event";
import p5 from "p5";

export enum XSection {
  First = 1,
  Second,
  Third,
  Fourth,
  Fifth,
}

export class SingleBeatCanvas {
  p5: p5;
  height: number;
  width: number;
  leftTopX: number;
  leftTopY: number;
  supply: number;
  demand: number;
  events: Event[];
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
  traceOffsetMonths: number = 2;
  beatColor: [number, number, number, number] = [255, 0, 0, 255];
  defaultColor: [number, number, number, number] = [200, 200, 200, 255];
  numBins: number = 5;

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
    events: Event[];
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
    this.minAmplitude = 0;
    this.maxSupply = maxSupply;
    this.minSupply = minSupply;
    this.maxDemand = maxDemand;
    this.minDemand = minDemand;
    // find the point based on the supply and demand
    const maxUnit = Math.max(this.maxSupply, this.maxDemand);
    const minUnit = 0;
    // let us bin the supply and demand to the amplitude
    const numberOfBins = this.numBins;

    const binnedSupply = Math.floor(
      ((this.supply - minUnit) / (maxUnit - minUnit)) * numberOfBins
    );
    const binnedDemand = Math.floor(
      ((this.demand - minUnit) / (maxUnit - minUnit)) * numberOfBins
    );
    this.supplyAmplitude = this.p5.map(
      this.supply,
      minUnit,
      maxUnit,
      this.minAmplitude,
      this.maxAmplitude
    );
    this.demandAmplitude = this.p5.map(
      this.demand,
      minUnit,
      maxUnit,
      this.minAmplitude,
      this.maxAmplitude
    );
    console.log("demandAmplitude", this.demandAmplitude);

    this.frequency = 0.01;
    this.month = month;
    this.animationTotalFrameRate = animationTotalFrameRate;
    // we will render the dots along the way
    for (let i = 0; i < events.length; i++) {
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
    events: Event[];
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

    this.supplyAmplitude = this.p5.map(
      this.supply,
      minUnit,
      maxUnit,
      this.minAmplitude,
      this.maxAmplitude
    );
    this.demandAmplitude = this.p5.map(
      this.demand,
      minUnit,
      maxUnit,
      this.minAmplitude,
      this.maxAmplitude
    );
    this.heartbeatDot = [];
    for (let i = 0; i < events.length; i++) {
      // Add a color!
      this.heartbeatDot.push({
        x: this.leftTopX + this.width / 2,
        y: this.leftTopY + this.height / 2,
        hidden: true,
      });
    }
  }

  findSectionStartEndPoints(section: XSection) {
    switch (section) {
      case XSection.First:
        return {
          x1: this.leftTopX,
          y1: this.leftTopY + this.height / 2,
          x2: this.leftTopX + this.width / 3,
          y2: this.leftTopY + this.height / 2,
        };
      case XSection.Second:
        return {
          x1: this.leftTopX + this.width / 3,
          y1: this.leftTopY + this.height / 2,
          x2: this.leftTopX + this.width * (5 / 12),
          y2: this.leftTopY + (this.height / 2 - this.supplyAmplitude),
        };
      case XSection.Third:
        return {
          x1: this.leftTopX + this.width * (5 / 12),
          y1: this.leftTopY + (this.height / 2 - this.supplyAmplitude),
          x2: this.leftTopX + this.width * (7 / 12),
          y2: this.leftTopY + this.height / 2 + this.demandAmplitude,
        };
      case XSection.Fourth:
        return {
          x1: this.leftTopX + this.width * (7 / 12),
          y1: this.leftTopY + this.height / 2 + this.demandAmplitude,
          x2: this.leftTopX + this.width * (2 / 3),
          y2: this.leftTopY + this.height / 2,
        };
      case XSection.Fifth:
        return {
          x1: this.leftTopX + this.width * (2 / 3),
          y1: this.leftTopY + this.height / 2,
          x2: this.leftTopX + this.width,
          y2: this.leftTopY + this.height / 2,
        };
    }
  }

  drawLineTill(x: number, color: [number, number, number, number]) {
    const section = this.findXSection(x);
    const sectionsLessThanCurrent = Array.from(
      { length: section - 1 },
      (_, i) => (i + 1) as XSection
    );
    const [r, g, b, a] = color;
    this.p5.push();
    this.p5.stroke(r, g, b, a);
    sectionsLessThanCurrent.forEach((section) => {
      this.drawSectionLine(section, color, 2);
    });
    this.p5.pop();
  }

  drawLineFrom(x: number, color: [number, number, number, number]) {
    const section = this.findXSection(x);
    const sectionsGreaterThanCurrent = Array.from(
      { length: 6 - section },
      (_, i) => (section + 1 + i) as XSection
    );
    // remove the right most section
    sectionsGreaterThanCurrent.pop();
    const [r, g, b, a] = color;
    this.p5.push();
    this.p5.stroke(r, g, b, a);
    sectionsGreaterThanCurrent.forEach((section) => {
      this.drawSectionLine(section, color, 2);
    });
    this.p5.pop();
  }

  setGradientContext(
    section: XSection,
    x: number,
    color: [number, number, number, number] = this.beatColor
  ) {
    const context = this.p5.drawingContext;
    // let gradient;
    const { x1, x2, y1, y2 } = this.findSectionStartEndPoints(section);
    const gradient = context.createLinearGradient(
      x + (this.month - 1) * this.width - (x2 - x1),
      y1,
      // x + (this.month - 1) * this.width,
      x2,
      y2
    );
    const [r, g, b, a] = color;
    gradient.addColorStop(0, `transparent`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${a})`);
    return gradient;
  }

  renderTrace() {
    this.p5.push();
    const frameCount = this.p5.frameCount;
    const animationDuration = frameCount % this.animationTotalFrameRate;
    const isMonthWithDot =
      animationDuration >
        (this.month - 1) * (this.animationTotalFrameRate / 12) &&
      animationDuration < this.month * (this.animationTotalFrameRate / 12);
    const isMonthInTrace =
      animationDuration > this.month * (this.animationTotalFrameRate / 12) &&
      animationDuration <
        (this.month + this.traceOffsetMonths - 1) *
          (this.animationTotalFrameRate / 12);
    const isMonthInFadingTrace =
      animationDuration >
        (this.month + this.traceOffsetMonths - 1) *
          (this.animationTotalFrameRate / 12) &&
      animationDuration <
        (this.month + this.traceOffsetMonths) *
          (this.animationTotalFrameRate / 12);

    const deltaPerFrame = this.width / (this.animationTotalFrameRate / 12);
    const xValue = (frameCount * deltaPerFrame) % this.width;
    const isSupplyHigher = this.supply > this.demand;
    const color: [number, number, number, number] = isSupplyHigher
      ? [255, 0, 0, 255]
      : [0, 0, 0, 255];
    if (isMonthInFadingTrace) {
      this.drawLineFrom(xValue, color);
      this.drawSectionGradientLineFrom(
        this.findXSection(xValue),
        xValue,
        color
      );
    }
    if (isMonthInTrace) {
      this.drawLines(color, 2);
      // this.drawSectionLineTill(this.findXSection(xValue), xValue);
    }
    if (isMonthWithDot) {
      this.drawLineTill(xValue, color);
      this.drawSectionLineTill(this.findXSection(xValue), xValue, color);
    }
    this.p5.pop();
  }

  drawSectionLine(
    section: XSection,
    color: [number, number, number, number],
    weight: number = 2
  ) {
    const { x1, x2, y1, y2 } = this.findSectionStartEndPoints(section);
    this.p5.strokeWeight(weight);
    const [r, g, b, a] = color;
    this.p5.stroke(r, g, b, a);
    this.p5.line(x1, y1, x2, y2);
  }

  drawSectionLineTill(
    section: XSection,
    x: number,
    color: [number, number, number, number] = this.beatColor,
    weight: number = 2
  ) {
    this.p5.push();
    const { x1, y1, x2, y2 } = this.findSectionStartEndPoints(section);
    const [r, g, b, a] = color;
    this.p5.strokeWeight(weight);
    this.p5.stroke(r, g, b, a);
    this.p5.line(x1, y1, x + this.leftTopX, this.findY(x));
    this.p5.pop();
  }

  drawSectionGradientLineFrom(
    section: XSection,
    x: number,
    color: [number, number, number, number] = this.beatColor,
    weight: number = 2
  ) {
    this.p5.push();
    const { x2, y2 } = this.findSectionStartEndPoints(section);
    const gradient = this.setGradientContext(section, x, color);

    this.p5.drawingContext.strokeStyle = gradient;
    const [r, g, b, a] = color;
    this.p5.stroke(r, g, b, a);
    this.p5.strokeWeight(weight);
    this.p5.line(x + this.leftTopX, this.findY(x), x2, y2);

    this.p5.pop();
  }

  drawLines(
    color: [number, number, number, number] = this.defaultColor,
    weight = 1
  ) {
    this.p5.push();
    this.drawSectionLine(XSection.First, color, weight);
    this.drawSectionLine(XSection.Second, color, weight);
    this.drawSectionLine(XSection.Third, color, weight);
    this.drawSectionLine(XSection.Fourth, color, weight);
    this.drawSectionLine(XSection.Fifth, color, weight);
    this.p5.pop();
  }

  renderDefaultLines() {
    this.p5.push();
    this.drawLines();
    this.p5.pop();
  }

  findXSection(x: number) {
    const division1 = this.width / 3;
    const division2 = this.width * (5 / 12);
    const division3 = this.width * (7 / 12);
    const division4 = this.width * (2 / 3);
    if (x <= division1) {
      return XSection.First;
    } else if (x <= division2) {
      return XSection.Second;
    } else if (x <= division3) {
      return XSection.Third;
    } else if (x <= division4) {
      return XSection.Fourth;
    } else {
      return XSection.Fifth;
    }
  }

  skewedCurve(
    x: number,
    a: number,
    b: number,
    c: number,
    d: number,
    order: number
  ): number {
    return b + (d - b) * Math.pow((x - a) / (c - a), order);
  }

  cosV(v: number) {
    const OFFSET_Y = 1;
    const INTEGRAL_START = 0;
    const INTEGRAL_END = 2 * Math.PI;
    return Math.cos(v) + OFFSET_Y;
  }

  /**
   *
   * @param f frame count
   * @param index
   * @returns
   */
  findX(f: number, index: number) {
    // this will give us a delayed x value
    const deltaPerFrame = this.width / (this.animationTotalFrameRate / 12);
    const frameForSingleBeat = this.animationTotalFrameRate / 12;
    // need to map the f to PI
    const fPIVal = this.p5.map(f, 0, frameForSingleBeat, 0, 2 * Math.PI);
    const fY = this.cosV(fPIVal);
    const delaySpeedBy = 1.5;
    if (index === 0) {
      return f;
    }
    // after that we got to log the x value based on index
    const totalTimeToReach = this.width / deltaPerFrame;
    const xValue = this.skewedCurve(f, 0, 0, this.width, this.width, index);
    return xValue;
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
    this.p5.push();
    this.p5.noStroke();
    const frameCount = this.p5.frameCount;
    const animationDuration = frameCount % this.animationTotalFrameRate;
    // console.log(animationDuration, this.animationTotalFrameRate / 12);
    const showDot =
      animationDuration >
        (this.month - 1) * (this.animationTotalFrameRate / 12) &&
      animationDuration < this.month * (this.animationTotalFrameRate / 12);

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
        for (let i = 0; i < this.heartbeatDot.length; i++) {
          // we will the render the dots in a delayed sense
          const dot = this.heartbeatDot[i];
          const dotX = this.findX(xValue, i);
          const y = this.findY(dotX);
          this.p5.fill(255, 0, 0);
          this.p5.ellipse(dotX + this.leftTopX, y, 10, 10);

          // if (dot.y > y) {
          //   dot.y -= 1;
          // } else {
          //   dot.hidden = true;
          // }
        }
      }
    }
    this.p5.pop();
  }

  renderMonthBounds() {
    this.p5.push();
    if (this.month !== 12) {
      this.p5.stroke(200, 200, 200, 100);
      this.p5.strokeWeight(1);
      this.p5.line(
        this.leftTopX + this.width,
        this.leftTopY + this.height * (1 / 4),
        this.leftTopX + this.width,
        this.leftTopY + this.height * (3 / 4)
      );
    }
    this.p5.pop();
  }

  render() {
    this.renderMonthBounds();
    this.renderDefaultLines();
    this.renderTrace();
    this.renderDots();
    // const frameCount = this.p5.frameCount;
    // const xValue = (frameCount * 2) % this.width;
    // this.p5.fill(255, 0, 0);
    // const y = this.findY(xValue);
    // this.p5.ellipse(xValue + this.leftTopX, y, 2, 2);
  }
}
