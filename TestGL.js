import { Canvas, useLoader } from '@react-three/fiber/native';
import { FileUriTextureLoader } from './FileUriTextureLoader';

export function TestGL({ imageUri }) {
  const mapTex = useLoader(FileUriTextureLoader, imageUri);

  return (
    <Canvas style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} orthographic>
      <color attach='background' args={[0xff0000]} />
      <mesh scale={300}>
        <planeGeometry />
        <meshBasicMaterial color={0xffffff} map={mapTex} />
      </mesh>
    </Canvas>
  );
}