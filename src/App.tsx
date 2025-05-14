import { Canvas } from '@react-three/fiber';
import './modern-normalize.css';
import Cube from './Cube';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <Canvas
      camera={{
        fov: 75,
        near: 1,
        far: 100,
        position: [5, 5, 5]
      }}
    >
      <color attach="background" args={['white']} />
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper args={[10, 10]} />
      <Cube />
    </Canvas>
  );
}

export default App;
