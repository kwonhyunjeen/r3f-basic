import React from "react";

interface SceneTemplateProps {
  children: React.ReactNode;
  code?: React.ReactNode;
  description: React.ReactNode;
  guide?: React.ReactNode;
  height?: string;
  title: string;
}

export const SceneTemplate = ({
  children,
  code,
  description,
  guide,
  height = "h-[400px] md:h-[500px]",
  title,
}: SceneTemplateProps) => {
  const [showCode, setShowCode] = React.useState(false);

  return (
    <div className="flex flex-col w-full max-w-5xl gap-6 m-auto">
      {/* Description */}
      <div className="w-full flex flex-col">
        <div className="bg-white rounded-lg">
          <h2 className="text-xl font-bold text-amber-600">{title}</h2>
          <div className="prose prose-headings:text-amber-600  prose-a:text-amber-600">{description}</div>
        </div>
      </div>

      {/* Rendering */}
      <div className="w-full rounded-lg overflow-hidden ">
        <div className={`w-full ${height}`}>{children}</div>
      </div>

      {/* Guide - CodeSandbox */}
      {guide && (
        <div className="w-full flex">
          <div className="w-full bg-amber-50 p-4 rounded-md mt-6">
            <h4 className="font-medium text-amber-800">Try it out</h4>
            <p className="text-sm text-amber-700">{guide}</p>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="text-sm px-4 py-2 rounded-md border border-amber-200 bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showCode && <>{code && <div className="w-full mt-4">{code}</div>}</>}
    </div>
  );
};
