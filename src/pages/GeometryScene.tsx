import { Canvas } from "@react-three/fiber";
import { SceneTemplate } from "../components";
import { OrbitControls } from "@react-three/drei";
import { useControls, folder } from "leva";

// Define props for geometry display
interface GeometryDisplayProps {
  position: [number, number, number];
  geometry: JSX.Element;
  wireframe: boolean;
  color: string;
  metalness: number;
  roughness: number;
}

// Component for displaying a geometry with controls
const GeometryDisplay = ({ position, geometry, wireframe, color, metalness, roughness }: GeometryDisplayProps) => {
  return (
    <mesh position={position}>
      {geometry}
      <meshStandardMaterial color={color} wireframe={wireframe} metalness={metalness} roughness={roughness} />
    </mesh>
  );
};

// Description component for the geometry scene
const description = (
  <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
    <p>
      이 예제는 Three.js에서 제공하는 다양한 기본 형상(Geometry)을 탐색할 수 있게 해줍니다. 3D 객체의 기본 구성 요소인
      형상은 정점, 모서리, 면으로 구성되며, 다양한 복잡성과 용도를 가집니다.
    </p>

    <h3 className="text-lg font-medium mt-6 mb-2">기본 형상</h3>
    <p>Three.js는 다양한 기본 형상을 제공합니다:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        <code className="bg-gray-200">{"BoxGeometry"}</code> — 정육면체 또는 직육면체 형상
      </li>
      <li>
        <code className="bg-gray-200">{"SphereGeometry"}</code> — 구체 형상으로, 세그먼트 수로 부드러움을 조절
      </li>
      <li>
        <code className="bg-gray-200">{"CylinderGeometry"}</code> — 실린더 형상으로, 상단과 하단의 반지름을 다르게 설정
        가능
      </li>
      <li>
        <code className="bg-gray-200">{"ConeGeometry"}</code> — 원뿔 형상으로, 밑면 반지름과 높이를 조절 가능
      </li>
      <li>
        <code className="bg-gray-200">{"TorusGeometry"}</code> — 도넛 형태의 토러스 형상
      </li>
      <li>
        <code className="bg-gray-200">{"TorusKnotGeometry"}</code> — 매듭이 있는 복잡한 토러스 형상
      </li>
      <li>
        <code className="bg-gray-200">{"DodecahedronGeometry"}</code> — 12면체 형상
      </li>
      <li>
        <code className="bg-gray-200">{"TetrahedronGeometry"}</code> — 4면체(피라미드) 형상
      </li>
      <li>
        <code className="bg-gray-200">{"OctahedronGeometry"}</code> — 8면체 형상
      </li>
      <li>
        <code className="bg-gray-200">{"IcosahedronGeometry"}</code> — 20면체 형상
      </li>
      <li>
        <code className="bg-gray-200">{"PlaneGeometry"}</code> — 평면 형상으로, 세그먼트로 세분화 가능
      </li>
    </ul>

    <h3 className="text-lg font-medium mt-6 mb-2">형상 파라미터</h3>
    <p>형상은 다양한 파라미터로 조정할 수 있습니다:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        <strong>{"width, height, depth"}</strong> — BoxGeometry의 크기
      </li>
      <li>
        <strong>{"radius, widthSegments, heightSegments"}</strong> — 구체 크기와 세분화 정도
      </li>
      <li>
        <strong>{"radius, tube, tubularSegments, radialSegments"}</strong> — 토러스의 형태를 결정하는 값들
      </li>
      <li>
        <strong>{"p, q"}</strong> — TorusKnot의 매듭 형태를 결정하는 값들
      </li>
      <li>
        <strong>{"detail"}</strong> — 다면체(테트라헤드론, 옥타헤드론 등)의 세분화 정도
      </li>
    </ul>
  </div>
);

