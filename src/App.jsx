import { Suspense } from "react";
import "./App.css";
import RouteRenderer from "./routing/RouteRenderer";

function App() {
  return (
    <Suspense
      fallback={
        <div className="spinner">
          {" "}
          <div></div>
          <div></div>
          <div></div>
        </div>
      }
    >
      <RouteRenderer />
    </Suspense>
  );
}

export default App;
