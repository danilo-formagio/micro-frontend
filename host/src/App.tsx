import { lazy, Suspense } from "react";

const MicroFrontend1 = lazy(() => import("MicroFrontend1/Component"));
const MicroFrontend2 = lazy(() => import("MicroFrontend2/Component"));

export function App() {
  return (
    <div className="App">
      <h1>Shell</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <MicroFrontend1 />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <MicroFrontend2 />
      </Suspense>
    </div>
  );
}