// Code component for embedding the codesandbox
const code = (
  <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden" }}>
    <iframe
      src="https://codesandbox.io/embed/nh833y?view=editor+%2B+preview&module=%2Fsrc%2Fpages%2FGeometryScene.tsx"
      style={{
        width: "100%",
        height: "500px",
        border: "none",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      title="r3f-basic"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  </div>
);

export const GeometryScene = () => {
  // Global controls for all geometries
  const globalControls = useControls("Global Settings", {
    wireframe: false,
    color: "#4080ff",
    material: folder({
      metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
      roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    }),
  });

  // Box geometry controls
  const boxControls = useControls("Box Geometry", {
    width: { value: 1.5, min: 0.1, max: 3, step: 0.1 },
    height: { value: 1.5, min: 0.1, max: 3, step: 0.1 },
    depth: { value: 1.5, min: 0.1, max: 3, step: 0.1 },
    widthSegments: { value: 1, min: 1, max: 10, step: 1 },
    heightSegments: { value: 1, min: 1, max: 10, step: 1 },
    depthSegments: { value: 1, min: 1, max: 10, step: 1 },
  });

  // Sphere geometry controls
  const sphereControls = useControls("Sphere Geometry", {
    radius: { value: 1, min: 0.1, max: 2, step: 0.1 },
    widthSegments: { value: 16, min: 3, max: 64, step: 1 },
    heightSegments: { value: 12, min: 2, max: 32, step: 1 },
  });

  // Cylinder geometry controls
  const cylinderControls = useControls("Cylinder Geometry", {
    radiusTop: { value: 1, min: 0, max: 2, step: 0.1 },
    radiusBottom: { value: 1, min: 0, max: 2, step: 0.1 },
    height: { value: 2, min: 0.1, max: 4, step: 0.1 },
    radialSegments: { value: 16, min: 3, max: 64, step: 1 },
  });

  // Cone geometry controls - uses cylinder with top radius 0
  const coneControls = useControls("Cone Geometry", {
    radius: { value: 1, min: 0.1, max: 2, step: 0.1 },
    height: { value: 2, min: 0.1, max: 4, step: 0.1 },
    radialSegments: { value: 16, min: 3, max: 64, step: 1 },
  });

  // Torus geometry controls
  const torusControls = useControls("Torus Geometry", {
    radius: { value: 1, min: 0.1, max: 2, step: 0.1 },
    tube: { value: 0.4, min: 0.1, max: 1, step: 0.05 },
    radialSegments: { value: 16, min: 3, max: 64, step: 1 },
    tubularSegments: { value: 32, min: 3, max: 100, step: 1 },
  });

  // Torus knot geometry controls
  const torusKnotControls = useControls("Torus Knot Geometry", {
    radius: { value: 1, min: 0.1, max: 2, step: 0.1 },
    tube: { value: 0.4, min: 0.1, max: 1, step: 0.05 },
    tubularSegments: { value: 64, min: 3, max: 100, step: 1 },
    radialSegments: { value: 8, min: 3, max: 32, step: 1 },
    p: { value: 2, min: 1, max: 5, step: 1 },
    q: { value: 3, min: 1, max: 5, step: 1 },
  });

  // Regular polyhedron controls
  const polyhedronControls = useControls("Regular Polyhedrons", {
    type: {
      value: "dodecahedron",
      options: ["dodecahedron", "icosahedron", "octahedron", "tetrahedron"],
    },
    radius: { value: 1, min: 0.1, max: 2, step: 0.1 },
    detail: { value: 0, min: 0, max: 3, step: 1 },
  });

  // Plane geometry controls
  const planeControls = useControls("Plane Geometry", {
    width: { value: 2, min: 0.1, max: 5, step: 0.1 },
    height: { value: 2, min: 0.1, max: 5, step: 0.1 },
    widthSegments: { value: 1, min: 1, max: 20, step: 1 },
    heightSegments: { value: 1, min: 1, max: 20, step: 1 },
  });

  // Function to generate the selected polyhedron geometry
  const getPolyhedronGeometry = () => {
    switch (polyhedronControls.type) {
      case "dodecahedron": {
        return <dodecahedronGeometry args={[polyhedronControls.radius, polyhedronControls.detail]} />;
      }
      case "icosahedron": {
        return <icosahedronGeometry args={[polyhedronControls.radius, polyhedronControls.detail]} />;
      }
      case "octahedron": {
        return <octahedronGeometry args={[polyhedronControls.radius, polyhedronControls.detail]} />;
      }
      default: {
        return <tetrahedronGeometry args={[polyhedronControls.radius, polyhedronControls.detail]} />;
      }
    }
  };

  return (
    <SceneTemplate
      title="Geometry Scene"
      description={description}
      guide="마우스로 장면을 회전하여 다양한 형상을 관찰해보세요. 오른쪽 컨트롤 패널에서 각 형상의 매개변수를 조절하고, 와이어프레임 모드를 활성화하여 형상의 구조를 확인하세요."
      code={code}
      height="h-[600px]"
    >
      <Canvas shadows camera={{ fov: 75, near: 1, far: 100, position: [0, 0, 15] }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <OrbitControls />

        {/* Box Geometry */}
        <GeometryDisplay
          position={[-6, 4, 0]}
          geometry={
            <boxGeometry
              args={[
                boxControls.width,
                boxControls.height,
                boxControls.depth,
                boxControls.widthSegments,
                boxControls.heightSegments,
                boxControls.depthSegments,
              ]}
            />
          }
          wireframe={globalControls.wireframe}
          color={globalControls.color}
          metalness={globalControls.metalness}
          roughness={globalControls.roughness}
        />

        {/* Sphere Geometry */}
        <GeometryDisplay
          position={[0, 4, 0]}
          geometry={
            <sphereGeometry
              args={[sphereControls.radius, sphereControls.widthSegments, sphereControls.heightSegments]}
            />
          }
          wireframe={globalControls.wireframe}
          color={globalControls.color}
          metalness={globalControls.metalness}
          roughness={globalControls.roughness}
        />

        {/* Cylinder Geometry */}
        <GeometryDisplay
          position={[6, 4, 0]}
          geometry={
            <cylinderGeometry
              args={[
                cylinderControls.radiusTop,
                cylinderControls.radiusBottom,
                cylinderControls.height,
                cylinderControls.radialSegments,
              ]}
            />
          }
          wireframe={globalControls.wireframe}
          color={globalControls.color}
          metalness={globalControls.metalness}
          roughness={globalControls.roughness}
        />

        {/* Cone Geometry */}
        <GeometryDisplay
          position={[-6, 0, 0]}
          geometry={<coneGeometry args={[coneControls.radius, coneControls.height, coneControls.radialSegments]} />}
          wireframe={globalControls.wireframe}
          color={globalControls.color}
          metalness={globalControls.metalness}
          roughness={globalControls.roughness}
        />

        {/* Torus Geometry */}
        <GeometryDisplay
          position={[0, 0, 0]}
          geometry={
            <torusGeometry
              args={[
                torusControls.radius,
                torusControls.tube,
                torusControls.radialSegments,
                torusControls.tubularSegments,
              ]}
            />
          }
          wireframe={globalControls.wireframe}
          color={globalControls.color}
          metalness={globalControls.metalness}
          roughness={globalControls.roughness}
        />

        {/* Torus Knot Geometry */}
        <GeometryDisplay
          position={[6, 0, 0]}
          geometry={
            <torusKnotGeometry
              args={[
                torusKnotControls.radius,
                torusKnotControls.tube,
                torusKnotControls.tubularSegments,
                torusKnotControls.radialSegments,
                torusKnotControls.p,
                torusKnotControls.q,
              ]}
            />
          }
          wireframe={globalControls.wireframe}
          color={globalControls.color}
          metalness={globalControls.metalness}
          roughness={globalControls.roughness}
        />

        {/* Polyhedron (Dodecahedron, Icosahedron, Octahedron, or Tetrahedron) */}
        <GeometryDisplay
          position={[-6, -4, 0]}
          geometry={getPolyhedronGeometry()}
          wireframe={globalControls.wireframe}
          color={globalControls.color}
          metalness={globalControls.metalness}
          roughness={globalControls.roughness}
        />

        {/* Plane Geometry */}
        <GeometryDisplay
          position={[0, -4, 0]}
          geometry={
            <planeGeometry
              args={[
                planeControls.width,
                planeControls.height,
                planeControls.widthSegments,
                planeControls.heightSegments,
              ]}
            />
          }
          wireframe={globalControls.wireframe}
          color={globalControls.color}
          metalness={globalControls.metalness}
          roughness={globalControls.roughness}
        />
      </Canvas>
    </SceneTemplate>
  );
};
