import KR_CITIES from "@utils/cities";
import p5 from "p5";

type CityRenderData = {
  left?: Array<KR_CITIES>;
  top?: Array<KR_CITIES>;
  right?: Array<KR_CITIES>;
  bottom?: Array<KR_CITIES>;
  unit: number;
  size: number;
  x: number;
  y: number;
};

const MIN_SIZE = 10;

const MAX_SIZE = 100;

export class AbstractMapCanvas {
  p5: p5;
  data: Map<KR_CITIES, number>;
  cityRenderData: Map<KR_CITIES, CityRenderData>;
  padding: number = 10;
  maxUnit: number = 0;
  minUnit: number = 0;
  offset: { x: number; y: number } = { x: 0, y: 0 };
  renderedFlag: Map<KR_CITIES, boolean> = new Map();

  constructor(
    p5: p5,
    data: Map<KR_CITIES, number>,
    width: number,
    height: number
  ) {
    this.p5 = p5;
    this.data = data;
    this.cityRenderData = new Map();
    this.initializeCityLocation();
  }

  initializeCitySize(
    data: Map<KR_CITIES, number>,
    minVal: number,
    maxVal: number
  ) {
    // use this data
    this.data = data;
    // now we have to set the size for each city
    for (const [city, value] of this.data) {
      //   console.log(city, size);
      // check if cityRenderData has this city
      this.cityRenderData.get(city)!.unit = value;
    }
    this.maxUnit = maxVal;
    this.minUnit = minVal;
  }

  initializeCityLocation() {
    // incheon should be rendered first
    this.cityRenderData.set(KR_CITIES.INCHEON, {
      right: [KR_CITIES.GYEONGGI, KR_CITIES.SEOUL],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });

    this.cityRenderData.set(KR_CITIES.SEOUL, {
      bottom: [KR_CITIES.GYEONGGI],
      left: [KR_CITIES.INCHEON],
      right: [KR_CITIES.GANGWON],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });

    this.cityRenderData.set(KR_CITIES.GANGWON, {
      left: [KR_CITIES.GYEONGGI, KR_CITIES.SEOUL],
      bottom: [KR_CITIES.CHUNGBUK, KR_CITIES.DAEGU_GYEONGBUK],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });

    this.cityRenderData.set(KR_CITIES.GYEONGGI, {
      top: [KR_CITIES.SEOUL],
      left: [KR_CITIES.INCHEON],
      right: [KR_CITIES.GANGWON],
      bottom: [KR_CITIES.CHUNGBUK, KR_CITIES.DAEJEON_CHUNGNAM],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });

    this.cityRenderData.set(KR_CITIES.DAEJEON_CHUNGNAM, {
      top: [KR_CITIES.GYEONGGI],
      right: [KR_CITIES.CHUNGBUK],
      bottom: [KR_CITIES.JEONBUK],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });

    this.cityRenderData.set(KR_CITIES.CHUNGBUK, {
      top: [KR_CITIES.GYEONGGI, KR_CITIES.GANGWON],
      left: [KR_CITIES.DAEJEON_CHUNGNAM],
      right: [KR_CITIES.DAEGU_GYEONGBUK],
      bottom: [KR_CITIES.JEONBUK],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });

    this.cityRenderData.set(KR_CITIES.DAEGU_GYEONGBUK, {
      top: [KR_CITIES.GANGWON],
      left: [KR_CITIES.CHUNGBUK],
      bottom: [KR_CITIES.GYEONGNAM, KR_CITIES.ULSAN],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });
    this.cityRenderData.set(KR_CITIES.JEONBUK, {
      top: [KR_CITIES.CHUNGBUK, KR_CITIES.DAEJEON_CHUNGNAM],
      left: [KR_CITIES.DAEGU_GYEONGBUK],
      right: [KR_CITIES.GYEONGNAM],
      bottom: [KR_CITIES.JEONNAM],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });
    this.cityRenderData.set(KR_CITIES.ULSAN, {
      top: [KR_CITIES.DAEGU_GYEONGBUK],
      left: [KR_CITIES.GYEONGNAM],
      bottom: [KR_CITIES.BUSAN],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });
    this.cityRenderData.set(KR_CITIES.GYEONGNAM, {
      top: [KR_CITIES.DAEGU_GYEONGBUK],
      left: [KR_CITIES.JEONBUK, KR_CITIES.JEONNAM],
      right: [KR_CITIES.BUSAN, KR_CITIES.ULSAN],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });
    this.cityRenderData.set(KR_CITIES.BUSAN, {
      top: [KR_CITIES.ULSAN],
      left: [KR_CITIES.GYEONGNAM],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });
    this.cityRenderData.set(KR_CITIES.JEONNAM, {
      top: [KR_CITIES.JEONBUK],
      right: [KR_CITIES.GYEONGNAM],
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });
    this.cityRenderData.set(KR_CITIES.JEJU, {
      unit: 0,
      size: 0,
      x: 0,
      y: 0,
    });
  }

