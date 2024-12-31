"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Graph from "graphology";
import { visualizeGraph, visualizeGraphWithState } from "@/lib/graph-visualize";
import useGraphStore from "@/store/graphStore";

export default function GraphDisplay() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // We have 2 separate counters
  const { graph, structureVersion, colorVersion } = useGraphStore();

  // On structure changes, we do a full re-init of the force layout
  useEffect(() => {
    if (graph && svgRef.current) {
      d3.select(svgRef.current).selectAll("*").remove();
      visualizeGraph(graph, svgRef.current);
    }
  }, [graph, structureVersion]);

  // On color changes, just update the color of existing nodes
  useEffect(() => {
    if (graph && svgRef.current) {
      visualizeGraphWithState(graph, svgRef.current);
    }
  }, [graph, colorVersion]);

  return (
    <div className="relative bg-white shadow-lg rounded-lg border border-gray-300 max-w-full w-full mx-auto">
      <svg
        ref={svgRef}
        className="w-full h-[600px] "
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
}
