"use client";

import React, { useEffect } from "react";
import useGraphStore from "@/store/graphStore";

export default function DFSPage() {
  const { graph } = useGraphStore();

  useEffect(() => {
    if (graph) {
      // Do some DFS logic or just console.log
      console.log("We have the same graph from BFS page?", graph);
    }
  }, [graph]);

  return <div>DFS Page - same global graph!</div>;
}
