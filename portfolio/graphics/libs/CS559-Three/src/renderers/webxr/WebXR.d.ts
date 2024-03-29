export declare type XRSessionMode = "inline" | "immersive-vr" | "immersive-ar";

export declare type XRReferenceSpaceType =
  | "viewer"
  | "local"
  | "local-floor"
  | "bounded-floor"
  | "unbounded";

export declare type XREnvironmentBlendMode =
  | "opaque"
  | "additive"
  | "alpha-blend";

export declare type XRVisibilityState =
  | "visible"
  | "visible-blurred"
  | "hidden";

export declare type XRHandedness = "none" | "left" | "right";

export declare type XRTargetRayMode = "gaze" | "tracked-pointer" | "screen";

export declare type XREye = "none" | "left" | "right";

export declare type XREventType =
  | "end"
  | "select"
  | "selectstart"
  | "selectend"
  | "squeeze"
  | "squeezestart"
  | "squeezeend"
  | "inputsourceschange";

export interface XRSpace extends EventTarget {}

export declare type XRAnimationLoopCallback = (
  time: number,
  frame?: XRFrame
) => void;

export declare type XRFrameRequestCallback = (
  time: number,
  frame: XRFrame
) => void;

export interface XR extends EventTarget {
  requestSession(
    mode: XRSessionMode,
    options?: XRSessionInit
  ): Promise<XRSession>;
  isSessionSupported(mode: XRSessionMode): Promise<boolean>;
}

export interface Window {
  XRSession?: Constructor<XRSession>;
  XR?: Constructor<XR>;
}

export interface Navigator {
  xr?: XR;
}

export interface XRReferenceSpace extends XRSpace {
  getOffsetReferenceSpace(originOffset: XRRigidTransform): XRReferenceSpace;
}
export interface XRHitTestOptionsInit {
  space: XRSpace;
  offsetRay?: XRRay;
}

export interface XRTransientInputHitTestOptionsInit {
  profile: string;
  offsetRay?: XRRay;
}

export interface XRViewport {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface WebGLRenderingContext {
  makeXRCompatible(): Promise<void>;
}

export interface XRRenderState {
  readonly depthNear: number;
  readonly depthFar: number;
  readonly inlineVerticalFieldOfView?: number;
  readonly baseLayer?: XRWebGLLayer;
}

export interface XRRenderStateInit {
  depthNear?: number;
  depthFar?: number;
  inlineVerticalFieldOfView?: number;
  baseLayer?: XRWebGLLayer;
}

export interface XRInputSource {
  readonly handedness: XRHandedness;
  readonly targetRayMode: XRTargetRayMode;
  readonly targetRaySpace: XRSpace;
  readonly gripSpace?: XRSpace;
  readonly profiles: Array<String>;
  readonly gamepad: Gamepad;
  readonly hand?: XRHand;
}

export interface XRSessionInit {
  optionalFeatures?: string[];
  requiredFeatures?: string[];
}

export interface XRSession {
  addEventListener: Function;
  removeEventListener: Function;
  requestReferenceSpace(type: XRReferenceSpaceType): Promise<XRReferenceSpace>;
  updateRenderState(renderStateInit: XRRenderStateInit): Promise<void>;
  requestAnimationFrame(callback: XRFrameRequestCallback): number;
  cancelAnimationFrame(id: number): void;
  end(): Promise<void>;
  renderState: XRRenderState;
  inputSources: Array<XRInputSource>;
  environmentBlendMode: XREnvironmentBlendMode;
  visibilityState: XRVisibilityState;

  // hit test
  requestHitTestSource(options: XRHitTestOptionsInit): Promise<XRHitTestSource>;
  requestHitTestSourceForTransientInput(
    options: XRTransientInputHitTestOptionsInit
  ): Promise<XRTransientInputHitTestSource>;

  // legacy AR hit test
  requestHitTest(
    ray: XRRay,
    referenceSpace: XRReferenceSpace
  ): Promise<XRHitResult[]>;

  // legacy plane detection
  updateWorldTrackingState(options: {
    planeDetectionState?: { enabled: boolean };
  }): void;
}

export interface XRReferenceSpace extends XRSpace {
  getOffsetReferenceSpace(originOffset: XRRigidTransform): XRReferenceSpace;
  onreset: any;
}

export declare type XRPlaneSet = Set<XRPlane>;
export declare type XRAnchorSet = Set<XRAnchor>;

export interface XRFrame {
  readonly session: XRSession;
  getViewerPose(referenceSpace: XRReferenceSpace): XRViewerPose | undefined;
  getPose(space: XRSpace, baseSpace: XRSpace): XRPose | undefined;

