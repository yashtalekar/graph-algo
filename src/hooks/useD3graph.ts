// src/hooks/useD3Graph.ts
"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import Graph from "graphology";
import { visualizeGraph, visualizeGraphWithState } from "@/lib/graph-visualize";

interface D3GraphOptions {
  width?: number;
  height?: number;
  structureVersion?: number;
  colorVersion?: number;

  // TODO:
  forceStrength?: number;
  linkDistance?: number;
  chargeStrength?: number;
  onNodeClick?: (nodeId: string) => void;
  onEdgeClick?: (edgeId: string) => void;
}

export function useD3Graph(graph: Graph | null, options: D3GraphOptions = {}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const {
    width = 800,
    height = 600,
    structureVersion = 0,
    colorVersion = 0,
  } = options;

  // Handle structure changes
  useEffect(() => {
    if (!graph || !svgRef.current) return;

    // Clear old content
    d3.select(svgRef.current).selectAll("*").remove();

    // Initialize visualization
    visualizeGraph(graph, svgRef.current);
    // return () => {
    //   // Cleanup force simulation
    //   d3.select(svgRef.current).selectAll("*").remove();
    // };
  }, [graph, structureVersion, width, height]);

  // Handle color changes
  useEffect(() => {
    if (!graph || !svgRef.current) return;

    // Update colors without reinitializing force layout
    visualizeGraphWithState(graph, svgRef.current);
    // return () => {
    //   // Cleanup force simulation
    //   d3.select(svgRef.current).selectAll("*").remove();
    // };
  }, [graph, colorVersion]);

  return {
    svgRef,
    width,
    height,
  };
}