  getCitySize(city: KR_CITIES) {
    const maxSize = Math.max(this.p5.width, this.p5.height) / 4;
    const minSize = Math.min(this.p5.width, this.p5.height) / 16;

    const cityData = this.cityRenderData.get(city)!;
    const size = this.p5.map(
      cityData.unit,
      this.minUnit,
      this.maxUnit,
      MIN_SIZE,
      MAX_SIZE
    );
    return size;
  }

  getMapMaxWidth() {
    // this should start from incheon
    // the tree will collect all the branches
    // the string will be a concatenation of the city names
    const tree = new Map<string, Array<KR_CITIES>>();
    const trajectory = [KR_CITIES.INCHEON];
    // add incheon to the tree
    const parentKey = KR_CITIES.INCHEON;
    tree.set(parentKey, trajectory);
    this.recursiveRight(KR_CITIES.INCHEON, trajectory, tree, parentKey);

    // get values from the tree
    let maxWidth = 0;
    for (const [key, value] of tree) {
      let width = 0;
      for (const city of value) {
        const cityWidth = this.getCitySize(city);
        width += cityWidth;
      }
      if (width > maxWidth) {
        maxWidth = width;
      }
    }
    return maxWidth;
  }

  getMapMaxHeight() {
    // this should start from seoul
    const tree = new Map<string, Array<KR_CITIES>>();
    const trajectory = [KR_CITIES.SEOUL];
    const parentKey = KR_CITIES.SEOUL;
    tree.set(parentKey, trajectory);
    this.recursiveBottom(KR_CITIES.SEOUL, trajectory, tree, parentKey);

    let maxHeight = 0;
    for (const [key, value] of tree) {
      let height = 0;
      for (const city of value) {
        const cityHeight = this.getCitySize(city);
        height += cityHeight;
      }
      if (height > maxHeight) {
        maxHeight = height;
      }
    }

    return maxHeight;
  }

  recursiveRight(
    city: KR_CITIES,
    trajectory: Array<KR_CITIES>,
    tree: Map<string, Array<KR_CITIES>>,
    parentKey: string
  ) {
    const cityData = this.cityRenderData.get(city)!;
    if (cityData.right) {
      const newTrajectory = [...trajectory, cityData.right[0]];
      // update the tree
      tree.set(parentKey, newTrajectory);
      this.recursiveRight(cityData.right[0], newTrajectory, tree, parentKey);
      if (cityData.right.length > 1) {
        let i = 0;
        for (const nextCity of cityData.right) {
          if (i === 0) {
            i++;
            continue;
          }
          const newTrajectory = [...trajectory, nextCity];
          const newKey = newTrajectory.join("-");
          tree.set(newKey, newTrajectory);
          this.recursiveRight(nextCity, newTrajectory, tree, newKey);
        }
      }
    }
  }

