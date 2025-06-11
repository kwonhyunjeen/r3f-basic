import { SceneTemplate } from "../components";
import { folder, useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type MaterialSectionProps = {
  backgroundColor?: string;
  controls?: React.ReactNode;
  description: React.ReactNode;
  renderMaterial: () => React.ReactNode;
  title: string;
};

const MaterialSection = ({ backgroundColor = "#000000", description, renderMaterial, title }: MaterialSectionProps) => {
  return (
    <div className="mb-12 pb-8 border-b border-zinc-200">
      <h2 className="text-xl font-medium text-amber-600 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="prose prose-headings:text-amber-600 prose-a:text-amber-600">{description}</div>

        <div className="bg-zinc-100 rounded-lg overflow-hidden h-[300px]">
          <Canvas shadows camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 6] }}>
            <color attach="background" args={[backgroundColor]} />

            {/* 기본 조명 설정 */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, 0, 5]} intensity={1} />

            <Grid
              position={[0, -2, 0]}
              args={[10, 10]}
              cellSize={1}
              cellThickness={0.6}
              cellColor="#6e6e9c"
              sectionSize={5}
              sectionThickness={1}
              sectionColor="#9d4edd"
              fadeDistance={20}
              fadeStrength={1}
            />

            <mesh position={[0, 0, 0]} castShadow>
              <sphereGeometry args={[1, 32, 32]} />;{renderMaterial()}
            </mesh>

            <OrbitControls makeDefault />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

const commonDescription = (
  <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
    <p>
      이 예제는 Three.js에서 제공하는 다양한 재질(Material)의 특성과 속성을 탐색합니다. 재질은 3D 객체의 외관을
      정의하며, 빛과 상호작용하는 방식을 결정합니다.
    </p>

    <p>
      아래에서 각 재질 유형에 대한 예제와 설명을 확인하고, 컨트롤을 사용하여 재질의 다양한 속성을 실험해보세요. 각
      재질마다 고유한 특성과 용도가 있습니다.
    </p>
    <h3 className="text-lg font-medium mt-6 mb-2">주요 속성 용어 설명</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li>
        <strong>metalness</strong>: 재질이 금속처럼 보이는 정도를 조절합니다. <code>1</code>에 가까울수록 금속 재질처럼
        반사율이 높고 차가운 느낌을 줍니다.
      </li>
      <li>
        <strong>roughness</strong>: 표면의 거칠기를 나타냅니다. <code>0</code>은 매끄럽고 반사가 또렷하며,{" "}
        <code>1</code>은 거칠고 흐릿한 반사를 만듭니다.
      </li>
      <li>
        <strong>emissive</strong>: 재질이 발광하는 색을 설정합니다. 이 빛은 실제 장면을 밝히지는 않지만, 해당 객체
        자체는 어두워지지 않습니다.
      </li>
      <li>
        <strong>emissiveIntensity</strong>: 발광 강도를 조절합니다. 값이 클수록 <code>emissive</code> 색이 더 밝게
        보입니다.
      </li>
      <li>
        <strong>specular</strong>: (Phong 재질) 반사 하이라이트의 색상을 설정합니다. 밝은 빛이 비췄을 때 하이라이트 색에
        영향을 줍니다.
      </li>
      <li>
        <strong>shininess</strong>: (Phong 재질) 하이라이트의 퍼짐 정도를 조절합니다. 값이 높을수록 더 날카롭고 강한
        반사 효과가 생깁니다.
      </li>
      <li>
        <strong>clearcoat</strong>: (Physical 재질) 표면 위에 광택 있는 코팅층을 추가합니다. 자동차 페인트와 같은 이중층
        재질 표현에 사용됩니다.
      </li>
      <li>
        <strong>transmission</strong>: (Physical 재질) 유리처럼 빛을 투과시키는 정도를 조절합니다. <code>1</code>에
        가까울수록 투명하게 보입니다.
      </li>
      <li>
        <strong>ior (Index of Refraction)</strong>: 빛이 재질을 통과할 때 굴절되는 정도를 설정합니다. 유리는 약 1.5,
        다이아몬드는 2.4 정도입니다.
      </li>
      <li>
        <strong>wireframe</strong>: 객체의 와이어프레임(테두리 선)만 렌더링합니다. 디버깅이나 특수 효과에 사용됩니다.
      </li>
    </ul>

    <div className="w-3/4 bg-amber-50 p-4 rounded-md mt-6">
      <p className="text-sm text-amber-700">
        {" "}
        각 재질의 컨트롤 패널을 사용하여 속성 값을 조정하면서 어떻게 시각적으로 반응하는지 직접 관찰해보세요. 특히{" "}
        <code>metalness</code>와 <code>roughness</code>는 PBR 재질에서 현실감 있는 표면 표현을 위해 매우 중요한
        속성입니다.
      </p>
    </div>
  </div>
);

