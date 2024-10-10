import React from "react";
import HeartbeatCanvas from "./canvas";

export interface HeartbeatProps {
  /**
   * Width of the Balancer's container
   */
  width: number;
  /*
   * How much supply was available for this Balancer?
   */
  supply: number;
  /**
   * How much demand was there for this Balancer?
   */
  demand: number;
  /**
   * How many events were took place in this Balancer?
   */
  events: number;
  /**
   * The maximum number of events in any Balancer in the matrix
   */
  maxEvents: number;
}

const Heartbeat: React.FC<HeartbeatProps> = ({
  width,
  supply,
  demand,
  events,
  maxEvents,
}) => {
  return (
    <HeartbeatCanvas
      width={width}
      supply={supply}
      demand={demand}
      events={events}
      maxEvents={maxEvents}
    />
  );
};

export default Heartbeat;
