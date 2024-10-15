import { useRef, useEffect, FC } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";

export interface CityMapProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const CityMap: FC<CityMapProps> = ({ value, onChange }) => {
  const mapRef = useRef<mapboxgl.Map>();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibW9yZ2FuZGRvYW5lIiwiYSI6ImNsbjNzam9ncjBhcGwycnA0ZmgyM3poY2oifQ.PzQKA94jSqglDJUnLNYvfg";

    const style = "mapbox://styles/morganddoane/cm24ykoqt00dt01qde43t908w";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style,
      // center on korea
      center: [127.827, 36.082],
      zoom: 5.5,
      pitch: 20,
      bearing: -17.6,
      interactive: true,
      refreshExpiredTiles: true,
    });

    mapRef.current.on("click", (e) => {
      const layers = mapRef.current?.getStyle()?.layers;
      console.log(layers);
      const features = mapRef.current?.queryRenderedFeatures(e.point, {});

      if (!features || !features.length) {
        return;
      } else {
        const city = features[0].properties?.name;
        if (city) {
          onChange(city);
        }
      }
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <>
      <div id="map-container" className="w-96 h-full" ref={mapContainerRef} />
    </>
  );
};

export default CityMap;
