declare module 'three/examples/jsm/loaders/FBXLoader' {
  import { Loader, Group } from 'three';
  export class FBXLoader extends Loader {
    constructor(manager?: any);
    load(url: string, onLoad: (object: Group) => void, onProgress?: (ev: ProgressEvent) => void, onError?: (err: ErrorEvent) => void): void;
    parse(buffer: ArrayBuffer, path: string): Group;
  }
  const _default: { FBXLoader: typeof FBXLoader };
  export default FBXLoader;
}
