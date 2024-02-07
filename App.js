import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, Suspense } from 'react';
import * as FileSystem from 'expo-file-system';
import { image1, image2 } from './Images';
import { TestGL } from './TestGL';
import { TestSkia } from './TestSkia';

const imageUri = FileSystem.cacheDirectory + '/image.jpg';

async function writeImageToDisk() {
  await FileSystem.writeAsStringAsync(imageUri, image2, { encoding: 'base64' });
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    async function doWork() {
      await writeImageToDisk();
      setLoaded(true);
    }

    doWork();
  });

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <View style={styles.container}>
        {loaded && <TestSkia imageUri={imageUri} />}
      </View>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
