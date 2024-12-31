"use client";

import React, { useEffect, useState } from "react";
import GraphDisplay from "@/components/graph-display";
import GraphEditor from "@/components/graph-editor";
import useGraphStore from "@/store/graphStore";
import { bfsStepByStep, updateGraphWithBFSState } from "@/lib/graph-logic";

export default function BFSPage() {
  const { graph, structureVersion, colorVersion, incrementColorVersion } =
    useGraphStore();
  const [bfsSteps, setBfsSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  /**
   * 1) Whenever the graph or graphVersion changes, re-run BFS from scratch.
   *    This ensures BFS steps reflect added/removed nodes/edges.
   */
  useEffect(() => {
    if (graph) {
      console.log("Recomputing BFS steps because graph or version changed.");
      setBfsSteps(bfsStepByStep(graph, "A"));
      setCurrentStep(0); // reset BFS step index to the start
    }
  }, [graph, structureVersion]);

  /**
   * 2) Advance BFS by one step
   */
  const nextStep = () => {
    if (!graph) return;
    if (currentStep < bfsSteps.length - 1) {
      const nextIndex = currentStep + 1;
      updateGraphWithBFSState(graph, bfsSteps[nextIndex]);
      incrementColorVersion(); // refresh the GraphDisplay
      setCurrentStep(nextIndex);
    }
  };

  return (
    <div className="flex flex-row items-start gap-4 p-4 w-full">
      {/* Left side: BFS & Graph */}
      <div className="flex-1 flex flex-col space-y-4">
        <h1 className="text-xl font-bold">BFS Visualization</h1>
        <GraphDisplay />
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-500 text-white rounded self-start"
        >
          Next BFS Step
        </button>
      </div>

      {/* Right side: Graph Editor */}
      <div className="w-1/3">
        <GraphEditor />
      </div>
    </div>
  );
}
