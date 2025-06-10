import { Canvas } from "@react-three/fiber";
import { SceneTemplate } from "../components";
import { OrbitControls, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import React, { useRef } from "react";
import {
  DirectionalLightHelper,
  type Vector3Tuple,
  PointLightHelper,
  SpotLightHelper,
  DirectionalLight,
  PointLight,
  SpotLight,
} from "three";

type LightControlProps = {
  visible: boolean;
  intensity: number;
  color: string;
  position?: Vector3Tuple;
  angle?: number;
  castShadow?: boolean;
};

type LightsProps = {
  ambient: LightControlProps;
  directional: LightControlProps & { position: Vector3Tuple };
  point: LightControlProps & { position: Vector3Tuple };
  spot: LightControlProps & { position: Vector3Tuple; angle: number };
};

const description = (
  <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
    <p>
      이 예제는 3D 장면에서 다양한 조명 유형과 그 특성을 시각적으로 보여줍니다. 조명은 3D 시각화에 깊이감, 분위기 및
      사실감을 부여하는 핵심 요소입니다.
    </p>

    <h3 className="text-lg font-medium mt-6 mb-2">조명 유형</h3>
    <p>이 장면에서는 네 가지 주요 조명 유형을 인터랙티브하게 제어할 수 있습니다:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        <code className="bg-gray-200">{"<ambientLight/>"}</code> — 장면 전체에 균일하게 빛을 비추는 주변광입니다.
        방향성이 없고 그림자를 생성하지 않으며, 장면의 기본 밝기를 설정합니다.
      </li>
      <li>
        <code className="bg-gray-200">{"<directionalLight/>"}</code> — 특정 방향으로 평행하게 빛을 발산하는 방향성
        조명입니다. 태양과 같다고 생각하면 됩니다.
      </li>
      <li>
        <code className="bg-gray-200">{"<pointLight/>"}</code> — 특정 지점에서 모든 방향으로 빛을 방출하는 점광원입니다.
        전구나 촛불과 같이 모든 방향으로 빛을 발산하는 효과를 만듭니다.
      </li>
      <li>
        <code className="bg-gray-200">{"<spotLight/>"}</code> — 원뿔 모양으로 빛을 방출하는 스포트라이트입니다.
        각도(angle) 파라미터로 빛의 퍼짐을 조절할 수 있습니다.
      </li>
    </ul>

    <h3 className="text-lg font-medium mt-6 mb-2">조명 컨트롤</h3>
    <p>화면 오른쪽의 컨트롤 패널을 사용하여 각 조명의 속성을 실시간으로 조절할 수 있습니다:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        <strong>visible</strong> — 조명을 켜고 끌 수 있습니다. 조명을 끄면 해당 헬퍼도 함께 사라집니다.
      </li>
      <li>
        <strong>intensity</strong> — 조명의 강도를 조절합니다. 값이 클수록 더 밝은 빛이 생성됩니다.
      </li>
      <li>
        <strong>color</strong> — 조명의 색상을 변경하여 장면에 분위기를 더합니다.
      </li>
      <li>
        <strong>position</strong> — 조명의 위치(x, y, z 좌표)를 조정하여 다른 각도에서 빛이 비치도록 설정합니다.
      </li>
      <li>
        <strong>angle</strong> — 스포트라이트의 빛 원뿔 각도를 조절합니다.
      </li>
      <li>
        <strong>castShadow</strong> — 조명이 그림자를 생성할지 여부를 설정합니다.
      </li>
    </ul>

    <h3 className="text-lg font-medium mt-6 mb-2">그림자</h3>
    <p>이 장면에서는 그림자 렌더링을 활성화하여 조명이 3D 객체에 미치는 영향을 관찰할 수 있습니다:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        <code className="bg-gray-200">{"castShadow"}</code> — 구체와 큐브에 적용되어 그림자를 생성합니다.
      </li>
      <li>
        <code className="bg-gray-200">{"receiveShadow"}</code> — 바닥 평면에 적용되어 그림자를 받습니다.
      </li>
    </ul>
  </div>
);

const code = (
  <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden" }}>
    <iframe
      src="https://codesandbox.io/embed/nh833y?view=editor+%2B+preview&module=%2Fsrc%2Fpages%2FLightsScene.tsx"
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

const Lights = ({ ambient, directional, point, spot }: LightsProps) => {
  const directionLightRef = useRef<DirectionalLight>(null) as React.MutableRefObject<THREE.DirectionalLight>;
  const pointLightRef = useRef<PointLight>(null) as React.MutableRefObject<THREE.PointLight>;
  const spotLightRef = useRef<SpotLight>(null) as React.MutableRefObject<THREE.SpotLight>;

  useHelper(directional.visible ? directionLightRef : undefined, DirectionalLightHelper, 3, directional.color);
  useHelper(point.visible ? pointLightRef : undefined, PointLightHelper, 0.5, point.color);
  useHelper(spot.visible ? spotLightRef : undefined, SpotLightHelper, spot.color);

  return (
    <>
      {ambient.visible && <ambientLight intensity={ambient.intensity} color={ambient.color} />}

      {directional.visible && (
        <directionalLight
          position={directional.position}
          intensity={directional.intensity}
          color={directional.color}
          ref={directionLightRef}
          castShadow={directional.castShadow}
        />
      )}

      {point.visible && (
        <pointLight
          position={point.position}
          intensity={point.intensity}
          color={point.color}
          ref={pointLightRef}
          castShadow={point.castShadow}
        />
      )}

      {spot.visible && (
        <spotLight
          position={spot.position}
          angle={spot.angle}
          intensity={spot.intensity}
          color={spot.color}
          ref={spotLightRef}
          castShadow={spot.castShadow}
        />
      )}
    </>
  );
};

export const LightsScene = () => {
  const ambient = useControls("Ambient Light", {
    visible: true,
    intensity: { value: 0.5, min: 0, max: 1, step: 0.01 },
    color: "#ffffff",
    castShadow: true,
  });

  const directional = useControls("Directional Light", {
    visible: true,
    intensity: { value: 0.5, min: 0, max: 5 },
    color: "#ff0000",
    position: { value: [0, 5, 0], step: 0.5 },
    castShadow: true,
  });

  const point = useControls("Point Light", {
    visible: true,
    intensity: { value: 0.8, min: 0, max: 5 },
    color: "#ffffff",
    x: { value: 0, step: 0.5 },
    y: { value: 3, step: 0.5 },
    z: { value: 2, step: 0.5 },
    castShadow: true,
  });

  const pointLightPosition: Vector3Tuple = [point.x, point.y, point.z];

  const spot = useControls("Spot Light", {
    visible: true,
    intensity: { value: 1, min: 0, max: 5 },
    angle: { value: 0.4, min: 0, max: 1 },
    color: "#00ff00",
    position: { value: [5, 5, 5], step: 0.5 },
    castShadow: true,
  });

  return (
    <SceneTemplate
      title="Lights Scene"
      description={description}
      guide="마우스로 장면을 회전하며 조명의 효과를 다양한 각도에서 관찰해보세요. 화면 오른쪽의 컨트롤 패널을 사용해 각 조명의 속성(강도, 색상, 위치 등)을 조절하고 장면에 미치는 영향을 실시간으로 확인하세요. 특히 각 조명을 개별적으로 켜고 끄면서 빛이 장면에 미치는 영향을 비교해보세요. 각 조명의 위치와 방향은 시각적 헬퍼로 표시됩니다."
      code={code}
    >
      <Canvas shadows camera={{ fov: 75, near: 1, far: 100, position: [10, 6, 2] }}>
        <color attach="background" args={["#000000"]} />

        <Lights
          ambient={ambient}
          directional={directional}
          point={{ ...point, position: pointLightPosition }}
          spot={spot}
        />

        <mesh castShadow position={[0, 1, 2]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>

        <mesh castShadow position={[0, 1, -2]}>
          <boxGeometry args={[1.8, 1.8, 1.8]} />
          <meshStandardMaterial color="blue" />
        </mesh>

        {/* 바닥 */}
        <mesh receiveShadow position={[0, -2, 0]}>
          <boxGeometry args={[10, 1, 10]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        <OrbitControls />
      </Canvas>
    </SceneTemplate>
  );
};