  recursiveBottom(
    city: KR_CITIES,
    trajectory: Array<KR_CITIES>,
    tree: Map<string, Array<KR_CITIES>>,
    parentKey: string
  ) {
    const cityData = this.cityRenderData.get(city)!;
    if (cityData.bottom) {
      const newTrajectory = [...trajectory, cityData.bottom[0]];
      // update the tree
      tree.set(parentKey, newTrajectory);
      this.recursiveBottom(cityData.bottom[0], newTrajectory, tree, parentKey);
      if (cityData.bottom.length > 1) {
        let i = 0;
        for (const nextCity of cityData.bottom) {
          if (i === 0) {
            i++;
            continue;
          }
          const newTrajectory = [...trajectory, nextCity];
          const newKey = newTrajectory.join("-");
          tree.set(newKey, newTrajectory);
          this.recursiveBottom(nextCity, newTrajectory, tree, newKey);
        }
      }
    }
  }

  binaryTree() {}

  getMaxHeight() {}

  findCityXY(city: KR_CITIES, renderedFlag: Map<KR_CITIES, boolean>) {
    const top = this.cityRenderData.get(city)!.top;
    const left = this.cityRenderData.get(city)!.left;

    const renderedTop = top ? top?.map((city) => renderedFlag.get(city)) : [];
    const renderedLeft = left
      ? left?.map((city) => renderedFlag.get(city))
      : [];

    if (top && top.length > 0) {
      if (renderedTop?.length != top?.length) {
        return null;
      }
    }
    if (left && left.length > 0) {
      if (renderedLeft?.length != left?.length) {
        return null;
      }
    }

    let y = 0;
    let x = 0;
    if (top && left) {
      // we have to consider if they are overlapping
      let minPossibleY = Number.MAX_SAFE_INTEGER;
      let minPossibleX = Number.MAX_SAFE_INTEGER;
      let maxPossibleX = 0;
      let maxPossibleY = 0;
      let rightMost = 0;
      let leftMost = Number.MAX_SAFE_INTEGER;
      let topMost = Number.MAX_SAFE_INTEGER;
      let rightMostCity = this.findRightMostCityOnY(0);
      let bottomMostCity = this.findBottomMostCityOnX(0);
      let bottomMost = 0;
      let boundX = 0;
      let boundY = 0;
      for (const tcity of top) {
        if (renderedFlag.get(tcity)) {
          const tcityData = this.cityRenderData.get(tcity)!;
          if (tcityData.y + tcityData.size < minPossibleY) {
            minPossibleY = tcityData.y + tcityData.size;
          }
          if (tcityData.y + tcityData.size > maxPossibleY) {
            maxPossibleY = tcityData.y + tcityData.size;
            boundY = maxPossibleY;
            bottomMostCity = tcity;
          }
        }
      }
      for (const lcity of left) {
        if (renderedFlag.get(lcity)) {
          const lcityData = this.cityRenderData.get(lcity)!;
          if (lcityData.x + lcityData.size > maxPossibleX) {
            maxPossibleX = lcityData.x + lcityData.size;
            boundX = maxPossibleX;
            rightMostCity = lcity;
          }
          if (lcityData.x < minPossibleX) {
            minPossibleX = lcityData.x;
          }
        }
      }

      x = maxPossibleX;
      y = maxPossibleY;

      let leftCity = this.findCityByXY(x - 1, y);
      if (left && rightMostCity && leftCity !== rightMostCity) {
        // attach to the right most city
        const rightMostCityData = this.cityRenderData.get(rightMostCity)!;
        if (rightMostCityData.y > y) {
          y = rightMostCityData.y;
        }
      }
      //   check if there is any overlapping
      //   const midX = (leftMost + rightMost) / 2 - this.getCitySize(city) / 2;
      //   const midY = (topMost + bottomMost) / 2 - this.getCitySize(city) / 2;
      //   const mostBottomCity = this.findBottomMostCityOnX(midX);
      //   const mostRightCity = this.findRightMostCityOnY(midY);
      //   const boundX = mostRightCity
      //     ? this.cityRenderData.get(mostRightCity)!.x +
      //       this.cityRenderData.get(mostRightCity)!.size
      //     : 0;
      //   const boundY = mostBottomCity
      //     ? this.cityRenderData.get(mostBottomCity)!.y +
      //       this.cityRenderData.get(mostBottomCity)!.size
      //     : 0;
      //   if (mostBottomCity && mostRightCity) {
      //     x = 0;
      //     y = 0;
      //   } else if (mostBottomCity && !mostRightCity) {
      //     x = midX;
      //     y = boundY;
      //   } else if (!mostBottomCity && mostRightCity) {
      //     x = boundX;
      //     y = midY;
      //   } else {
      //     x = midX;
      //     y = midY;
      //   }
      //   x = boundX;
      //   y = boundY;
      //   x = minPossibleX;
      //   y = minPossibleY;

      //   const mostRightCity = this.findRightMostCityOnY(minPossibleY);
      //   const boundX = mostRightCity
      //     ? this.cityRenderData.get(mostRightCity)!.x +
      //       this.cityRenderData.get(mostRightCity)!.size
      //     : 0;

      //   const mostBottomCity = this.findBottomMostCityOnX(maxPossibleX);
      //   const boundY = mostBottomCity
      //     ? this.cityRenderData.get(mostBottomCity)!.y +
      //       this.cityRenderData.get(mostBottomCity)!.size
      //     : 0;
      //   if (mostBottomCity && mostRightCity) {
      //     x = boundX;
      //     y = boundY;
      //   } else if (mostBottomCity && !mostRightCity) {
      //     x = minPossibleX;
      //     y = boundY;
      //   } else if (!mostBottomCity && mostRightCity) {
      //     x = boundX;
      //     y = minPossibleY;
      //   } else {
      //     x = maxPossibleX;
      //     y = maxPossibleY;
      //   }
      //   x = boundX;
      //   y = boundY;
    } else if (!top && left) {
      // we will find median of the left cities
      let minY = Number.MAX_SAFE_INTEGER;
      let maxY = 0;
      for (const lcity of left) {
        if (renderedFlag.get(lcity)) {
          const lcityData = this.cityRenderData.get(lcity)!;
          if (lcityData.y < minY) {
            minY = lcityData.y;
          }
          if (lcityData.y + lcityData.size > maxY) {
            maxY = lcityData.y + lcityData.size;
          }
          if (lcityData.x + lcityData.size > x) {
            x = lcityData.x + lcityData.size;
          }
        }
      }
      y = (minY + maxY) / 2 - this.getCitySize(city) / 2;
    } else if (top && !left) {
      for (const tcity of top) {
        if (renderedFlag.get(tcity)) {
          const tcityData = this.cityRenderData.get(tcity)!;
          if (tcityData.y + tcityData.size > y) {
            y = tcityData.y + tcityData.size;
          }
          if (tcityData.x > x) {
            x = tcityData.x;
          }
        }
      }
    } else if (!top && !left) {
    }
    return { x, y };
  }

