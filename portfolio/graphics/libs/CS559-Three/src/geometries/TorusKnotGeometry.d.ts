import { Geometry } from "./../core/Geometry";

export class TorusKnotGeometry extends Geometry {
  /**
   * @param [radius=1]
   * @param [tube=0.4]
   * @param [radialSegments=64]
   * @param [tubularSegments=8]
   * @param [p=2]
   * @param [q=3]
   */
  constructor(
    radius?: number,
    tube?: number,
    tubularSegments?: number,
    radialSegments?: number,
    p?: number,
    q?: number
  );

  /**
   * @default 'TorusKnotGeometry'
   */
  type: string;

  parameters: {
    radius: number;
    tube: number;
    tubularSegments: number;
    radialSegments: number;
    p: number;
    q: number;
  };
}
