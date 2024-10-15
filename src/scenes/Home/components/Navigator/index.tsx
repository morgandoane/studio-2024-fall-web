import { Filter, useData } from "@data/useData";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { AbstractMapCanvas } from "./canvas";
import P5 from "p5";
import KR_CITIES from "@utils/cities";

export interface NavigatorProps {
  filter: Filter;
  setFilter: (newFilter: Filter) => void;
}

const Navigator: FC<NavigatorProps> = ({ filter, setFilter }) => {
  // This is ALL the data
  const { loading: allDataLoading, data: allData } = useData({
    year: null,
    month: null,
    city: null,
  });

  // This is the FILTERED data
  const { loading: filteredDataLoading, data: filteredData } = useData(filter);

  // call setFilter to change the data in the Matrix and Detail

  const [supplyContainer, setSupplyContainer] = useState<HTMLDivElement | null>(
    null
  );
  const supplyCanvasRef = useRef<AbstractMapCanvas | null>(null);

  const gotSupplyContainer = useCallback((element: HTMLDivElement) => {
    if (!element) {
      return;
    }
    setSupplyContainer(element);
  }, []);

  const [demandContainer, setDemandContainer] = useState<HTMLDivElement | null>(
    null
  );

  const gotDemandContainer = useCallback((element: HTMLDivElement) => {
    if (!element) {
      return;
    }
    setDemandContainer(element);
  }, []);

  useEffect(() => {
    if (!supplyContainer) {
      return;
    }
    const canvas = new P5((p5: P5) => {
      const width = supplyContainer.clientWidth;
      const height = width;
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
        abstractMapCanvas.render();
      };
    }, supplyContainer);
    return () => {
      canvas.remove();
    };
  }, [supplyContainer]);

  useEffect(() => {
    if (!filteredData) {
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
  }, [filteredData]);

  return (
    <div className="sticky top-0 h-full border-r border-gray-200">
      <div className="p-6 h-full min-w-72 w-72 flex flex-col">
        <div>
          <h2>Supply Map</h2>
          <div ref={gotSupplyContainer}></div>
        </div>
        <div>
          <h2>Demand Map</h2>
          <div ref={gotDemandContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default Navigator;
