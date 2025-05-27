import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

// Canvas, mesh, geometry, material 등 기본 구조
export const BasicScene = () => {
  const color = useControls({
    value: "#ddd",
  });

  return (
    <Canvas
      camera={{
        fov: 75,
        near: 1,
        far: 100,
        position: [5, 5, 5],
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <OrbitControls />
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <color attach="background" args={[color.value]} />
    </Canvas>
  );
};
