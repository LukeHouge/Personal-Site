import { Color } from "./../math/Color";
import { IFog } from "./Fog";
/**
 * This class contains the parameters that define linear fog, i.e., that grows exponentially denser with the distance.
 */
export class FogExp2 implements IFog {
  constructor(hex: number | string, density?: number);

  /**
   * @default ''
   */
  name: string;

  color: Color;

  /**
   * Defines how fast the fog will grow dense.
   * @default 0.00025
   */
  density: number;

  readonly isFogExp2: true;

  clone(): this;
  toJSON(): any;
}
