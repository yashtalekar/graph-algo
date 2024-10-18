import Graph from "graphology";

interface BFSState {
  currentNode: string;
  visited: string[];
  queue: string[];
}

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

export function bfsStepByStep(graph: Graph, startNode: string): BFSState[] {
  const steps: BFSState[] = [];
  const visited = new Set<string>();
  const queue: string[] = [startNode];

  visited.add(startNode);

  // Record the initial step
  steps.push({
    currentNode: startNode,
    visited: Array.from(visited),
    queue: [...queue],
  });

  while (queue.length > 0) {
    const node = queue.shift() as string;
    graph.forEachNeighbor(node, (neighbor) => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        // Record each step after visiting a new node
        steps.push({
          currentNode: neighbor,
          visited: Array.from(visited),
          queue: [...queue],
        });
      }
    });
  }

  return steps;
}

export function updateGraphWithBFSState(graph: Graph, bfsState: BFSState) {
  // Reset all nodes and edges to default
  graph.forEachNode((node) => {
    graph.setNodeAttribute(node, "state", "default");
  });

  // Mark visited nodes
  bfsState.visited.forEach((node) => {
    graph.setNodeAttribute(node, "state", "visited");
  });

  // Mark current node
  graph.setNodeAttribute(bfsState.currentNode, "state", "current");

  // Mark queue nodes
  bfsState.queue.forEach((node) => {
    if (node !== bfsState.currentNode) {
      graph.setNodeAttribute(node, "state", "queued");
    }
  });
}