  // AR
  getHitTestResults(hitTestSource: XRHitTestSource): Array<XRHitTestResult>;
  getHitTestResultsForTransientInput(
    hitTestSource: XRTransientInputHitTestSource
  ): Array<XRTransientInputHitTestResult>;
  // Anchors
  trackedAnchors?: XRAnchorSet;
  createAnchor(pose: XRRigidTransform, space: XRSpace): Promise<XRAnchor>;
  // Planes
  worldInformation: {
    detectedPlanes?: XRPlaneSet;
  };
  // Hand tracking
  getJointPose(joint: XRJointSpace, baseSpace: XRSpace): XRJointPose;
}

export interface XRViewerPose {
  readonly transform: XRRigidTransform;
  readonly views: Array<XRView>;
}

export interface XRPose {
  readonly emulatedPosition: boolean;
  readonly transform: XRRigidTransform;
}

export interface XRWebGLLayerInit {
  antialias?: boolean;
  depth?: boolean;
  stencil?: boolean;
  alpha?: boolean;
  ignoreDepthValues?: boolean;
  framebufferScaleFactor?: number;
}

export interface XRLayer {}

export interface XRWebGLLayer extends XRLayer {
  framebuffer: WebGLFramebuffer;
  framebufferWidth: number;
  framebufferHeight: number;
  getViewport(view: XRView): XRViewport;
}

export declare class XRWebGLLayer implements XRWebGLLayer {
  constructor(
    session: XRSession,
    gl: WebGLRenderingContext | undefined,
    options?: XRWebGLLayerInit
  );
}

export interface DOMPointInit {
  w?: number;
  x?: number;
  y?: number;
  z?: number;
}

export declare class XRRigidTransform {
  constructor(matrix: Float32Array | DOMPointInit, direction?: DOMPointInit);
  position: DOMPointReadOnly;
  orientation: DOMPointReadOnly;
  matrix: Float32Array;
  inverse: XRRigidTransform;
}

export interface XRView {
  readonly eye: XREye;
  readonly projectionMatrix: Float32Array;
  readonly viewMatrix: Float32Array;
  readonly transform: XRRigidTransform;
}

export interface XRRayDirectionInit {
  x?: number;
  y?: number;
  z?: number;
  w?: number;
}

export declare class XRRay {
  readonly origin: DOMPointReadOnly;
  readonly direction: XRRayDirectionInit;
  matrix: Float32Array;

  constructor(
    transformOrOrigin: XRRigidTransform | DOMPointInit,
    direction?: XRRayDirectionInit
  );
}

export declare enum XRHitTestTrackableType {
  "point",
  "plane",
  "mesh",
}

export interface XRHitResult {
  hitMatrix: Float32Array;
}

export interface XRTransientInputHitTestResult {
  readonly inputSource: XRInputSource;
  readonly results: Array<XRHitTestResult>;
}

export interface XRHitTestResult {
  getPose(baseSpace: XRSpace): XRPose | undefined | null;
  // When anchor system is enabled
  createAnchor?(pose: XRRigidTransform): Promise<XRAnchor>;
}

export interface XRHitTestSource {
  cancel(): void;
}

export interface XRTransientInputHitTestSource {
  cancel(): void;
}

export interface XRHitTestOptionsInit {
  space: XRSpace;
  entityTypes?: Array<XRHitTestTrackableType>;
  offsetRay?: XRRay;
}

export interface XRTransientInputHitTestOptionsInit {
  profile: string;
  entityTypes?: Array<XRHitTestTrackableType>;
  offsetRay?: XRRay;
}

export interface XRAnchor {
  anchorSpace: XRSpace;
  delete(): void;
}

export interface XRPlane {
  orientation: "Horizontal" | "Vertical";
  planeSpace: XRSpace;
  polygon: Array<DOMPointReadOnly>;
  lastChangedTime: number;
}

export interface XRJointSpace extends XRSpace {}

export interface XRJointPose extends XRPose {
  radius: number | undefined;
}

export declare class XRHand extends Array<XRJointSpace> {
  readonly length: number;

  static readonly WRIST = 0;

  static readonly THUMB_METACARPAL = 1;
  static readonly THUMB_PHALANX_PROXIMAL = 2;
  static readonly THUMB_PHALANX_DISTAL = 3;
  static readonly THUMB_PHALANX_TIP = 4;

  static readonly INDEX_METACARPAL = 5;
  static readonly INDEX_PHALANX_PROXIMAL = 6;
  static readonly INDEX_PHALANX_INTERMEDIATE = 7;
  static readonly INDEX_PHALANX_DISTAL = 8;
  static readonly INDEX_PHALANX_TIP = 9;

  static readonly MIDDLE_METACARPAL = 10;
  static readonly MIDDLE_PHALANX_PROXIMAL = 11;
  static readonly MIDDLE_PHALANX_INTERMEDIATE = 12;
  static readonly MIDDLE_PHALANX_DISTAL = 13;
  static readonly MIDDLE_PHALANX_TIP = 14;

  static readonly RING_METACARPAL = 15;
  static readonly RING_PHALANX_PROXIMAL = 16;
  static readonly RING_PHALANX_INTERMEDIATE = 17;
  static readonly RING_PHALANX_DISTAL = 18;
  static readonly RING_PHALANX_TIP = 19;

  static readonly LITTLE_METACARPAL = 20;
  static readonly LITTLE_PHALANX_PROXIMAL = 21;
  static readonly LITTLE_PHALANX_INTERMEDIATE = 22;
  static readonly LITTLE_PHALANX_DISTAL = 23;
  static readonly LITTLE_PHALANX_TIP = 24;
}

declare type Constructor<T = object> = {
  new (...args: any[]): T;
  prototype: T;
};

export interface XRInputSourceChangeEvent {
  session: XRSession;
  removed: Array<XRInputSource>;
  added: Array<XRInputSource>;
}

export interface XRInputSourceEvent extends Event {
  readonly frame: XRFrame;
  readonly inputSource: XRInputSource;
}
