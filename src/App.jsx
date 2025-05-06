import { Suspense } from "react";
import "./App.css";
import RouteRenderer from "./routing/RouteRenderer";
import { Spinner } from "./partials/Componants/Spinner/spinner";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <RouteRenderer />
    </Suspense>
  );
}

export default App;
