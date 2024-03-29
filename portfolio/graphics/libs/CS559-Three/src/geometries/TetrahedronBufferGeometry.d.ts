import { PolyhedronBufferGeometry } from "./PolyhedronBufferGeometry";

export class TetrahedronBufferGeometry extends PolyhedronBufferGeometry {
  /**
   * @param [radius=1]
   * @param [detail=0]
   */
  constructor(radius?: number, detail?: number);

  /**
   * @default 'TetrahedronBufferGeometry'
   */
  type: string;
}
