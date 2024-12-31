"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Graph from "graphology";
import {
  visualizeGraph,
  visualizeGraphWithState,
} from "../lib/graph-visualize";
import useGraphStore from "@/store/graphStore";

export default function GraphDisplay() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const hasInitializedRef = useRef(false);

  // Subscribe to both graph + version
  const { graph, graphVersion } = useGraphStore();

  // 1) Initialize once
  useEffect(() => {
    if (graph && svgRef.current && !hasInitializedRef.current) {
      d3.select(svgRef.current).selectAll("*").remove();
      visualizeGraph(graph, svgRef.current);
      hasInitializedRef.current = true;
    }
  }, [graph]);

  // 2) Update colors whenever graph *or* version changes
  useEffect(() => {
    if (graph && svgRef.current) {
      console.log("Color update triggered by version=", graphVersion);
      visualizeGraphWithState(graph, svgRef.current);
    }
  }, [graph, graphVersion]);

  return (
    <div className="relative bg-white shadow-lg rounded-lg border border-gray-300 max-w-4xl mx-auto">
      Hello, World!
      <svg ref={svgRef} width="800" height="600" className="w-full h-auto" />
    </div>
  );
}
