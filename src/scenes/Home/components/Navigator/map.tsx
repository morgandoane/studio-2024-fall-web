import React, { FC, useEffect, useRef } from "react";

import * as d3 from "d3";
import * as topojson from "topojson-client";
import topoData from "./provinces-topo-simple.json";
import { Filter } from "@data/useData";

interface CityData {
  lon: number;
  lat: number;
  pop: string;
  name: string;
}

interface KoreaMapProps {
  width: number;
  height: number;
  setFilter: (newFilter: Filter) => void;
  filter: Filter;
}

const KoreaMap: FC<KoreaMapProps> = ({ width, height, setFilter, filter }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    // clear svg
    d3.select(svgRef.current).selectAll("*").remove();

    const colorScale = d3
      .scaleLinear<string>()
      .range(["yellowgreen", "yellow"])
      .domain([20, 50]);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const map = svg.append("g").attr("id", "map");
    const points = svg.append("g").attr("id", "cities");

    const radius = d3.scaleSqrt().domain([0, 1e6]).range([0, 15]);

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width / 2 + 100}, ${height - 20})`)
      .selectAll("g")
      .data([1e6, 5e6, 1e7])
      .enter()
      .append("g");

    // legend
    //   .append("circle")
    //   .attr("cy", (d) => -radius(d))
    //   .attr("r", radius);

    // legend
    //   .append("text")
    //   .attr("y", (d) => -2 * radius(d))
    //   .attr("dy", "1.3em")
    //   .text(d3.format(".1s"));
    // const features = topojson.feature(objects, topoData.objects.provinces);
    console.log(topoData);

    const geojson: any = topojson.feature(
      topoData as any,
      topoData.objects["provinces-geo"] as any
    );

    const center = d3.geoCentroid(geojson as any);

    const projection = d3
      .geoMercator()
      .center(center)
      .scale(2000)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);
    const bounds = path.bounds(geojson);
    const widthScale = (bounds[1][0] - bounds[0][0]) / width;
    const heightScale = (bounds[1][1] - bounds[0][1]) / height;
    const scale = 1 / Math.max(widthScale, heightScale);

    map
      .selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("class", (d: any) => `province c${d.properties.code}`)
      .attr("stroke", "white")
      .attr("d", path as any)
      .on("click", (e, d: any) => {
        setFilter({
          ...filter,
          city: d.properties.name_eng,
        });
        console.log(d.properties.name_eng);
      });

    d3.csv("cities.csv").then((data: d3.DSVParsedArray<CityData> | any) => {
      points
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d: any) => projection([+d.lon, +d.lat])![0])
        .attr("cy", (d: any) => projection([+d.lon, +d.lat])![1])
        .attr("r", (d: any) => 10 * Math.sqrt(+d.pop))
        .style("fill", (d: any) => colorScale(+d.pop));

      points
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d: any) => projection([+d.lon, +d.lat])![0])
        .attr("y", (d: any) => projection([+d.lon, +d.lat])![1] + 5)
        .text((d: any) => d.name);
    });
  }, [svgRef, width, height]);

  return (
    <div id="chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default KoreaMap;
