export type SidebarProps<T extends string> = {
  selected: T;
  setSelected: (key: T) => void;
  items: Record<T, { label: string }>;
  onClose?: () => void;
};

export function Sidebar<T extends string>({ selected, setSelected, items, onClose }: SidebarProps<T>) {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Examples</h2>
      </div>
      <ul className="space-y-1">
        {Object.entries(items).map(([key, value]) => {
          const typedKey = key as T;
          const { label } = value as { label: string };
          return (
            <li key={typedKey}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  selected === typedKey ? "bg-orange-100 text-orange-600" : "text-zinc-700 hover:bg-zinc-100"
                }`}
                onClick={() => {
                  setSelected(typedKey);
                  onClose?.();
                }}
              >
                <span className="flex items-center">
                  <span
                    className={`mr-2 h-2 w-2 rounded-full ${selected === typedKey ? "bg-orange-500" : "bg-zinc-300"}`}
                  ></span>
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 pt-6 border-t border-zinc-200">
        <div className="rounded-lg bg-amber-50 p-3">
          <h3 className="text-sm font-medium text-amber-800 mb-2">About</h3>
          <p className="text-xs text-amber-700">
            These examples demonstrate key React Three Fiber concepts with interactive CodeSandbox demos.
          </p>
        </div>
      </div>
    </div>
  );
}
