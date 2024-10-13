import GraphDisplay from "@/components/graph-display";
import Panel from "@/components/panel";
import Graph from "graphology";

export default function Page() {
  return (
    <>
      <p>Search Algorithms Page</p>
      <GraphDisplay />
      <Panel title="Test panel" text="This is some text." />
    </>
  );
}
