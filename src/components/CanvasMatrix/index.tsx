import { BalancerProps } from "@components/Balancer";
import CanvasRow from "@components/CanvasRow";
import { FC, useMemo } from "react";

export interface CanvasMatrixProps {
  data: {
    year: number;
    data: Omit<BalancerProps, "width" | "maxEvents" | "thk">[];
  }[];
}

const CanvasMatrix: FC<CanvasMatrixProps> = ({ data }) => {
  const sorted = useMemo(() => data.sort((a, b) => a.year - b.year), [data]);
  const maxEvents = useMemo(
    () =>
      Math.max(
        ...sorted.flatMap((item) =>
          item.data.map((balancer) => balancer.events.length)
        )
      ),
    [sorted]
  );
  const maxSupply = useMemo(
    () => Math.max(...sorted.flatMap((item) => item.data.map((b) => b.supply))),
    [sorted]
  );
  const maxDemand = useMemo(
    () => Math.max(...sorted.flatMap((item) => item.data.map((b) => b.demand))),
    [sorted]
  );
  const minSupply = useMemo(
    () => Math.min(...sorted.flatMap((item) => item.data.map((b) => b.supply))),
    [sorted]
  );
  const minDemand = useMemo(
    () => Math.min(...sorted.flatMap((item) => item.data.map((b) => b.demand))),
    [sorted]
  );

  return (
    <div>
      {sorted.map((item, index) => (
        <CanvasRow
          key={index}
          balancers={item.data}
          maxEvents={maxEvents}
          maxDemand={maxDemand}
          maxSupply={maxSupply}
          minSupply={minSupply}
          minDemand={minDemand}
        />
      ))}
    </div>
  );
};

export default CanvasMatrix;
