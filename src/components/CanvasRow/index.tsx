import { BalancerProps } from "@components/Balancer";
import Heartbeat from "@components/Heartbeat";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import P5 from "p5";
import { MultiBeatCanvas } from "./multiBeatCanvas";

interface CanvasRowProps {
  balancers: Omit<BalancerProps, "width" | "maxEvents" | "thk">[];
  maxEvents: number;
}

const CanvasRow: FC<CanvasRowProps> = ({ balancers, maxEvents }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const p5Canvas = useMemo(() => {
    if (!container) {
      return;
    }
    const canvas = new P5((p5: P5) => {
      const width = container.clientWidth;
      const height = width / 12;
      const multiBeatCanvas = new MultiBeatCanvas(p5, width, height);
      p5.setup = () => {
        p5.createCanvas(100 * 12, 100);
        p5.background(0);
      };
      p5.draw = () => {
        multiBeatCanvas.render();
      };
    }, container);

    return canvas;
  }, [container]);

  const gotContainer = useCallback((element: HTMLDivElement) => {
    if (!element) {
      return;
    }
    setContainer(element);
  }, []);

  return (
    <div
      ref={gotContainer}
      style={{
        width: "100%",
        height: 100,
      }}
    ></div>
  );
};

export default CanvasRow;
