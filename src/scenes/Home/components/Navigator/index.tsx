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

  return (
    <div className="sticky top-0 h-full border-r border-gray-200">
      <div className="p-6 h-full min-w-72 w-72 flex flex-col">
        <h2>Heat Map</h2>
        <Resizer>
          <KoreaMap
            width={50}
            height={50}
            setFilter={setFilter}
            filter={filter}
            filteredData={allData}
            maxDonation={maxDonation}
            minDonation={minDonation}
          />
        </Resizer>
        <h2>Bubble Map</h2>
        <Resizer>
          {/* <div ref={gotSupplyContainer}></div> */}
          <AbstractMap
            filter={filter}
            setFilter={setFilter}
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
