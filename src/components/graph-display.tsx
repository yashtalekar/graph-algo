"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  loadGraph,
  bfsStepByStep,
  updateGraphWithBFSState,
} from "../app/lib/graph-logic";
import { visualizeGraph } from "../app/lib/graph-visualize";
import Graph from "graphology";

const GraphDisplay: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null); // Reference to the SVG element
  const [graph, setGraph] = useState<Graph | null>(null);

  const graphInitialized = useRef(false); // New flag to track if the graph has been initialized

  useEffect(() => {
    // Load the graph using Graphology and set it in state

    // TODO: Load graph should be passes as a prop to this component, so we don't need to import it here.
    loadGraph()
      .then((graph) => {
        setGraph(graph); // Store the graph in the state
        console.log(bfsStepByStep(graph, "A")); // Log the BFS steps
      })
      .catch((error) => console.error("Error loading graph:", error));
  }, []);

  useEffect(() => {
    // Once the graph is loaded, visualize it using D3.js
    if (graph && svgRef.current && !graphInitialized.current) {
      visualizeGraph(graph, svgRef.current); // Pass graph and SVG element to visualizeGraph
      graphInitialized.current = true; // Set the flag to true to prevent re-rendering
    }
  }, [graph]); // Run this effect when the graph is available

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 w-full max-w-4xl mx-auto">
      <h1 className="text-lg font-semibold mb-4">Graph Visualization</h1>
      {/* D3 will render the graph into this SVG */}
      <svg
        ref={svgRef}
        width="800"
        height="600"
        className="w-full h-auto"
      ></svg>
    </div>
  );
};

export default GraphDisplay;
