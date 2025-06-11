import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SceneTemplate } from "../components/SceneTemplate";

const description = (
  <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
    <p>
      React Three Fiber 예제 시리즈의 첫 번째 장면입니다. R3F를 처음 접하신다면, 이 기본 장면을 통해 3D 그래픽의 핵심
      구성 요소들을 이해하실 수 있습니다.
    </p>

    <h3 className="text-lg font-medium mt-6 mb-2">Canvas 설정</h3>
    <p>
      <code>{"<Canvas>"}</code> 컴포넌트로 3D 장면의 컨테이너를 생성합니다. 여기서는 카메라를 다음과 같이 구성했습니다:
    </p>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        <code className="bg-gray-200">fov: 75</code> — 넓은 시야각(75도)으로 더 극적인 원근감을 제공
      </li>
      <li>
        <code className="bg-gray-200">near: 1, far: 100</code> — 렌더링 경계("far" 값 이상의 객체는 렌더링되지 않음)
      </li>
      <li>
        <code className="bg-gray-200">position: [5, 5, 5]</code> — 원점에서 대각선 방향으로 카메라를 배치하여 좋은 초기
        뷰를 제공
      </li>
    </ul>

    <h3 className="text-lg font-medium mt-6 mb-2">조명</h3>
    <p>장면에는 두 가지 광원이 있습니다:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        <code className="bg-gray-200">{"<ambientLight intensity={0.5} />"}</code> — 그림자를 생성하지 않는 전체적인
        조명으로, 장면의 어떤 부분도 완전히 어둡지 않도록 합니다.
      </li>
      <li>
        <code className="bg-gray-200">{"<directionalLight position={[0, 2, 5]} intensity={1} />"}</code> — 태양광과
        유사한 방향성 조명으로, 장면의 약간 위와 앞에 위치합니다.
      </li>
    </ul>

    <h3 className="text-lg font-medium mt-6 mb-2">3D 객체 생성</h3>
    <p>
      <code>{"<mesh>"}</code> 컴포넌트는 3D 객체를 나타내며 두 가지 주요 자식 요소가 필요합니다:
    </p>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        <code className="bg-gray-200">{"<boxGeometry args={[2, 2, 2]} />"}</code> — 객체의 형태(2×2×2 크기의 큐브)
      </li>
      <li>
        <code className="bg-gray-200">{'<meshStandardMaterial color="hotpink" />'}</code> — 객체의 외관을 정의하는 재질
        (선명한 핑크색의 물리 기반 재질)
      </li>
    </ul>

    <h3 className="text-lg font-medium mt-6 mb-2">헬퍼 도구</h3>
    <p>장면 탐색을 돕기 위해 아래 컴포넌트를 추가했습니다:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        <code className="bg-gray-200">{"<OrbitControls />"}</code> — drei 라이브러리에서 제공하는 컴포넌트로, 마우스로
        카메라 회전과 확대/축소를 가능하게 합니다.
      </li>
    </ul>
  </div>
);

const code = (
  <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden" }}>
    <iframe
      src="https://codesandbox.io/embed/nh833y?view=editor+%2B+preview&module=%2Fsrc%2Fpages%2FBasicScene.tsx"
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

export const BasicScene = () => {
  return (
    <SceneTemplate
      title="Basic Scene"
      description={description}
      guide="마우스로 장면을 회전, 확대/축소, 이동해보세요. 큐브 주변을 회전하며 조명이 큐브에 어떤 영향을 미치는지
            관찰해보세요."
      code={code}
    >
      <>
        <Canvas
          camera={{
            fov: 75,
            near: 1,
            far: 100,
            position: [5, 5, 5],
          }}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 2, 5]} intensity={1} castShadow />
          <OrbitControls />
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
        </Canvas>
      </>
    </SceneTemplate>
  );
};
