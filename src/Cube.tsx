import * as THREE from 'three';
import { useRef } from 'react';

export default function Cube() {
  const boxRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  return (
    <>
      <directionalLight position={[5, 5, 5]} />
      <group
        ref={groupRef}
        position={[0, 0, 0]}
        rotation={[
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(45),
          THREE.MathUtils.degToRad(0)
        ]}
      >
        <axesHelper args={[5]} />
        <mesh
          ref={boxRef}
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
          rotation={[
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0)
          ]}
        >
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
        <mesh
          ref={boxRef}
          position={[0, 2, 0]}
          scale={[1, 1, 1]}
          rotation={[
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(0)
          ]}
        >
          <boxGeometry />
          <meshStandardMaterial color="pink" />
        </mesh>
        <mesh
          ref={boxRef}
          position={[2, 0, 0]}
          scale={[1, 1, 1]}
          rotation={[
            THREE.MathUtils.degToRad(0),
            THREE.MathUtils.degToRad(45),
            THREE.MathUtils.degToRad(45)
          ]}
        >
          <axesHelper args={[3]} />
          <boxGeometry />
          <meshStandardMaterial color="olive" />
        </mesh>
      </group>
    </>
  );
}
