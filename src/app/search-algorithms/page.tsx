import GraphDisplay from "@/components/graph-display";
import Panel from "@/components/panel";
import Graph from "graphology";

export default function Page() {
  return (
    <>
      <GraphDisplay />
      <Panel title="Test panel" text="This is some text." />
    </>
  );
}
