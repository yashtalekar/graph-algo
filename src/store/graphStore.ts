// src/store/graphStore.ts
"use client";
import { create } from "zustand";
import Graph from "graphology";

interface GraphState {
  graph: Graph | null;
  graphVersion: number;
  setGraph: (g: Graph) => void;
  incrementGraphVersion: () => void;
}

const useGraphStore = create<GraphState>((set) => ({
  graph: null,
  graphVersion: 0,
  setGraph: (g) => set({ graph: g }),
  incrementGraphVersion: () =>
    set((state) => ({ graphVersion: state.graphVersion + 1 })),
}));

export default useGraphStore;
