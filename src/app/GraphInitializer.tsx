// app/GraphInitializer.tsx
"use client";

import { useEffect } from "react";
import { loadGraph } from "@/lib/graph-logic";
import useGraphStore from "@/store/graphStore";

export default function GraphInitializer() {
  const { graph, setGraph } = useGraphStore();

  useEffect(() => {
    if (!graph) {
      loadGraph()
        .then((loaded) => {
          setGraph(loaded);
          console.log("Global graph loaded successfully.");
        })
        .catch((err) => console.error("Error loading graph:", err));
    }
  }, [graph, setGraph]);

  // Render nothing; it just runs the effect.
  return null;
}
