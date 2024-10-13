import * as d3 from "d3";
import Graph from "graphology";

// Function to visualize the graph with D3.js
export function visualizeGraph(graph: Graph, svgElement: SVGSVGElement) {
  const width = 800;
  const height = 600;

  // Select the SVG container (ensure this exists in your HTML)
  const svg = d3.select(svgElement).attr("width", width).attr("height", height);

  // Extract nodes and edges from Graphology
  //TODO: instead of instantiating node x and y here, to it in graphology (graph-logic) or even better, in graph-data.json
  const nodes = graph.nodes().map((node) => ({ id: node, x: 0, y: 0 }));
  const links = graph.edges().map((edge) => ({
    source: graph.source(edge),
    target: graph.target(edge),
  }));

  // Create the D3 force simulation
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d: any) => d.id)
    )
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

  // Create lines for the edges
  const link = svg
    .append("g")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .style("stroke", "#aaa");

  // Create circles for the nodes
  const node = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("fill", "blue")
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  // Add labels to the nodes
  const label = svg
    .append("g")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("dy", -15)
    .attr("text-anchor", "middle")
    .text((d: any) => d.id);

  // Update positions during the simulation
  simulation.on("tick", () => {
    link
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

    node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

    label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
  });

  // Drag event handlers
  function dragstarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event: any, d: any) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}
