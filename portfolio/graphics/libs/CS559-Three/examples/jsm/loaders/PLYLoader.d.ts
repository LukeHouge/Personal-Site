import { BufferGeometry, Loader, LoadingManager } from "../../../src/Three";

export class PLYLoader extends Loader {
  constructor(manager?: LoadingManager);
  propertyNameMapping: object;

  load(
    url: string,
    onLoad: (geometry: BufferGeometry) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): void;
  setPropertyNameMapping(mapping: object): void;
  parse(data: ArrayBuffer | string): BufferGeometry;
}
