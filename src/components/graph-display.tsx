"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  loadGraph,
  bfsStepByStep,
  updateGraphWithBFSState,
} from "../lib/graph-logic";
import {
  visualizeGraph,
  visualizeGraphWithState,
} from "../lib/graph-visualize";
import Graph from "graphology";

const GraphDisplay: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null); // Reference to the SVG element
  const [graph, setGraph] = useState<Graph | null>(null);

  const [bfsSteps, setBfsSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const graphInitialized = useRef(false); // New flag to track if the graph has been initialized

  useEffect(() => {
    // Load the graph using Graphology and set it in state

    // TODO: Load graph should be passes as a prop to this component, so we don't need to import it here.
    loadGraph()
      .then((graph) => {
        setGraph(graph); // Store the graph in the state
        // console.log(bfsStepByStep(graph, "A")); // Log the BFS steps
        setBfsSteps(bfsStepByStep(graph, "A"));
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

  // Function to move to the next step
  const nextStep = () => {
    if (currentStep < bfsSteps.length - 1) {
      if (graph && svgRef.current) {
        updateGraphWithBFSState(graph, bfsSteps[currentStep + 1]); // If we call this after the setCurrentStep, it won't be up to date because react's set state is asynchronous by nature.
        // Will this next line execute immedieately after graph is updated? Or is graph update asychronous
        visualizeGraphWithState(graph, svgRef.current);
        //console.log("Graph state is: ", graph);
        console.log("in graph display, graph nodes are ", graph.nodes());
      }
      setCurrentStep(currentStep + 1);
    }
  };
  console.log("current step is:", currentStep);
  console.log("bfsSteps is: ", bfsSteps);

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
      <button onClick={nextStep}>Next Step</button>
    </div>
  );
};

export default GraphDisplay;