const basicMaterialDescription = (
  <div>
    <p>
      <code className="bg-gray-200">MeshBasicMaterial</code>은 조명에 영향을 받지 않는 가장 단순한 재질입니다. 객체에
      단색이나 텍스처를 적용하며, 음영이나 반사 효과가 없습니다.
    </p>
    <p className="mt-2">
      이 재질은 조명 계산이 필요 없기 때문에 렌더링 비용이 저렴합니다. 와이어프레임 디스플레이, 디버깅용 객체, 또는
      특별한 조명 효과가 필요 없는 경우에 사용됩니다.
    </p>
  </div>
);

const lambertMaterialDescription = (
  <div>
    <p>
      <code className="bg-gray-200">MeshLambertMaterial</code>은 무광택 표면을 표현하는 재질입니다. 빛의 방향에 따라
      음영이 생기지만 반사 하이라이트는 없습니다.
    </p>
    <p className="mt-2">종이, 천, 목재와 같은 무광택 표면에 적합하며, 자연스러운 빛의 표현이 가능합니다.</p>
    <p className="mt-2 text-sm text-zinc-500">
      <strong>✅</strong> <code>emissiveIntensity</code>를 조절하면서 빛의 밝기 강도를 조절해 보세요.
    </p>
  </div>
);

const phongMaterialDescription = (
  <div>
    <p>
      <code className="bg-gray-200">MeshPhongMaterial</code>은 광택 있는 표면을 표현하는 재질입니다. Lambert와 달리 반사
      하이라이트를 포함하여 더 사실적인 표면을 만들어냅니다.
    </p>
    <p className="mt-2">
      플라스틱, 도자기, 유리처럼 빛을 반사하는 재질을 표현할 때 적합합니다. <code>specular</code> 색상과{" "}
      <code>shininess</code> 값을 조절하여 하이라이트의 색상과 선명도를 조절할 수 있습니다.
    </p>
    <p className="mt-2 text-sm text-zinc-500">
      <strong>✅</strong> <code>shininess</code> 값을 높이면 하이라이트가 작고 날카롭게 표현되며, 낮추면 흐릿한 반사
      효과가 됩니다.
      <br />
    </p>
  </div>
);

const standardMaterialDescription = (
  <div>
    <p>
      <code className="bg-gray-200">MeshStandardMaterial</code>은 PBR(Physically Based Rendering) 기반 재질로, 실제 물리
      법칙에 따라 빛과 상호작용하여 매우 사실적인 표현이 가능합니다.
    </p>
    <p className="mt-2">
      <code>roughness</code>와 <code>metalness</code>를 조합하여 거친 돌 표면부터 매끄러운 금속까지 다양한 재질을 표현할
      수 있습니다.
    </p>
    <p className="mt-2 text-sm text-zinc-500">
      <strong>✅</strong> <code>metalness</code>를 높이고 <code>roughness</code>를 낮추면 거울처럼 반짝이는 금속 효과를
      볼 수 있습니다. 반대로 <code>roughness</code>를 높이면 광택이 줄어들고 확산되는 느낌이 납니다.
      <br />
    </p>
  </div>
);

const physicalMaterialDescription = (
  <div>
    <p>
      <code className="bg-gray-200">MeshPhysicalMaterial</code>은 Standard 재질을 확장한 더 정교한 PBR 재질입니다. 유리,
      액체, 자동차 페인트와 같은 복잡한 재질 표현에 적합합니다.
    </p>
    <p className="mt-2">
      <code>clearcoat</code>, <code>transmission</code>, <code>ior</code> 등의 속성으로 투명도, 굴절, 코팅 효과를 표현할
      수 있습니다.
    </p>
    <p className="mt-2 text-sm text-zinc-500">
      <strong>✅</strong> <code>transmission</code>을 1에 가깝게 설정하고 <code>ior</code>을 조정하면 유리처럼 빛이
      휘어지는 느낌을 볼 수 있습니다.
      <br />
      <code>clearcoat</code>를 높이면 매끈한 코팅이 덧씌워진 듯한 효과가 생깁니다.
      <br />
    </p>
  </div>
);

