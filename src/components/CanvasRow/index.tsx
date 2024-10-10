import { BalancerProps } from "@components/Balancer";
import Heartbeat from "@components/Heartbeat";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import P5 from "p5";

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
    return new P5((p5: P5) => {
      p5.setup = () => {
        p5.createCanvas(100 * 12, 100);
        p5.background(0);
      };
      p5.draw = () => {
        p5.background(255);
        p5.fill(255);
        p5.ellipse(p5.width / 2, p5.height / 2, 50, 50);
        // for each
        const squareHeight = 100;
        for (let x = 0; x < p5.width; x += squareHeight) {
          p5.ellipse(x + squareHeight / 2, p5.height / 2, 20, 20);
        }
        // draw occurs for each frame
      };
    }, container);
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
