"use client";
import { create } from "zustand";
import Graph from "graphology";

interface GraphState {
  graph: Graph | null;

  // Distinguish structural from color/algorithm changes:
  structureVersion: number;
  colorVersion: number;

  setGraph: (g: Graph) => void;

  // Increments when we add/remove nodes/edges
  incrementStructureVersion: () => void;

  // Increments when BFS or any algo changes node "state"
  incrementColorVersion: () => void;
}

const useGraphStore = create<GraphState>((set) => ({
  graph: null,

  structureVersion: 0,
  colorVersion: 0,

  setGraph: (g) => set({ graph: g }),

  incrementStructureVersion: () =>
    set((state) => ({ structureVersion: state.structureVersion + 1 })),

  incrementColorVersion: () =>
    set((state) => ({ colorVersion: state.colorVersion + 1 })),
}));

export default useGraphStore;