const toonMaterialDescription = (
  <div>
    <p>
      <code className="bg-gray-200">MeshToonMaterial</code>은 만화의 셀 셰이딩 렌더링을 제공합니다. 빛의 변화에 따른
      음영이 부드럽게 변하는 것이 아니라 단계적으로 변하여 만화같은 스타일을 만들어냅니다.
    </p>
    <p className="mt-2">
      애니메이션, 스타일화된 게임 등에서 사용되며, 그라디언트 맵으로 음영 단계를 제어할 수 있습니다.
    </p>
    <p className="mt-2 text-sm text-zinc-500">
      <strong>✅</strong> <code>gradientSize</code> 값을 늘리면 음영이 더 부드럽게 변화하고, 줄이면 뚜렷한 셀 셰이딩
      효과가 강조됩니다.
    </p>
  </div>
);

const normalMaterialDescription = (
  <div>
    <p>
      <code className="bg-gray-200">MeshNormalMaterial</code>은 객체의 표면 방향(normals)을 색상으로 시각화하는 디버깅용
      재질입니다.
    </p>
    <p className="mt-2">
      조명에 영향을 받지 않으며, 법선 벡터의 방향을 RGB 색으로 보여줍니다. 모델의 구조나 UV 맵 오류 등을 확인할 때
      유용합니다.
    </p>
    <p className="mt-2 text-sm text-zinc-500">
      <strong>✅</strong> <code>flatShading</code>을 켜면 각 면의 방향이 더 명확하게 드러나므로, 법선 분리나 면 구성이
      잘못된 경우 쉽게 확인할 수 있습니다.
    </p>
  </div>
);

const matcapMaterialDescription = (
  <div>
    <p>
      <code className="bg-gray-200">MeshMatcapMaterial</code>은 복잡한 조명 계산 없이도 고급 재질 효과를 시뮬레이션할 수
      있는 재질입니다. Material Capture(MatCap) 텍스처를 사용하여 사전 계산된 조명 효과를 제공합니다.
    </p>
    <p className="mt-2">
      MatCap 텍스처는 구체에 적용된 재질을 캡처한 이미지로,{" "}
      <p className="mt-2">
        리얼타임 퍼포먼스가 중요하거나, 특정 스타일의 금속/도자기/유리 표현이 필요할 때 매우 유용합니다.
      </p>
    </p>
    <p className="mt-2 text-sm text-zinc-500">
      <strong>✅</strong> 텍스처를 교체하면서 재질이 어떻게 바뀌는지 비교해보세요. <code>silver</code>,{" "}
      <code>gold</code> 등 다양한 스타일이 준비되어 있습니다.
    </p>
  </div>
);

