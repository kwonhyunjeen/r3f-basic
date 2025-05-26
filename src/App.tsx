import { useState } from "react";
import "./index.css";
import { BasicScene } from "./pages/BasicScene";
import { LightsScene } from "./pages/LightsScene";

const EXAMPLES = {
  basic: { label: "Basic", component: <BasicScene /> },
  lights: { label: "Lights", component: <LightsScene /> },
} as const;

type ExampleKey = keyof typeof EXAMPLES;

function App() {
  const [selected, setSelected] = useState<ExampleKey>("basic");

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>R3F Basic Examples</h1>
      </header>

      <main className="app-main">
        <nav className="app-nav">
          <ul>
            {Object.entries(EXAMPLES).map(([key, { label }]) => (
              <li key={key} className={key === selected ? "active" : ""} onClick={() => setSelected(key as ExampleKey)}>
                {label}
              </li>
            ))}
          </ul>
        </nav>

        <section className="app-content">{EXAMPLES[selected].component}</section>
      </main>
    </div>
  );
}

export default App;
