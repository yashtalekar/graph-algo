// src/components/graph-editor.tsx
"use client";

import React, { useState } from "react";
import Graph from "graphology";
import useGraphStore from "@/store/graphStore";

export default function GraphEditor() {
  const { graph, setGraph, incrementStructureVersion } = useGraphStore();

  const [nodeId, setNodeId] = useState("");
  const [edgeSource, setEdgeSource] = useState("");
  const [edgeTarget, setEdgeTarget] = useState("");

  const handleAddNode = () => {
    if (!graph || !nodeId) return;
    try {
      graph.addNode(nodeId.trim());
      setNodeId("");
      setGraph(graph);
      incrementStructureVersion();
    } catch (err) {
      console.error("Error adding node:", err);
    }
  };

  const handleRemoveNode = () => {
    if (!graph || !nodeId) return;
    try {
      graph.dropNode(nodeId.trim());
      setNodeId("");
      setGraph(graph);
      incrementStructureVersion();
    } catch (err) {
      console.error("Error removing node:", err);
    }
  };

  const handleAddEdge = () => {
    if (!graph || !edgeSource || !edgeTarget) return;
    try {
      graph.addEdge(edgeSource.trim(), edgeTarget.trim());
      setEdgeSource("");
      setEdgeTarget("");
      setGraph(graph);
      incrementStructureVersion();
    } catch (err) {
      console.error("Error adding edge:", err);
    }
  };

  const handleRemoveEdge = () => {
    if (!graph || !edgeSource || !edgeTarget) return;
    try {
      graph.dropEdge(edgeSource.trim(), edgeTarget.trim());
      setEdgeSource("");
      setEdgeTarget("");
      setGraph(graph);
      incrementStructureVersion();
    } catch (err) {
      console.error("Error removing edge:", err);
    }
  };

  const handleExportGraph = () => {
    if (!graph) return;
    const exported = graph.export();
    const dataStr = JSON.stringify(exported, null, 2);
    console.log("Exported Graph JSON:", dataStr);
    // Optionally trigger download, etc.
  };

  const handleImportGraph = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    try {
      const fileText = await file.text();
      const importedData = JSON.parse(fileText);
      const newGraph = Graph.from(importedData);
      setGraph(newGraph);
      incrementStructureVersion();
      console.log("Graph imported successfully.");
    } catch (err) {
      console.error("Error importing graph data:", err);
    }
    e.target.value = "";
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md shadow-sm space-y-4 w-full">
      <h2 className="text-lg font-semibold">Graph Editor</h2>

      {/* Add/Remove Node */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="nodeId" className="font-medium">
          Node ID
        </label>
        <input
          id="nodeId"
          type="text"
          value={nodeId}
          onChange={(e) => setNodeId(e.target.value)}
          className="border p-1 rounded"
          placeholder="e.g. 'A'"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleAddNode}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Add Node
          </button>
          <button
            onClick={handleRemoveNode}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Remove Node
          </button>
        </div>
      </div>

      {/* Add/Remove Edge */}
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Edge Source & Target</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={edgeSource}
            onChange={(e) => setEdgeSource(e.target.value)}
            className="border p-1 rounded w-1/2"
            placeholder="Source"
          />
          <input
            type="text"
            value={edgeTarget}
            onChange={(e) => setEdgeTarget(e.target.value)}
            className="border p-1 rounded w-1/2"
            placeholder="Target"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleAddEdge}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Add Edge
          </button>
          <button
            onClick={handleRemoveEdge}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Remove Edge
          </button>
        </div>
      </div>

      {/* Import/Export JSON */}
      <div className="space-y-2">
        <label className="font-medium block">Import Graph JSON</label>
        <input
          type="file"
          accept=".json"
          onChange={handleImportGraph}
          className="mb-2"
        />
        <button
          onClick={handleExportGraph}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Export Graph
        </button>
      </div>
    </div>
  );
}
