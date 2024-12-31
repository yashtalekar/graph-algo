// src/components/GraphDisplay.tsx
"use client";
import React from "react";
import useGraphStore from "@/store/graphStore";
import { useD3Graph } from "@/hooks/useD3graph";

export default function GraphDisplay() {
  const { graph, structureVersion, colorVersion } = useGraphStore();

  const { svgRef, width, height } = useD3Graph(graph, {
    width: 800,
    height: 600,
    structureVersion,
    colorVersion,
  });

  return (
    <div className="relative bg-white shadow-lg rounded-lg border border-gray-300 max-w-full w-full mx-auto">
      <svg ref={svgRef} className="w-full h-[600px]" />
    </div>
  );
}
