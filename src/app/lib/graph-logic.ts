import Graph from "graphology";

// Function to load the graph data and initialize Graphology
export async function loadGraph(): Promise<Graph> {
  try {
    const response = await fetch("/graph-data.json");
    const data = await response.json();

    // Initialize the Graphology graph
    const graph = Graph.from(data);

    return graph;
  } catch (error) {
    console.error("Error loading graph data:", error);
    throw error;
  }
}