  findMinPossibleYInX(x: number) {
    const city = this.findRightMostCityOnY(x);
    if (!city) {
      return 0;
    }
    const cityData = this.cityRenderData.get(city)!;
    const cityX = cityData.x;
    const cityY = cityData.y;
    const citySize = cityData.size;
    const cityX2 = cityX + citySize;
    const cityY2 = cityY + citySize;
    return cityY2;
  }

  findMinPossibleXInY(y: number) {
    // find the city on the y
    const city = this.findBottomMostCityOnX(y);
    if (!city) {
      return 0;
    }
    const cityData = this.cityRenderData.get(city)!;
    const cityX = cityData.x;
    const cityY = cityData.y;
    const citySize = cityData.size;
    const cityX2 = cityX + citySize;
    const cityY2 = cityY + citySize;
    return cityX2;
  }

  findCityByXY(x: number, y: number) {
    for (const [city, cityData] of this.cityRenderData) {
      const cityX = cityData.x;
      const cityY = cityData.y;
      const citySize = cityData.size;
      const cityX2 = cityX + citySize;
      const cityY2 = cityY + citySize;
      if (!this.renderedFlag.get(city)) {
        continue;
      }
      if (x > cityX && x < cityX2 && y > cityY && y < cityY2) {
        return city;
      }
    }
    return null;
  }