export const MaterialsScene = () => {
  const basicControls = useControls(
    "Basic Material",
    {
      color: "#4080ff",
      opacity: { value: 1, min: 0, max: 1, step: 0.01 },
      wireframe: false,
    },
    { collapsed: true },
  );
  const lambertControls = useControls(
    "Lambert Material",
    {
      color: "#4080ff",
      wireframe: false,
      reflection: folder({
        emissive: "#4080ff",
        emissiveIntensity: { value: 1, min: 0, max: 2, step: 0.01 },
      }),
    },
    { collapsed: true },
  );
  const phongControls = useControls(
    "Phong Material",
    {
      color: "#4080ff",
      wireframe: false,
      reflection: folder({
        emissive: "#4080ff",
        emissiveIntensity: { value: 1, min: 0, max: 2, step: 0.01 },
        specular: "#ffffff",
        shininess: { value: 30, min: 0, max: 100, step: 1 },
      }),
    },
    { collapsed: true },
  );
  const standardControls = useControls(
    "Standard Material",
    {
      color: "#4080ff",
      wireframe: false,
      physicalProps: folder({
        roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
        metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
      }),
      reflection: folder({
        emissive: "#4080ff",
        emissiveIntensity: { value: 1, min: 0, max: 2, step: 0.01 },
      }),
    },
    { collapsed: true },
  );
  const physicalControls = useControls(
    "Physical Material",
    {
      color: "#4080ff",
      wireframe: false,
      physicalProps: folder({
        roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
        metalness: { value: 0, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: 0.8, min: 0, max: 1, step: 0.01 },
        clearcoatRoughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
        transmission: { value: 0.95, min: 0, max: 1, step: 0.01 },
        ior: { value: 1.5, min: 1, max: 2.333, step: 0.01 },
        thickness: { value: 0.01, min: 0, max: 1, step: 0.01 },
      }),
      surfaceEffects: folder({
        transparent: true,
        opacity: { value: 1, min: 0, max: 1, step: 0.01 },
      }),
    },
    { collapsed: true },
  );
  const toonControls = useControls(
    "Toon Material",
    {
      color: "#4080ff",
      wireframe: false,
      gradientSize: { value: 4, min: 1, max: 10, step: 1 },
    },
    { collapsed: true },
  );
  const normalControls = useControls(
    "Normal Material",
    {
      wireframe: false,
    },
    { collapsed: true },
  );
  const matcapControls = useControls(
    "Matcap Material",
    {
      matcapStyle: {
        value: "gold",
        options: ["gold", "silver", "red", "blue"],
      },
    },
    { collapsed: true },
  );
  return (
    <SceneTemplate title="Materials Scene" description={commonDescription} code={undefined} height="h-auto">
      <div className="space-y-10 pt-4">
        <MaterialSection
          title="Basic Material"
          description={basicMaterialDescription}
          renderMaterial={() => (
            <meshBasicMaterial
              color={basicControls.color}
              wireframe={basicControls.wireframe}
              opacity={basicControls.opacity}
              transparent={true}
            />
          )}
          controls={true}
        />
        <MaterialSection
          title="Lambert Material"
          description={lambertMaterialDescription}
          renderMaterial={() => (
            <meshLambertMaterial
              color={lambertControls.color}
              wireframe={lambertControls.wireframe}
              emissive={new THREE.Color(lambertControls.emissive)}
              emissiveIntensity={lambertControls.emissiveIntensity}
            />
          )}
          controls={true}
        />
        <MaterialSection
          title="Phong Material"
          description={phongMaterialDescription}
          renderMaterial={() => (
            <meshPhongMaterial
              color={phongControls.color}
              wireframe={phongControls.wireframe}
              emissive={new THREE.Color(phongControls.emissive)}
              emissiveIntensity={phongControls.emissiveIntensity}
              specular={new THREE.Color(phongControls.specular)}
              shininess={phongControls.shininess}
            />
          )}
          controls={true}
        />
        <MaterialSection
          title="Standard Material"
          description={standardMaterialDescription}
          renderMaterial={() => (
            <meshStandardMaterial
              color={standardControls.color}
              wireframe={standardControls.wireframe}
              roughness={standardControls.roughness}
              metalness={standardControls.metalness}
              emissive={new THREE.Color(standardControls.emissive)}
              emissiveIntensity={standardControls.emissiveIntensity}
            />
          )}
          controls={true}
        />
        <MaterialSection
          title="Physical Material"
          description={physicalMaterialDescription}
          renderMaterial={() => (
            <meshPhysicalMaterial
              color={physicalControls.color}
              wireframe={physicalControls.wireframe}
              roughness={physicalControls.roughness}
              metalness={physicalControls.metalness}
              clearcoat={physicalControls.clearcoat}
              clearcoatRoughness={physicalControls.clearcoatRoughness}
              transmission={physicalControls.transmission}
              ior={physicalControls.ior}
              thickness={physicalControls.thickness}
              transparent={physicalControls.transparent}
              opacity={physicalControls.opacity}
            />
          )}
          controls={true}
        />
        <MaterialSection
          title="Toon Material"
          description={toonMaterialDescription}
          renderMaterial={() => (
            <meshToonMaterial
              color={toonControls.color}
              wireframe={toonControls.wireframe}
              gradientMap={undefined} // optional for custom gradient map
            />
          )}
          controls={true}
        />
        <MaterialSection
          title="Normal Material"
          description={normalMaterialDescription}
          renderMaterial={() => <meshNormalMaterial wireframe={normalControls.wireframe} />}
          controls={true}
        />
        <MaterialSection
          title="Matcap Material"
          description={matcapMaterialDescription}
          renderMaterial={() => {
            const matcapMap = {
              gold: new THREE.TextureLoader().load("/matcaps/gold.jpg"),
              silver: new THREE.TextureLoader().load("/matcaps/silver.jpg"),
              red: new THREE.TextureLoader().load("/matcaps/red.jpg"),
              blue: new THREE.TextureLoader().load("/matcaps/blue.jpg"),
            };
            return <meshMatcapMaterial matcap={matcapMap[matcapControls.matcapStyle as keyof typeof matcapMap]} />;
          }}
          controls={true}
        />
      </div>
    </SceneTemplate>
  );
};
