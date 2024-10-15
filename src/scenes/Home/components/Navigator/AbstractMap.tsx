import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as d3 from "d3";
import { AbstractMapCanvas } from "./canvas";
import KR_CITIES from "@utils/cities";
import { Filter } from "@data/useData";
import { Supply } from "@data/supply/Supply";
import { Demand } from "@data/demand/Demand";
import { Event } from "@data/events/Event";
import topoData from "./provinces-topo-simple.json";
import cityData from "./cities.json";
import * as topojson from "topojson-client";
import P5 from "p5";

interface AbstractMapProps {
  width: number;
  height: number;
  filter: Filter;
  filteredData: {
    supply: Supply[];
    demand: Demand[];
    events: Event[];
  };
}

const AbstractMap: FC<AbstractMapProps> = ({
  filter,
  width,
  height,
  filteredData: allData,
}) => {
  const [supplyContainer, setSupplyContainer] = useState<HTMLDivElement | null>(
    null
  );
  const projection = useMemo(() => {
    const geojson: any = topojson.feature(
      topoData as any,
      topoData.objects["provinces-geo"] as any
    );

    const center = d3.geoCentroid(geojson as any);
    return d3
      .geoMercator()
      .center(center)
      .scale(2600)
      .translate([width / 2, height / 2]);
  }, [width, height]);

  const cityProjectionPoints = useMemo(() => {
    const output = new Map<KR_CITIES, [number, number]>();
    if (!projection) {
      return output;
    }
    cityData.forEach((city: any) => {
      const x = projection([city.lon, city.lat])![0];
      const y = projection([city.lon, city.lat])![1];
      output.set(city.name as KR_CITIES, [x, y]);
    });
    return output;
  }, [projection]);

  // console.log(cityProjectionPoints);
  const supplyCanvasRef = useRef<AbstractMapCanvas | null>(null);

  const gotSupplyContainer = useCallback((element: HTMLDivElement) => {
    if (!element) {
      return;
    }
    setSupplyContainer(element);
  }, []);

  useEffect(() => {
    if (!allData) {
      return;
    }
    if (!supplyCanvasRef.current) {
      return;
    }
    const supplyData = new Map<KR_CITIES, number>();
    let maxSupply = 0;
    let maxDemand = 0;
    let minSupply = Number.MAX_SAFE_INTEGER;
    let minDemand = Number.MAX_SAFE_INTEGER;
    const year = filter.year;
    const filteredData = allData;
    if (year) {
      filteredData.supply = filteredData.supply.filter((s) => s.year === year);
      filteredData.demand = filteredData.demand.filter((d) => d.year === year);
    }
    // sum by city
    filteredData.supply.forEach((s) => {
      const city = s.city as KR_CITIES;
      if (!supplyData.has(city)) {
        supplyData.set(city, 0);
      }
      supplyData.set(city, supplyData.get(city)! + s.total_unit);
    });
    // sum by city
    filteredData.demand.forEach((d) => {
      const city = d.city as KR_CITIES;
      if (!supplyData.has(city)) {
        supplyData.set(city, 0);
      }
      supplyData.set(city, supplyData.get(city)! + d.unit);
    });
    // get max supply
    supplyData.forEach((value) => {
      if (value > maxSupply) {
        maxSupply = value;
      }
      if (value < minSupply) {
        minSupply = value;
      }
    });

    // get max demand
    supplyData.forEach((value) => {
      if (value > maxDemand) {
        maxDemand = value;
      }
      if (value < minDemand) {
        minDemand = value;
      }
    });

    const maxVal = Math.max(maxSupply, maxDemand);
    const minVal = Math.min(minSupply, minDemand);
    supplyCanvasRef.current.initializeCitySize(supplyData, minVal, maxVal);
  }, [allData, supplyContainer]);

  useEffect(() => {
    if (!supplyContainer) {
      return;
    }
    const canvas = new P5((p5: P5) => {
      const width = supplyContainer.clientWidth;
      const abstractMapCanvas = new AbstractMapCanvas(
        p5,
        new Map(),
        width,
        height
      );
      supplyCanvasRef.current = abstractMapCanvas;
      const setup = () => {
        p5.createCanvas(width, height);
      };
      p5.setup = () => {
        setup();
      };
      p5.draw = () => {
        p5.clear();
        p5.rect(0, 0, width, height);
        abstractMapCanvas.render();
      };
    }, supplyContainer);
    return () => {
      canvas.remove();
    };
  }, [supplyContainer, height]);
  return <div ref={gotSupplyContainer}></div>;
};

export default AbstractMap;
