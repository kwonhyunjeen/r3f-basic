import { useState } from "react";
import "./index.css";
import { BasicScene, LightsScene, MaterialsScene } from "./pages";
import { Sidebar } from "./components/Sidebar";

const EXAMPLES = {
  basic: { label: "Basic", component: <BasicScene /> },
  lights: { label: "Lights", component: <LightsScene /> },
  materials: { label: "Materials", component: <MaterialsScene /> },
} as const;

type ExampleKey = keyof typeof EXAMPLES;

function App() {
  const [selected, setSelected] = useState<ExampleKey>("basic");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-zinc-200 backdrop-blur-sm bg-white/70 sticky top-0 z-30">
        <div className="mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="mr-3 p-1 rounded-md md:hidden text-amber-600 hover:bg-amber-50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {menuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 12h18" />
                    <path d="M3 6h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
            <h1 className="text-xl font-medium text-amber-600">R3F Basic Examples</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/kwonhyunjeen/r3f-basic"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-700"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div className="flex flex-1 h-[calc(100vh-65px)]">
        <nav className="hidden md:block w-64 flex-shrink-0 h-full sticky top-[65px] overflow-y-auto border-r border-zinc-200 bg-white z-20">
          <Sidebar selected={selected} setSelected={setSelected} items={EXAMPLES} />
        </nav>

        {menuOpen && (
          <>
            <div className="fixed inset-0 bg-zinc-900/50 z-10 md:hidden" onClick={() => setMenuOpen(false)} />
            <nav className="block md:hidden fixed top-[65px] z-30 w-full h-[calc(100vh-65px)] overflow-y-auto bg-white border-r border-zinc-200">
              <Sidebar
                selected={selected}
                setSelected={setSelected}
                onClose={() => setMenuOpen(false)}
                items={EXAMPLES}
              />
            </nav>
          </>
        )}

        <section className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-6">{EXAMPLES[selected].component}</div>
        </section>
      </div>
    </div>
  );
}

export default App;
