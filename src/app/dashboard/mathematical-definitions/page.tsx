"use client";

import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function MathematicalDefinitions() {
  return (
    <MathJaxContext>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Fundamental Graph Definitions
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Learn the basic concepts and terminology of graph theory, explained
            clearly with mathematical notations and examples.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vertices */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Vertices
              </h2>
              <p className="text-gray-600">
                A vertex (plural: vertices) is a fundamental unit of a graph. It
                is typically represented as a point or a dot.
              </p>
              <p className="text-gray-600 mt-2">
                {/* You can use inline MathJax or just escape the string */}
                Example:{" "}
                <MathJax inline>
                  {"\\( V = \\{v_1, v_2, v_3, \\dots, v_n\\} \\)"}
                </MathJax>
              </p>
            </div>

            {/* Edges */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Edges
              </h2>
              <p className="text-gray-600">
                An edge connects two vertices in a graph. Edges can be directed
                or undirected, depending on the type of graph.
              </p>
              <p className="text-gray-600 mt-2">
                Example:{" "}
                <MathJax inline>
                  {"\\( E = \\{(v_1, v_2), (v_2, v_3), \\dots\\} \\)"}
                </MathJax>
              </p>
            </div>

            {/* Degree of a Vertex */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Degree of a Vertex
              </h2>
              <p className="text-gray-600">
                The degree of a vertex is the number of edges connected to it.
                For directed graphs, we define in-degree and out-degree.
              </p>
              <p className="text-gray-600 mt-2">
                <MathJax inline>
                  {
                    "\\( \\text{Degree of } v = \\text{in-degree}(v) + \\text{out-degree}(v) \\)"
                  }
                </MathJax>
              </p>
            </div>

            {/* Directed vs. Undirected Graphs */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Directed vs. Undirected Graphs
              </h2>
              <p className="text-gray-600">
                In a directed graph, edges have a direction, indicated by an
                arrow. In an undirected graph, edges have no direction.
              </p>
              <p className="text-gray-600 mt-2">
                Directed Example:{" "}
                <MathJax inline>{"\\( v_1 \\to v_2 \\)"}</MathJax>
              </p>
              <p className="text-gray-600 mt-2">
                Undirected Example:{" "}
                <MathJax inline>{"\\( (v_1, v_2) \\)"}</MathJax>
              </p>
            </div>

            {/* Paths and Cycles */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Paths and Cycles
              </h2>
              <p className="text-gray-600">
                A path is a sequence of edges that connects a sequence of
                vertices. A cycle is a path that starts and ends at the same
                vertex.
              </p>
              <p className="text-gray-600 mt-2">
                Example Path:{" "}
                <MathJax inline>{"\\( v_1 \\to v_2 \\to v_3 \\)"}</MathJax>
              </p>
              <p className="text-gray-600 mt-2">
                Example Cycle:{" "}
                <MathJax inline>
                  {"\\( v_1 \\to v_2 \\to v_3 \\to v_1 \\)"}
                </MathJax>
              </p>
            </div>

            {/* Connected Components */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Connected Components
              </h2>
              <p className="text-gray-600">
                A connected component is a subset of a graph where any two
                vertices are connected by a path.
              </p>
              <p className="text-gray-600 mt-2">
                Example:{" "}
                <MathJax inline>{"\\( \\{v_1, v_2, v_3\\} \\)"}</MathJax> form a
                connected component if there are paths between them.
              </p>
            </div>
          </div>
        </div>
      </main>
    </MathJaxContext>
  );
}
