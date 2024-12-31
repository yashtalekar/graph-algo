"use client";

import React, { useEffect, useState } from "react";
import Graph from "graphology";
import GraphDisplay from "@/components/graph-display";
import useGraphStore from "@/store/graphStore";
import {
  loadGraph,
  bfsStepByStep,
  updateGraphWithBFSState,
} from "@/lib/graph-logic";

export default function BFSPage() {
  const { graph, setGraph, incrementGraphVersion } = useGraphStore();
  const [bfsSteps, setBfsSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Load the graph from JSON if not already loaded
  // and compute BFS steps in local state
  useEffect(() => {
    if (!graph) {
      loadGraph()
        .then((g) => {
          setGraph(g); // store the graph in the global store
          setBfsSteps(bfsStepByStep(g, "A"));
        })
        .catch((err) => console.error("Error loading graph:", err));
    } else if (bfsSteps.length === 0) {
      // If we already have a graph but no BFS steps, compute them
      setBfsSteps(bfsStepByStep(graph, "A"));
    }
  }, [graph, bfsSteps, setGraph]);

  // Go to next BFS step
  const nextStep = () => {
    if (!graph) return;
    console.log("next step called!");
    console.log("bfsSteps is: ", bfsSteps);
    if (currentStep < bfsSteps.length - 1) {
      const nextIndex = currentStep + 1;
      const state = bfsSteps[nextIndex];

      // This sets the BFS info on the graph's node attributes
      updateGraphWithBFSState(graph, state);
      console.log("update graph with state called!");

      // Because Graphology mutates in place, we "touch" the store to trigger
      // a re-render in GraphDisplay. For example:
      setGraph(graph);
      incrementGraphVersion();

      // Advance local BFS step
      setCurrentStep(nextIndex);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">BFS Visualization</h1>

      {/* The graph display is a separate component that 
          just shows whatever is in the global `graph` */}
      <GraphDisplay />

      <button
        onClick={nextStep}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Next Step
      </button>
    </div>
  );
}
