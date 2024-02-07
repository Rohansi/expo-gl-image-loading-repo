import { Canvas, Fill, Image, useImage } from "@shopify/react-native-skia";

export function TestSkia({ imageUri }) {
  const image = useImage(imageUri, console.error);

  return (
    <Canvas style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Fill color="#ff0000" />
      <Image image={image} x={0} y={0} width={300} height={300} />
    </Canvas>
  );
}
