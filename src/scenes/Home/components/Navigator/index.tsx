import { Filter, useData } from "@data/useData";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AbstractMapCanvas } from "./canvas";
import P5 from "p5";
import KR_CITIES from "@utils/cities";
import KoreaMap from "./map";
import Resizer from "./mapResizer";
import AbstractMap from "./AbstractMap";

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
        p5.rect(0, 0, width, height);
        abstractMapCanvas.render();
      };
    }, supplyContainer);
    return () => {
      canvas.remove();
    };
  }, [supplyContainer]);

  const allDataFilteredByYear = useMemo(() => {
    const year = filter.year;
    if (!allData || !year) {
      return null;
    }
    return {
      supply: allData.supply.filter((s) => s.year === year),
      demand: allData.demand.filter((d) => d.year === year),
      events: allData.events.filter((e) => e.year === year),
    };
  }, [allData, filter.year]);

  const sumOfAllDonationPerCity = useMemo(() => {
    const citySum = new Map<string, number>();
    for (const s of allData.supply) {
      if (!citySum.has(s.city)) {
        citySum.set(s.city, 0);
      }
      citySum.set(s.city, citySum.get(s.city)! + s.total_unit);
    }
    return citySum;
  }, [allData]);

  const maxDonation = useMemo(() => {
    return Math.max(...Array.from(sumOfAllDonationPerCity.values()));
  }, [sumOfAllDonationPerCity]);
  const minDonation = useMemo(() => {
    return Math.min(...Array.from(sumOfAllDonationPerCity.values()));
  }, [sumOfAllDonationPerCity]);

  useEffect(() => {
    if (!allDataFilteredByYear) {
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
    const filteredData = allDataFilteredByYear;
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
  }, [allDataFilteredByYear, supplyContainer]);

  return (
    <div className="sticky top-0 h-full border-r border-gray-200">
      <div className="p-6 h-full min-w-72 w-72 flex flex-col">
        <h2>Heat Map</h2>
        {/* <Resizer>
          <KoreaMap
            width={50}
            height={50}
            setFilter={setFilter}
            filter={filter}
            filteredData={allData}
            maxDonation={maxDonation}
            minDonation={minDonation}
          />
        </Resizer> */}
        <h2>Bubble Map</h2>
        <Resizer>
          {/* <div ref={gotSupplyContainer}></div> */}
          <AbstractMap
            filter={filter}
            filteredData={allData}
            width={50}
            height={50}
          />
        </Resizer>
        {/* <div>
          <h2>Demand Map</h2>
          <div ref={gotDemandContainer}></div>
        </div> */}
      </div>
    </div>
  );
};

export default Navigator;