  findXYOverlapCity(city: KR_CITIES, xy: { x: number; y: number }) {
    const cityData = this.cityRenderData.get(city)!;
    const x = cityData.x;
    const y = cityData.y;
    const size = cityData.size;
    const x2 = x + size;
    const y2 = y + size;
    if (xy.x >= x && xy.x <= x2 && xy.y >= y && xy.y <= y2) {
      return true;
    }
    return false;
  }

  findBottomMostCityOnX(x: number) {
    let maxY = 0;
    let bottomCity: KR_CITIES | null = null;
    for (const [city, cityData] of this.cityRenderData) {
      const cityX = cityData.x;
      const cityY = cityData.y;
      const citySize = cityData.size;
      const cityX2 = cityX + citySize;
      const cityY2 = cityY + citySize;
      if (!this.renderedFlag.get(city)) {
        continue;
      }
      if (cityX <= x && cityX2 >= x && cityY2 > maxY) {
        maxY = cityY2;
        bottomCity = city;
      }
    }
    return bottomCity;
  }

  findRightMostCityOnY(y: number) {
    let maxX = 0;
    let rightCity: KR_CITIES | null = null;
    for (const [city, cityData] of this.cityRenderData) {
      const cityX = cityData.x;
      const cityY = cityData.y;
      const citySize = cityData.size;
      const cityX2 = cityX + citySize;
      const cityY2 = cityY + citySize;
      if (!this.renderedFlag.get(city)) {
        continue;
      }
      if (cityY <= y && cityY2 >= y && cityX2 > maxX) {
        maxX = cityX2;
        rightCity = city;
      }
    }
    return rightCity;
  }

  renderCity(city: KR_CITIES) {
    // draw the city as square
    const { x, y, size } = this.cityRenderData.get(city)!;
    // this.p5.fill(255, 0, 0);
    this.p5.rect(x, y, size, size);
    // add text
    const textSize = this.p5.map(size, MIN_SIZE, MAX_SIZE, 8, 20);
    this.p5.textSize(textSize);
    // this.p5.fill(0);
    // center the text
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    const textWithoutSlash = city.split("/")[0];
    this.p5.text(textWithoutSlash, x + size / 2, y + size / 2);
    this.renderedFlag.set(city, true);
  }

  render() {
    for (const [city] of this.cityRenderData) {
      this.renderedFlag.set(city, false);
    }
    // we have to find center point through incheon, seoul, gangwon
    const maxSize = Math.max(this.p5.width, this.p5.height) / 4;
    const minSize = Math.min(this.p5.width, this.p5.height) / 16;

    const mapWidth = this.getMapMaxWidth();
    const mapHeight = this.getMapMaxHeight();

    this.offset.x = (this.p5.width - mapWidth) / 2;
    this.offset.y = (this.p5.height - mapHeight) / 2;

    // render incheon first
    const incheon = this.cityRenderData.get(KR_CITIES.INCHEON)!;
    incheon.x = this.offset.x;
    incheon.y = this.offset.y;
    const incheonSize = this.getCitySize(KR_CITIES.INCHEON);
    incheon.size = incheonSize;

    this.renderCity(KR_CITIES.INCHEON);

    for (const [city, cityData] of this.cityRenderData) {
      // if city is not rendered
      if (!this.renderedFlag.get(city)) {
        // find the x, y
        const xy = this.findCityXY(city, this.renderedFlag);

        if (!xy) {
          continue;
        }
        const { x, y } = xy;
        const size = this.getCitySize(city);
        this.cityRenderData.get(city)!.x = x;
        this.cityRenderData.get(city)!.y = y;
        this.cityRenderData.get(city)!.size = size;
        this.renderCity(city);
        //
      }
    }
  }
}
