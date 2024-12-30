import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Welcome to Graph Algorithm Visualizer
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore and interact with graph algorithms like Breadth-First Search,
          Depth-First Search, and more. Visualize the steps and gain insights
          into how these algorithms work in real-time.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            href="/search-algorithms"
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Explore Algorithms
          </Link>
          <Link
            href="/mathematical-definitions"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md shadow-md hover:bg-gray-300 transition"
          >
            Learn Definitions
          </Link>
        </div>
        <div className="relative w-full h-64 md:h-96 bg-gray-300 rounded-lg mb-6">
          <p className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
            Placeholder for a graph image or interactive visualization
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Interactive Visualizations
            </h3>
            <p className="text-gray-600 text-sm">
              See step-by-step visualizations of graph algorithms in action.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Customizable Graphs
            </h3>
            <p className="text-gray-600 text-sm">
              Add your own nodes, edges, and customize layouts as you explore.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Learn by Doing
            </h3>
            <p className="text-gray-600 text-sm">
              Dive deep into concepts with hands-on exploration of algorithms.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
