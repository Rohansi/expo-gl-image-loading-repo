import { Image } from 'react-native';
import * as THREE from 'three';

/*
 * Expo isn't a web browser so the loaders in three.js will not work. This loader explicitly only works on file:// URIs
 * by relying on documented, Expo-specific behavior in gl.texImage2D. Passing an object in the form `{ localUri: 'file://...' }`
 * as the `pixels` argument will load that local file into the texture with whatever dimensions it actually is. 
 */
export class FileUriTextureLoader extends THREE.TextureLoader {
    load(fileUri, onLoad, onProgress, onError) {
        if (!fileUri) {
            throw new Error('FileUriTextureLoader.load(): fileUri cannot be null/empty');
        }

        if (!fileUri.startsWith('file://')) {
            throw new Error('FileUriTextureLoader.load(): fileUri must begin with file://');
        }

        const texture = new THREE.Texture();

        (async () => {
            function parseAsset(image) {
                texture.image = image;
                texture.needsUpdate = true;

                if (onLoad !== undefined) {
                    onLoad(texture);
                }
            }

            const { width, height } = await new Promise((res, rej) => {
                Image.getSize(fileUri, (width, height) => res({ width, height }), rej);
            });

            texture['isDataTexture'] = true; // Forces passing to `gl.texImage2D(...)` verbatim

            parseAsset({
                data: { localUri: fileUri },
                width: width,
                height: height,
            });
        })();

        return texture;
    }
}
