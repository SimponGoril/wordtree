import React, { useEffect } from "react";
 
import * as d3 from "d3";
 
export const useD3 = (renderGraph: any, noOfNodes: number, noOfLinks: number) => {
  const ref = React.useRef(null);
 
  useEffect(() => {
    renderGraph(d3.select(ref.current));
    return () => {};
  }, [noOfLinks, noOfNodes]);
 
  return ref;
};