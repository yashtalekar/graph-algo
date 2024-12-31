import * as d3 from "d3";
import Graph from "graphology";

export function visualizeGraph(graph: Graph, svgElement: SVGSVGElement) {
  const width = 800;
  const height = 600;

  // Select the SVG container
  const svg = d3.select(svgElement).attr("width", width).attr("height", height);

  // Clear existing content
  svg.selectAll("*").remove();

  // Add zoom support
  const g = svg.append("g");

  const zoom = d3
    .zoom()
    .scaleExtent([0.1, 4]) // min/max zoom
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

  svg.call(zoom);

  // Extract nodes and edges from Graphology
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
  const link = g // Changed from svg to g
    .append("g")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .style("stroke", "#aaa");

  // Create circles for the nodes
  const node = g // Changed from svg to g
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
        .subject(dragSubject) // Added to handle dragging with zoom
    );

  // Add labels to the nodes
  const label = g // Changed from svg to g
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

  // Drag event handlers (modified to work with zoom)
  function dragSubject(event: any) {
    const transform = d3.zoomTransform(svg.node()!);
    const x = transform.invertX(event.x);
    const y = transform.invertY(event.y);
    return simulation.find(x, y);
  }

  function dragstarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event: any, d: any) {
    const transform = d3.zoomTransform(svg.node()!);
    d.fx = transform.invertX(event.x);
    d.fy = transform.invertY(event.y);
  }

  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  // Optional: Center initial view
  const initialTransform = d3.zoomIdentity
    .translate(width / 2, height / 2)
    .scale(1);
  svg.call(zoom.transform, initialTransform);

  // Return these if you need to access them from outside
  return {
    zoom,
    simulation,
    svg,
    g,
  };
}

export function visualizeGraphWithState(
  graph: Graph,
  svgElement: SVGSVGElement
) {
  const svg = d3.select(svgElement);
  // Select existing circles and update their color based on state
  const nodes = svg.selectAll("g").selectAll("circle"); // Updated selector
  nodes.attr("fill", (d: any) => {
    const state = graph.getNodeAttribute(d.id, "state");
    switch (state) {
      case "visited":
        return "green";
      case "current":
        return "orange";
      case "queued":
        return "yellow";
      default:
        return "blue";
    }
  });
}
