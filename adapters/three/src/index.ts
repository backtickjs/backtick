// `three`, name for name, in alphabetical order: a value where three both
// exports and declares it, with the instance type of each class it names; a
// type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as Three from "three";
import { three } from "./imports.js";

export const ACESFilmicToneMapping: Client<typeof Three.ACESFilmicToneMapping> =
  three("ACESFilmicToneMapping");
export const AddEquation: Client<typeof Three.AddEquation> =
  three("AddEquation");
export const AddOperation: Client<typeof Three.AddOperation> =
  three("AddOperation");
export const AdditiveAnimationBlendMode: Client<
  typeof Three.AdditiveAnimationBlendMode
> = three("AdditiveAnimationBlendMode");
export const AdditiveBlending: Client<typeof Three.AdditiveBlending> =
  three("AdditiveBlending");
export const AgXToneMapping: Client<typeof Three.AgXToneMapping> =
  three("AgXToneMapping");
export const AlphaFormat: Client<typeof Three.AlphaFormat> =
  three("AlphaFormat");
export const AlwaysCompare: Client<typeof Three.AlwaysCompare> =
  three("AlwaysCompare");
export const AlwaysDepth: Client<typeof Three.AlwaysDepth> =
  three("AlwaysDepth");
export const AlwaysStencilFunc: Client<typeof Three.AlwaysStencilFunc> =
  three("AlwaysStencilFunc");
export const AmbientLight: Client<typeof Three.AmbientLight> =
  three("AmbientLight");
export type AmbientLight = Three.AmbientLight;
export const AnimationAction: Client<typeof Three.AnimationAction> =
  three("AnimationAction");
export type AnimationAction = Three.AnimationAction;
export const AnimationClip: Client<typeof Three.AnimationClip> =
  three("AnimationClip");
export type AnimationClip = Three.AnimationClip;
export const AnimationLoader: Client<typeof Three.AnimationLoader> =
  three("AnimationLoader");
export type AnimationLoader = Three.AnimationLoader;
export const AnimationMixer: Client<typeof Three.AnimationMixer> =
  three("AnimationMixer");
export type AnimationMixer = Three.AnimationMixer;
export const AnimationObjectGroup: Client<typeof Three.AnimationObjectGroup> =
  three("AnimationObjectGroup");
export type AnimationObjectGroup = Three.AnimationObjectGroup;
export const AnimationUtils: Client<typeof Three.AnimationUtils> =
  three("AnimationUtils");
export type AnimationUtils = Three.AnimationUtils;
export const ArcCurve: Client<typeof Three.ArcCurve> = three("ArcCurve");
export type ArcCurve = Three.ArcCurve;
export const ArrayCamera: Client<typeof Three.ArrayCamera> =
  three("ArrayCamera");
export type ArrayCamera = Three.ArrayCamera;
export const ArrowHelper: Client<typeof Three.ArrowHelper> =
  three("ArrowHelper");
export type ArrowHelper = Three.ArrowHelper;
export const AttachedBindMode: Client<typeof Three.AttachedBindMode> =
  three("AttachedBindMode");
export const Audio: Client<typeof Three.Audio> = three("Audio");
export type Audio<NodeType extends AudioNode = GainNode> =
  Three.Audio<NodeType>;
export const AudioAnalyser: Client<typeof Three.AudioAnalyser> =
  three("AudioAnalyser");
export type AudioAnalyser = Three.AudioAnalyser;
export const AudioContext: Client<typeof Three.AudioContext> =
  three("AudioContext");
export const AudioListener: Client<typeof Three.AudioListener> =
  three("AudioListener");
export type AudioListener = Three.AudioListener;
export const AudioLoader: Client<typeof Three.AudioLoader> =
  three("AudioLoader");
export type AudioLoader = Three.AudioLoader;
export const AxesHelper: Client<typeof Three.AxesHelper> = three("AxesHelper");
export type AxesHelper = Three.AxesHelper;
export const BackSide: Client<typeof Three.BackSide> = three("BackSide");
export const BasicDepthPacking: Client<typeof Three.BasicDepthPacking> =
  three("BasicDepthPacking");
export const BasicShadowMap: Client<typeof Three.BasicShadowMap> =
  three("BasicShadowMap");
export const BatchedMesh: Client<typeof Three.BatchedMesh> =
  three("BatchedMesh");
export type BatchedMesh = Three.BatchedMesh;
export const Bone: Client<typeof Three.Bone> = three("Bone");
export type Bone<
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.Bone<TEventMap>;
export const BooleanKeyframeTrack: Client<typeof Three.BooleanKeyframeTrack> =
  three("BooleanKeyframeTrack");
export type BooleanKeyframeTrack = Three.BooleanKeyframeTrack;
export const Box2: Client<typeof Three.Box2> = three("Box2");
export type Box2 = Three.Box2;
export const Box3: Client<typeof Three.Box3> = three("Box3");
export type Box3 = Three.Box3;
export const Box3Helper: Client<typeof Three.Box3Helper> = three("Box3Helper");
export type Box3Helper = Three.Box3Helper;
export const BoxGeometry: Client<typeof Three.BoxGeometry> =
  three("BoxGeometry");
export type BoxGeometry = Three.BoxGeometry;
export const BoxHelper: Client<typeof Three.BoxHelper> = three("BoxHelper");
export type BoxHelper = Three.BoxHelper;
export const BufferAttribute: Client<typeof Three.BufferAttribute> =
  three("BufferAttribute");
export type BufferAttribute = Three.BufferAttribute;
export const BufferGeometry: Client<typeof Three.BufferGeometry> =
  three("BufferGeometry");
export type BufferGeometry<
  Attributes extends Three.NormalOrGLBufferAttributes =
    Three.NormalBufferAttributes,
  TEventMap extends Three.BufferGeometryEventMap = Three.BufferGeometryEventMap,
> = Three.BufferGeometry<Attributes, TEventMap>;
export const BufferGeometryLoader: Client<typeof Three.BufferGeometryLoader> =
  three("BufferGeometryLoader");
export type BufferGeometryLoader = Three.BufferGeometryLoader;
export const ByteType: Client<typeof Three.ByteType> = three("ByteType");
export const Cache: Client<typeof Three.Cache> = three("Cache");
export const Camera: Client<typeof Three.Camera> = three("Camera");
export type Camera = Three.Camera;
export const CameraHelper: Client<typeof Three.CameraHelper> =
  three("CameraHelper");
export type CameraHelper = Three.CameraHelper;
export const CanvasTexture: Client<typeof Three.CanvasTexture> =
  three("CanvasTexture");
export type CanvasTexture<TCanvas = HTMLCanvasElement> =
  Three.CanvasTexture<TCanvas>;
export const CapsuleGeometry: Client<typeof Three.CapsuleGeometry> =
  three("CapsuleGeometry");
export type CapsuleGeometry = Three.CapsuleGeometry;
export const CatmullRomCurve3: Client<typeof Three.CatmullRomCurve3> =
  three("CatmullRomCurve3");
export type CatmullRomCurve3 = Three.CatmullRomCurve3;
export const CineonToneMapping: Client<typeof Three.CineonToneMapping> =
  three("CineonToneMapping");
export const CircleGeometry: Client<typeof Three.CircleGeometry> =
  three("CircleGeometry");
export type CircleGeometry = Three.CircleGeometry;
export const ClampToEdgeWrapping: Client<typeof Three.ClampToEdgeWrapping> =
  three("ClampToEdgeWrapping");
export const Clock: Client<typeof Three.Clock> = three("Clock");
export type Clock = Three.Clock;
export const Color: Client<typeof Three.Color> = three("Color");
export type Color = Three.Color;
export const ColorKeyframeTrack: Client<typeof Three.ColorKeyframeTrack> =
  three("ColorKeyframeTrack");
export type ColorKeyframeTrack = Three.ColorKeyframeTrack;
export const ColorManagement: Client<typeof Three.ColorManagement> =
  three("ColorManagement");
export type ColorManagement = Three.ColorManagement;
export const CompressedArrayTexture: Client<
  typeof Three.CompressedArrayTexture
> = three("CompressedArrayTexture");
export type CompressedArrayTexture = Three.CompressedArrayTexture;
export const CompressedCubeTexture: Client<typeof Three.CompressedCubeTexture> =
  three("CompressedCubeTexture");
export type CompressedCubeTexture = Three.CompressedCubeTexture;
export const CompressedTexture: Client<typeof Three.CompressedTexture> =
  three("CompressedTexture");
export type CompressedTexture<TImageData = Three.CompressedTextureImageData> =
  Three.CompressedTexture<TImageData>;
export const CompressedTextureLoader: Client<
  typeof Three.CompressedTextureLoader
> = three("CompressedTextureLoader");
export type CompressedTextureLoader = Three.CompressedTextureLoader;
export const ConeGeometry: Client<typeof Three.ConeGeometry> =
  three("ConeGeometry");
export type ConeGeometry = Three.ConeGeometry;
export const ConstantAlphaFactor: Client<typeof Three.ConstantAlphaFactor> =
  three("ConstantAlphaFactor");
export const ConstantColorFactor: Client<typeof Three.ConstantColorFactor> =
  three("ConstantColorFactor");
export const Controls: Client<typeof Three.Controls> = three("Controls");
export type Controls<TEventMap extends {}> = Three.Controls<TEventMap>;
export const CubeCamera: Client<typeof Three.CubeCamera> = three("CubeCamera");
export type CubeCamera = Three.CubeCamera;
export const CubeReflectionMapping: Client<typeof Three.CubeReflectionMapping> =
  three("CubeReflectionMapping");
export const CubeRefractionMapping: Client<typeof Three.CubeRefractionMapping> =
  three("CubeRefractionMapping");
export const CubeTexture: Client<typeof Three.CubeTexture> =
  three("CubeTexture");
export type CubeTexture<TImage = unknown> = Three.CubeTexture<TImage>;
export const CubeTextureLoader: Client<typeof Three.CubeTextureLoader> =
  three("CubeTextureLoader");
export type CubeTextureLoader = Three.CubeTextureLoader;
export const CubeUVReflectionMapping: Client<
  typeof Three.CubeUVReflectionMapping
> = three("CubeUVReflectionMapping");
export const CubicBezierCurve: Client<typeof Three.CubicBezierCurve> =
  three("CubicBezierCurve");
export type CubicBezierCurve = Three.CubicBezierCurve;
export const CubicBezierCurve3: Client<typeof Three.CubicBezierCurve3> =
  three("CubicBezierCurve3");
export type CubicBezierCurve3 = Three.CubicBezierCurve3;
export const CubicInterpolant: Client<typeof Three.CubicInterpolant> =
  three("CubicInterpolant");
export type CubicInterpolant = Three.CubicInterpolant;
export const CullFaceBack: Client<typeof Three.CullFaceBack> =
  three("CullFaceBack");
export const CullFaceFront: Client<typeof Three.CullFaceFront> =
  three("CullFaceFront");
export const CullFaceFrontBack: Client<typeof Three.CullFaceFrontBack> =
  three("CullFaceFrontBack");
export const CullFaceNone: Client<typeof Three.CullFaceNone> =
  three("CullFaceNone");
export const Curve: Client<typeof Three.Curve> = three("Curve");
export type Curve<TVector extends Three.Vector2 | Three.Vector3> =
  Three.Curve<TVector>;
export const CurvePath: Client<typeof Three.CurvePath> = three("CurvePath");
export type CurvePath<TVector extends Three.Vector2 | Three.Vector3> =
  Three.CurvePath<TVector>;
export const CustomBlending: Client<typeof Three.CustomBlending> =
  three("CustomBlending");
export const CustomToneMapping: Client<typeof Three.CustomToneMapping> =
  three("CustomToneMapping");
export const CylinderGeometry: Client<typeof Three.CylinderGeometry> =
  three("CylinderGeometry");
export type CylinderGeometry = Three.CylinderGeometry;
export const Cylindrical: Client<typeof Three.Cylindrical> =
  three("Cylindrical");
export type Cylindrical = Three.Cylindrical;
export const Data3DTexture: Client<typeof Three.Data3DTexture> =
  three("Data3DTexture");
export type Data3DTexture = Three.Data3DTexture;
export const DataArrayTexture: Client<typeof Three.DataArrayTexture> =
  three("DataArrayTexture");
export type DataArrayTexture = Three.DataArrayTexture;
export const DataTexture: Client<typeof Three.DataTexture> =
  three("DataTexture");
export type DataTexture = Three.DataTexture;
export const DataTextureLoader: Client<typeof Three.DataTextureLoader> =
  three("DataTextureLoader");
export type DataTextureLoader = Three.DataTextureLoader;
export const DataUtils: Client<typeof Three.DataUtils> = three("DataUtils");
export type DataUtils = Three.DataUtils;
export const DecrementStencilOp: Client<typeof Three.DecrementStencilOp> =
  three("DecrementStencilOp");
export const DecrementWrapStencilOp: Client<
  typeof Three.DecrementWrapStencilOp
> = three("DecrementWrapStencilOp");
export const DefaultLoadingManager: Client<typeof Three.DefaultLoadingManager> =
  three("DefaultLoadingManager");
export const DepthFormat: Client<typeof Three.DepthFormat> =
  three("DepthFormat");
export const DepthStencilFormat: Client<typeof Three.DepthStencilFormat> =
  three("DepthStencilFormat");
export const DepthTexture: Client<typeof Three.DepthTexture> =
  three("DepthTexture");
export type DepthTexture = Three.DepthTexture;
export const DetachedBindMode: Client<typeof Three.DetachedBindMode> =
  three("DetachedBindMode");
export const DirectionalLight: Client<typeof Three.DirectionalLight> =
  three("DirectionalLight");
export type DirectionalLight = Three.DirectionalLight;
export const DirectionalLightHelper: Client<
  typeof Three.DirectionalLightHelper
> = three("DirectionalLightHelper");
export type DirectionalLightHelper = Three.DirectionalLightHelper;
export const DiscreteInterpolant: Client<typeof Three.DiscreteInterpolant> =
  three("DiscreteInterpolant");
export type DiscreteInterpolant = Three.DiscreteInterpolant;
export const DodecahedronGeometry: Client<typeof Three.DodecahedronGeometry> =
  three("DodecahedronGeometry");
export type DodecahedronGeometry = Three.DodecahedronGeometry;
export const DoubleSide: Client<typeof Three.DoubleSide> = three("DoubleSide");
export const DstAlphaFactor: Client<typeof Three.DstAlphaFactor> =
  three("DstAlphaFactor");
export const DstColorFactor: Client<typeof Three.DstColorFactor> =
  three("DstColorFactor");
export const DynamicCopyUsage: Client<typeof Three.DynamicCopyUsage> =
  three("DynamicCopyUsage");
export const DynamicDrawUsage: Client<typeof Three.DynamicDrawUsage> =
  three("DynamicDrawUsage");
export const DynamicReadUsage: Client<typeof Three.DynamicReadUsage> =
  three("DynamicReadUsage");
export const EdgesGeometry: Client<typeof Three.EdgesGeometry> =
  three("EdgesGeometry");
export type EdgesGeometry<
  TBufferGeometry extends Three.BufferGeometry = Three.BufferGeometry,
> = Three.EdgesGeometry<TBufferGeometry>;
export const EllipseCurve: Client<typeof Three.EllipseCurve> =
  three("EllipseCurve");
export type EllipseCurve = Three.EllipseCurve;
export const EqualCompare: Client<typeof Three.EqualCompare> =
  three("EqualCompare");
export const EqualDepth: Client<typeof Three.EqualDepth> = three("EqualDepth");
export const EqualStencilFunc: Client<typeof Three.EqualStencilFunc> =
  three("EqualStencilFunc");
export const EquirectangularReflectionMapping: Client<
  typeof Three.EquirectangularReflectionMapping
> = three("EquirectangularReflectionMapping");
export const EquirectangularRefractionMapping: Client<
  typeof Three.EquirectangularRefractionMapping
> = three("EquirectangularRefractionMapping");
export const Euler: Client<typeof Three.Euler> = three("Euler");
export type Euler = Three.Euler;
export const EventDispatcher: Client<typeof Three.EventDispatcher> =
  three("EventDispatcher");
export type EventDispatcher<TEventMap extends {} = {}> =
  Three.EventDispatcher<TEventMap>;
export const ExternalTexture: Client<typeof Three.ExternalTexture> =
  three("ExternalTexture");
export type ExternalTexture = Three.ExternalTexture;
export const ExtrudeGeometry: Client<typeof Three.ExtrudeGeometry> =
  three("ExtrudeGeometry");
export type ExtrudeGeometry = Three.ExtrudeGeometry;
export const FileLoader: Client<typeof Three.FileLoader> = three("FileLoader");
export type FileLoader = Three.FileLoader;
export const Float16BufferAttribute: Client<
  typeof Three.Float16BufferAttribute
> = three("Float16BufferAttribute");
export type Float16BufferAttribute = Three.Float16BufferAttribute;
export const Float32BufferAttribute: Client<
  typeof Three.Float32BufferAttribute
> = three("Float32BufferAttribute");
export type Float32BufferAttribute = Three.Float32BufferAttribute;
export const FloatType: Client<typeof Three.FloatType> = three("FloatType");
export const Fog: Client<typeof Three.Fog> = three("Fog");
export type Fog = Three.Fog;
export const FogExp2: Client<typeof Three.FogExp2> = three("FogExp2");
export type FogExp2 = Three.FogExp2;
export const FramebufferTexture: Client<typeof Three.FramebufferTexture> =
  three("FramebufferTexture");
export type FramebufferTexture = Three.FramebufferTexture;
export const FrontSide: Client<typeof Three.FrontSide> = three("FrontSide");
export const Frustum: Client<typeof Three.Frustum> = three("Frustum");
export type Frustum = Three.Frustum;
export const FrustumArray: Client<typeof Three.FrustumArray> =
  three("FrustumArray");
export type FrustumArray = Three.FrustumArray;
export const GLBufferAttribute: Client<typeof Three.GLBufferAttribute> =
  three("GLBufferAttribute");
export type GLBufferAttribute = Three.GLBufferAttribute;
export const GLSL1: Client<typeof Three.GLSL1> = three("GLSL1");
export const GLSL3: Client<typeof Three.GLSL3> = three("GLSL3");
export const GreaterCompare: Client<typeof Three.GreaterCompare> =
  three("GreaterCompare");
export const GreaterDepth: Client<typeof Three.GreaterDepth> =
  three("GreaterDepth");
export const GreaterEqualCompare: Client<typeof Three.GreaterEqualCompare> =
  three("GreaterEqualCompare");
export const GreaterEqualDepth: Client<typeof Three.GreaterEqualDepth> =
  three("GreaterEqualDepth");
export const GreaterEqualStencilFunc: Client<
  typeof Three.GreaterEqualStencilFunc
> = three("GreaterEqualStencilFunc");
export const GreaterStencilFunc: Client<typeof Three.GreaterStencilFunc> =
  three("GreaterStencilFunc");
export const GridHelper: Client<typeof Three.GridHelper> = three("GridHelper");
export type GridHelper = Three.GridHelper;
export const Group: Client<typeof Three.Group> = three("Group");
export type Group<
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.Group<TEventMap>;
export const HalfFloatType: Client<typeof Three.HalfFloatType> =
  three("HalfFloatType");
export const HemisphereLight: Client<typeof Three.HemisphereLight> =
  three("HemisphereLight");
export type HemisphereLight = Three.HemisphereLight;
export const HemisphereLightHelper: Client<typeof Three.HemisphereLightHelper> =
  three("HemisphereLightHelper");
export type HemisphereLightHelper = Three.HemisphereLightHelper;
export const IcosahedronGeometry: Client<typeof Three.IcosahedronGeometry> =
  three("IcosahedronGeometry");
export type IcosahedronGeometry = Three.IcosahedronGeometry;
export const ImageBitmapLoader: Client<typeof Three.ImageBitmapLoader> =
  three("ImageBitmapLoader");
export type ImageBitmapLoader = Three.ImageBitmapLoader;
export const ImageLoader: Client<typeof Three.ImageLoader> =
  three("ImageLoader");
export type ImageLoader = Three.ImageLoader;
export const ImageUtils: Client<typeof Three.ImageUtils> = three("ImageUtils");
export type ImageUtils = Three.ImageUtils;
export const IncrementStencilOp: Client<typeof Three.IncrementStencilOp> =
  three("IncrementStencilOp");
export const IncrementWrapStencilOp: Client<
  typeof Three.IncrementWrapStencilOp
> = three("IncrementWrapStencilOp");
export const InstancedBufferAttribute: Client<
  typeof Three.InstancedBufferAttribute
> = three("InstancedBufferAttribute");
export type InstancedBufferAttribute = Three.InstancedBufferAttribute;
export const InstancedBufferGeometry: Client<
  typeof Three.InstancedBufferGeometry
> = three("InstancedBufferGeometry");
export type InstancedBufferGeometry = Three.InstancedBufferGeometry;
export const InstancedInterleavedBuffer: Client<
  typeof Three.InstancedInterleavedBuffer
> = three("InstancedInterleavedBuffer");
export type InstancedInterleavedBuffer = Three.InstancedInterleavedBuffer;
export const InstancedMesh: Client<typeof Three.InstancedMesh> =
  three("InstancedMesh");
export type InstancedMesh<
  TGeometry extends Three.BufferGeometry = Three.BufferGeometry,
  TMaterial extends Three.Material | Three.Material[] =
    | Three.Material
    | Three.Material[],
  TEventMap extends Three.InstancedMeshEventMap = Three.InstancedMeshEventMap,
> = Three.InstancedMesh<TGeometry, TMaterial, TEventMap>;
export const Int16BufferAttribute: Client<typeof Three.Int16BufferAttribute> =
  three("Int16BufferAttribute");
export type Int16BufferAttribute = Three.Int16BufferAttribute;
export const Int32BufferAttribute: Client<typeof Three.Int32BufferAttribute> =
  three("Int32BufferAttribute");
export type Int32BufferAttribute = Three.Int32BufferAttribute;
export const Int8BufferAttribute: Client<typeof Three.Int8BufferAttribute> =
  three("Int8BufferAttribute");
export type Int8BufferAttribute = Three.Int8BufferAttribute;
export const IntType: Client<typeof Three.IntType> = three("IntType");
export const InterleavedBuffer: Client<typeof Three.InterleavedBuffer> =
  three("InterleavedBuffer");
export type InterleavedBuffer = Three.InterleavedBuffer;
export const InterleavedBufferAttribute: Client<
  typeof Three.InterleavedBufferAttribute
> = three("InterleavedBufferAttribute");
export type InterleavedBufferAttribute = Three.InterleavedBufferAttribute;
export const Interpolant: Client<typeof Three.Interpolant> =
  three("Interpolant");
export type Interpolant = Three.Interpolant;
export const InterpolateDiscrete: Client<typeof Three.InterpolateDiscrete> =
  three("InterpolateDiscrete");
export const InterpolateLinear: Client<typeof Three.InterpolateLinear> =
  three("InterpolateLinear");
export const InterpolateSmooth: Client<typeof Three.InterpolateSmooth> =
  three("InterpolateSmooth");
export const InterpolationSamplingMode: Client<
  typeof Three.InterpolationSamplingMode
> = three("InterpolationSamplingMode");
export type InterpolationSamplingMode = Three.InterpolationSamplingMode;
export const InterpolationSamplingType: Client<
  typeof Three.InterpolationSamplingType
> = three("InterpolationSamplingType");
export type InterpolationSamplingType = Three.InterpolationSamplingType;
export const InvertStencilOp: Client<typeof Three.InvertStencilOp> =
  three("InvertStencilOp");
export const KeepStencilOp: Client<typeof Three.KeepStencilOp> =
  three("KeepStencilOp");
export const KeyframeTrack: Client<typeof Three.KeyframeTrack> =
  three("KeyframeTrack");
export type KeyframeTrack = Three.KeyframeTrack;
export const LOD: Client<typeof Three.LOD> = three("LOD");
export type LOD<
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.LOD<TEventMap>;
export const LatheGeometry: Client<typeof Three.LatheGeometry> =
  three("LatheGeometry");
export type LatheGeometry = Three.LatheGeometry;
export const Layers: Client<typeof Three.Layers> = three("Layers");
export type Layers = Three.Layers;
export const LessCompare: Client<typeof Three.LessCompare> =
  three("LessCompare");
export const LessDepth: Client<typeof Three.LessDepth> = three("LessDepth");
export const LessEqualCompare: Client<typeof Three.LessEqualCompare> =
  three("LessEqualCompare");
export const LessEqualDepth: Client<typeof Three.LessEqualDepth> =
  three("LessEqualDepth");
export const LessEqualStencilFunc: Client<typeof Three.LessEqualStencilFunc> =
  three("LessEqualStencilFunc");
export const LessStencilFunc: Client<typeof Three.LessStencilFunc> =
  three("LessStencilFunc");
export const Light: Client<typeof Three.Light> = three("Light");
export type Light<
  TShadowSupport extends Three.LightShadow | undefined =
    | Three.LightShadow
    | undefined,
> = Three.Light<TShadowSupport>;
export const LightProbe: Client<typeof Three.LightProbe> = three("LightProbe");
export type LightProbe = Three.LightProbe;
export const Line: Client<typeof Three.Line> = three("Line");
export type Line<
  TGeometry extends Three.BufferGeometry = Three.BufferGeometry,
  TMaterial extends Three.Material | Three.Material[] =
    | Three.Material
    | Three.Material[],
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.Line<TGeometry, TMaterial, TEventMap>;
export const Line3: Client<typeof Three.Line3> = three("Line3");
export type Line3 = Three.Line3;
export const LineBasicMaterial: Client<typeof Three.LineBasicMaterial> =
  three("LineBasicMaterial");
export type LineBasicMaterial = Three.LineBasicMaterial;
export const LineCurve: Client<typeof Three.LineCurve> = three("LineCurve");
export type LineCurve = Three.LineCurve;
export const LineCurve3: Client<typeof Three.LineCurve3> = three("LineCurve3");
export type LineCurve3 = Three.LineCurve3;
export const LineDashedMaterial: Client<typeof Three.LineDashedMaterial> =
  three("LineDashedMaterial");
export type LineDashedMaterial = Three.LineDashedMaterial;
export const LineLoop: Client<typeof Three.LineLoop> = three("LineLoop");
export type LineLoop<
  TGeometry extends Three.BufferGeometry = Three.BufferGeometry,
  TMaterial extends Three.Material | Three.Material[] =
    | Three.Material
    | Three.Material[],
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.LineLoop<TGeometry, TMaterial, TEventMap>;
export const LineSegments: Client<typeof Three.LineSegments> =
  three("LineSegments");
export type LineSegments<
  TGeometry extends Three.BufferGeometry = Three.BufferGeometry,
  TMaterial extends Three.Material | Three.Material[] =
    | Three.Material
    | Three.Material[],
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.LineSegments<TGeometry, TMaterial, TEventMap>;
export const LinearFilter: Client<typeof Three.LinearFilter> =
  three("LinearFilter");
export const LinearInterpolant: Client<typeof Three.LinearInterpolant> =
  three("LinearInterpolant");
export type LinearInterpolant = Three.LinearInterpolant;
export const LinearMipMapLinearFilter: Client<
  typeof Three.LinearMipMapLinearFilter
> = three("LinearMipMapLinearFilter");
export const LinearMipMapNearestFilter: Client<
  typeof Three.LinearMipMapNearestFilter
> = three("LinearMipMapNearestFilter");
export const LinearMipmapLinearFilter: Client<
  typeof Three.LinearMipmapLinearFilter
> = three("LinearMipmapLinearFilter");
export const LinearMipmapNearestFilter: Client<
  typeof Three.LinearMipmapNearestFilter
> = three("LinearMipmapNearestFilter");
export const LinearSRGBColorSpace: Client<typeof Three.LinearSRGBColorSpace> =
  three("LinearSRGBColorSpace");
export const LinearToneMapping: Client<typeof Three.LinearToneMapping> =
  three("LinearToneMapping");
export const LinearTransfer: Client<typeof Three.LinearTransfer> =
  three("LinearTransfer");
export const Loader: Client<typeof Three.Loader> = three("Loader");
export type Loader<TData = unknown, TUrl = string> = Three.Loader<TData, TUrl>;
export const LoaderUtils: Client<typeof Three.LoaderUtils> =
  three("LoaderUtils");
export type LoaderUtils = Three.LoaderUtils;
export const LoadingManager: Client<typeof Three.LoadingManager> =
  three("LoadingManager");
export type LoadingManager = Three.LoadingManager;
export const LoopOnce: Client<typeof Three.LoopOnce> = three("LoopOnce");
export const LoopPingPong: Client<typeof Three.LoopPingPong> =
  three("LoopPingPong");
export const LoopRepeat: Client<typeof Three.LoopRepeat> = three("LoopRepeat");
export const MOUSE: Client<typeof Three.MOUSE> = three("MOUSE");
export type MOUSE = Three.MOUSE;
export const Material: Client<typeof Three.Material> = three("Material");
export type Material = Three.Material;
export const MaterialLoader: Client<typeof Three.MaterialLoader> =
  three("MaterialLoader");
export type MaterialLoader = Three.MaterialLoader;
export const MathUtils: Client<typeof Three.MathUtils> = three("MathUtils");
export const Matrix2: Client<typeof Three.Matrix2> = three("Matrix2");
export type Matrix2 = Three.Matrix2;
export const Matrix3: Client<typeof Three.Matrix3> = three("Matrix3");
export type Matrix3 = Three.Matrix3;
export const Matrix4: Client<typeof Three.Matrix4> = three("Matrix4");
export type Matrix4 = Three.Matrix4;
export const MaxEquation: Client<typeof Three.MaxEquation> =
  three("MaxEquation");
export const Mesh: Client<typeof Three.Mesh> = three("Mesh");
export type Mesh<
  TGeometry extends Three.BufferGeometry = Three.BufferGeometry,
  TMaterial extends Three.Material | Three.Material[] =
    | Three.Material
    | Three.Material[],
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.Mesh<TGeometry, TMaterial, TEventMap>;
export const MeshBasicMaterial: Client<typeof Three.MeshBasicMaterial> =
  three("MeshBasicMaterial");
export type MeshBasicMaterial = Three.MeshBasicMaterial;
export const MeshDepthMaterial: Client<typeof Three.MeshDepthMaterial> =
  three("MeshDepthMaterial");
export type MeshDepthMaterial = Three.MeshDepthMaterial;
export const MeshDistanceMaterial: Client<typeof Three.MeshDistanceMaterial> =
  three("MeshDistanceMaterial");
export type MeshDistanceMaterial = Three.MeshDistanceMaterial;
export const MeshLambertMaterial: Client<typeof Three.MeshLambertMaterial> =
  three("MeshLambertMaterial");
export type MeshLambertMaterial = Three.MeshLambertMaterial;
export const MeshMatcapMaterial: Client<typeof Three.MeshMatcapMaterial> =
  three("MeshMatcapMaterial");
export type MeshMatcapMaterial = Three.MeshMatcapMaterial;
export const MeshNormalMaterial: Client<typeof Three.MeshNormalMaterial> =
  three("MeshNormalMaterial");
export type MeshNormalMaterial = Three.MeshNormalMaterial;
export const MeshPhongMaterial: Client<typeof Three.MeshPhongMaterial> =
  three("MeshPhongMaterial");
export type MeshPhongMaterial = Three.MeshPhongMaterial;
export const MeshPhysicalMaterial: Client<typeof Three.MeshPhysicalMaterial> =
  three("MeshPhysicalMaterial");
export type MeshPhysicalMaterial = Three.MeshPhysicalMaterial;
export const MeshStandardMaterial: Client<typeof Three.MeshStandardMaterial> =
  three("MeshStandardMaterial");
export type MeshStandardMaterial = Three.MeshStandardMaterial;
export const MeshToonMaterial: Client<typeof Three.MeshToonMaterial> =
  three("MeshToonMaterial");
export type MeshToonMaterial = Three.MeshToonMaterial;
export const MinEquation: Client<typeof Three.MinEquation> =
  three("MinEquation");
export const MirroredRepeatWrapping: Client<
  typeof Three.MirroredRepeatWrapping
> = three("MirroredRepeatWrapping");
export const MixOperation: Client<typeof Three.MixOperation> =
  three("MixOperation");
export const MultiplyBlending: Client<typeof Three.MultiplyBlending> =
  three("MultiplyBlending");
export const MultiplyOperation: Client<typeof Three.MultiplyOperation> =
  three("MultiplyOperation");
export const NearestFilter: Client<typeof Three.NearestFilter> =
  three("NearestFilter");
export const NearestMipMapLinearFilter: Client<
  typeof Three.NearestMipMapLinearFilter
> = three("NearestMipMapLinearFilter");
export const NearestMipMapNearestFilter: Client<
  typeof Three.NearestMipMapNearestFilter
> = three("NearestMipMapNearestFilter");
export const NearestMipmapLinearFilter: Client<
  typeof Three.NearestMipmapLinearFilter
> = three("NearestMipmapLinearFilter");
export const NearestMipmapNearestFilter: Client<
  typeof Three.NearestMipmapNearestFilter
> = three("NearestMipmapNearestFilter");
export const NeutralToneMapping: Client<typeof Three.NeutralToneMapping> =
  three("NeutralToneMapping");
export const NeverCompare: Client<typeof Three.NeverCompare> =
  three("NeverCompare");
export const NeverDepth: Client<typeof Three.NeverDepth> = three("NeverDepth");
export const NeverStencilFunc: Client<typeof Three.NeverStencilFunc> =
  three("NeverStencilFunc");
export const NoBlending: Client<typeof Three.NoBlending> = three("NoBlending");
export const NoColorSpace: Client<typeof Three.NoColorSpace> =
  three("NoColorSpace");
export const NoNormalPacking: Client<typeof Three.NoNormalPacking> =
  three("NoNormalPacking");
export const NoToneMapping: Client<typeof Three.NoToneMapping> =
  three("NoToneMapping");
export const NormalAnimationBlendMode: Client<
  typeof Three.NormalAnimationBlendMode
> = three("NormalAnimationBlendMode");
export const NormalBlending: Client<typeof Three.NormalBlending> =
  three("NormalBlending");
export const NormalGAPacking: Client<typeof Three.NormalGAPacking> =
  three("NormalGAPacking");
export const NormalRGPacking: Client<typeof Three.NormalRGPacking> =
  three("NormalRGPacking");
export const NotEqualCompare: Client<typeof Three.NotEqualCompare> =
  three("NotEqualCompare");
export const NotEqualDepth: Client<typeof Three.NotEqualDepth> =
  three("NotEqualDepth");
export const NotEqualStencilFunc: Client<typeof Three.NotEqualStencilFunc> =
  three("NotEqualStencilFunc");
export const NumberKeyframeTrack: Client<typeof Three.NumberKeyframeTrack> =
  three("NumberKeyframeTrack");
export type NumberKeyframeTrack = Three.NumberKeyframeTrack;
export const Object3D: Client<typeof Three.Object3D> = three("Object3D");
export type Object3D<
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.Object3D<TEventMap>;
export const ObjectLoader: Client<typeof Three.ObjectLoader> =
  three("ObjectLoader");
export type ObjectLoader = Three.ObjectLoader;
export const ObjectSpaceNormalMap: Client<typeof Three.ObjectSpaceNormalMap> =
  three("ObjectSpaceNormalMap");
export const OctahedronGeometry: Client<typeof Three.OctahedronGeometry> =
  three("OctahedronGeometry");
export type OctahedronGeometry = Three.OctahedronGeometry;
export const OneFactor: Client<typeof Three.OneFactor> = three("OneFactor");
export const OneMinusConstantAlphaFactor: Client<
  typeof Three.OneMinusConstantAlphaFactor
> = three("OneMinusConstantAlphaFactor");
export const OneMinusConstantColorFactor: Client<
  typeof Three.OneMinusConstantColorFactor
> = three("OneMinusConstantColorFactor");
export const OneMinusDstAlphaFactor: Client<
  typeof Three.OneMinusDstAlphaFactor
> = three("OneMinusDstAlphaFactor");
export const OneMinusDstColorFactor: Client<
  typeof Three.OneMinusDstColorFactor
> = three("OneMinusDstColorFactor");
export const OneMinusSrcAlphaFactor: Client<
  typeof Three.OneMinusSrcAlphaFactor
> = three("OneMinusSrcAlphaFactor");
export const OneMinusSrcColorFactor: Client<
  typeof Three.OneMinusSrcColorFactor
> = three("OneMinusSrcColorFactor");
export const OrthographicCamera: Client<typeof Three.OrthographicCamera> =
  three("OrthographicCamera");
export type OrthographicCamera = Three.OrthographicCamera;
export const PCFShadowMap: Client<typeof Three.PCFShadowMap> =
  three("PCFShadowMap");
export const PCFSoftShadowMap: Client<typeof Three.PCFSoftShadowMap> =
  three("PCFSoftShadowMap");
export const PMREMGenerator: Client<typeof Three.PMREMGenerator> =
  three("PMREMGenerator");
export type PMREMGenerator = Three.PMREMGenerator;
export const Path: Client<typeof Three.Path> = three("Path");
export type Path = Three.Path;
export const PerspectiveCamera: Client<typeof Three.PerspectiveCamera> =
  three("PerspectiveCamera");
export type PerspectiveCamera = Three.PerspectiveCamera;
export const Plane: Client<typeof Three.Plane> = three("Plane");
export type Plane = Three.Plane;
export const PlaneGeometry: Client<typeof Three.PlaneGeometry> =
  three("PlaneGeometry");
export type PlaneGeometry = Three.PlaneGeometry;
export const PlaneHelper: Client<typeof Three.PlaneHelper> =
  three("PlaneHelper");
export type PlaneHelper = Three.PlaneHelper;
export const PointLight: Client<typeof Three.PointLight> = three("PointLight");
export type PointLight = Three.PointLight;
export const PointLightHelper: Client<typeof Three.PointLightHelper> =
  three("PointLightHelper");
export type PointLightHelper = Three.PointLightHelper;
export const Points: Client<typeof Three.Points> = three("Points");
export type Points<
  TGeometry extends Three.BufferGeometry<Three.NormalOrGLBufferAttributes> =
    Three.BufferGeometry,
  TMaterial extends Three.Material | Three.Material[] =
    | Three.Material
    | Three.Material[],
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.Points<TGeometry, TMaterial, TEventMap>;
export const PointsMaterial: Client<typeof Three.PointsMaterial> =
  three("PointsMaterial");
export type PointsMaterial = Three.PointsMaterial;
export const PolarGridHelper: Client<typeof Three.PolarGridHelper> =
  three("PolarGridHelper");
export type PolarGridHelper = Three.PolarGridHelper;
export const PolyhedronGeometry: Client<typeof Three.PolyhedronGeometry> =
  three("PolyhedronGeometry");
export type PolyhedronGeometry = Three.PolyhedronGeometry;
export const PositionalAudio: Client<typeof Three.PositionalAudio> =
  three("PositionalAudio");
export type PositionalAudio = Three.PositionalAudio;
export const PropertyBinding: Client<typeof Three.PropertyBinding> =
  three("PropertyBinding");
export type PropertyBinding = Three.PropertyBinding;
export const PropertyMixer: Client<typeof Three.PropertyMixer> =
  three("PropertyMixer");
export type PropertyMixer = Three.PropertyMixer;
export const QuadraticBezierCurve: Client<typeof Three.QuadraticBezierCurve> =
  three("QuadraticBezierCurve");
export type QuadraticBezierCurve = Three.QuadraticBezierCurve;
export const QuadraticBezierCurve3: Client<typeof Three.QuadraticBezierCurve3> =
  three("QuadraticBezierCurve3");
export type QuadraticBezierCurve3 = Three.QuadraticBezierCurve3;
export const Quaternion: Client<typeof Three.Quaternion> = three("Quaternion");
export type Quaternion = Three.Quaternion;
export const QuaternionKeyframeTrack: Client<
  typeof Three.QuaternionKeyframeTrack
> = three("QuaternionKeyframeTrack");
export type QuaternionKeyframeTrack = Three.QuaternionKeyframeTrack;
export const QuaternionLinearInterpolant: Client<
  typeof Three.QuaternionLinearInterpolant
> = three("QuaternionLinearInterpolant");
export type QuaternionLinearInterpolant = Three.QuaternionLinearInterpolant;
export const R11_EAC_Format: Client<typeof Three.R11_EAC_Format> =
  three("R11_EAC_Format");
export const RED_GREEN_RGTC2_Format: Client<
  typeof Three.RED_GREEN_RGTC2_Format
> = three("RED_GREEN_RGTC2_Format");
export const RED_RGTC1_Format: Client<typeof Three.RED_RGTC1_Format> =
  three("RED_RGTC1_Format");
export const REVISION: Client<typeof Three.REVISION> = three("REVISION");
export const RG11_EAC_Format: Client<typeof Three.RG11_EAC_Format> =
  three("RG11_EAC_Format");
export const RGBADepthPacking: Client<typeof Three.RGBADepthPacking> =
  three("RGBADepthPacking");
export const RGBAFormat: Client<typeof Three.RGBAFormat> = three("RGBAFormat");
export const RGBAIntegerFormat: Client<typeof Three.RGBAIntegerFormat> =
  three("RGBAIntegerFormat");
export const RGBA_ASTC_10x10_Format: Client<
  typeof Three.RGBA_ASTC_10x10_Format
> = three("RGBA_ASTC_10x10_Format");
export const RGBA_ASTC_10x5_Format: Client<typeof Three.RGBA_ASTC_10x5_Format> =
  three("RGBA_ASTC_10x5_Format");
export const RGBA_ASTC_10x6_Format: Client<typeof Three.RGBA_ASTC_10x6_Format> =
  three("RGBA_ASTC_10x6_Format");
export const RGBA_ASTC_10x8_Format: Client<typeof Three.RGBA_ASTC_10x8_Format> =
  three("RGBA_ASTC_10x8_Format");
export const RGBA_ASTC_12x10_Format: Client<
  typeof Three.RGBA_ASTC_12x10_Format
> = three("RGBA_ASTC_12x10_Format");
export const RGBA_ASTC_12x12_Format: Client<
  typeof Three.RGBA_ASTC_12x12_Format
> = three("RGBA_ASTC_12x12_Format");
export const RGBA_ASTC_4x4_Format: Client<typeof Three.RGBA_ASTC_4x4_Format> =
  three("RGBA_ASTC_4x4_Format");
export const RGBA_ASTC_5x4_Format: Client<typeof Three.RGBA_ASTC_5x4_Format> =
  three("RGBA_ASTC_5x4_Format");
export const RGBA_ASTC_5x5_Format: Client<typeof Three.RGBA_ASTC_5x5_Format> =
  three("RGBA_ASTC_5x5_Format");
export const RGBA_ASTC_6x5_Format: Client<typeof Three.RGBA_ASTC_6x5_Format> =
  three("RGBA_ASTC_6x5_Format");
export const RGBA_ASTC_6x6_Format: Client<typeof Three.RGBA_ASTC_6x6_Format> =
  three("RGBA_ASTC_6x6_Format");
export const RGBA_ASTC_8x5_Format: Client<typeof Three.RGBA_ASTC_8x5_Format> =
  three("RGBA_ASTC_8x5_Format");
export const RGBA_ASTC_8x6_Format: Client<typeof Three.RGBA_ASTC_8x6_Format> =
  three("RGBA_ASTC_8x6_Format");
export const RGBA_ASTC_8x8_Format: Client<typeof Three.RGBA_ASTC_8x8_Format> =
  three("RGBA_ASTC_8x8_Format");
export const RGBA_BPTC_Format: Client<typeof Three.RGBA_BPTC_Format> =
  three("RGBA_BPTC_Format");
export const RGBA_ETC2_EAC_Format: Client<typeof Three.RGBA_ETC2_EAC_Format> =
  three("RGBA_ETC2_EAC_Format");
export const RGBA_PVRTC_2BPPV1_Format: Client<
  typeof Three.RGBA_PVRTC_2BPPV1_Format
> = three("RGBA_PVRTC_2BPPV1_Format");
export const RGBA_PVRTC_4BPPV1_Format: Client<
  typeof Three.RGBA_PVRTC_4BPPV1_Format
> = three("RGBA_PVRTC_4BPPV1_Format");
export const RGBA_S3TC_DXT1_Format: Client<typeof Three.RGBA_S3TC_DXT1_Format> =
  three("RGBA_S3TC_DXT1_Format");
export const RGBA_S3TC_DXT3_Format: Client<typeof Three.RGBA_S3TC_DXT3_Format> =
  three("RGBA_S3TC_DXT3_Format");
export const RGBA_S3TC_DXT5_Format: Client<typeof Three.RGBA_S3TC_DXT5_Format> =
  three("RGBA_S3TC_DXT5_Format");
export const RGBDepthPacking: Client<typeof Three.RGBDepthPacking> =
  three("RGBDepthPacking");
export const RGBFormat: Client<typeof Three.RGBFormat> = three("RGBFormat");
export const RGBIntegerFormat: Client<typeof Three.RGBIntegerFormat> =
  three("RGBIntegerFormat");
export const RGB_BPTC_SIGNED_Format: Client<
  typeof Three.RGB_BPTC_SIGNED_Format
> = three("RGB_BPTC_SIGNED_Format");
export const RGB_BPTC_UNSIGNED_Format: Client<
  typeof Three.RGB_BPTC_UNSIGNED_Format
> = three("RGB_BPTC_UNSIGNED_Format");
export const RGB_ETC1_Format: Client<typeof Three.RGB_ETC1_Format> =
  three("RGB_ETC1_Format");
export const RGB_ETC2_Format: Client<typeof Three.RGB_ETC2_Format> =
  three("RGB_ETC2_Format");
export const RGB_PVRTC_2BPPV1_Format: Client<
  typeof Three.RGB_PVRTC_2BPPV1_Format
> = three("RGB_PVRTC_2BPPV1_Format");
export const RGB_PVRTC_4BPPV1_Format: Client<
  typeof Three.RGB_PVRTC_4BPPV1_Format
> = three("RGB_PVRTC_4BPPV1_Format");
export const RGB_S3TC_DXT1_Format: Client<typeof Three.RGB_S3TC_DXT1_Format> =
  three("RGB_S3TC_DXT1_Format");
export const RGDepthPacking: Client<typeof Three.RGDepthPacking> =
  three("RGDepthPacking");
export const RGFormat: Client<typeof Three.RGFormat> = three("RGFormat");
export const RGIntegerFormat: Client<typeof Three.RGIntegerFormat> =
  three("RGIntegerFormat");
export const RawShaderMaterial: Client<typeof Three.RawShaderMaterial> =
  three("RawShaderMaterial");
export type RawShaderMaterial = Three.RawShaderMaterial;
export const Ray: Client<typeof Three.Ray> = three("Ray");
export type Ray = Three.Ray;
export const Raycaster: Client<typeof Three.Raycaster> = three("Raycaster");
export type Raycaster = Three.Raycaster;
export const RectAreaLight: Client<typeof Three.RectAreaLight> =
  three("RectAreaLight");
export type RectAreaLight = Three.RectAreaLight;
export const RedFormat: Client<typeof Three.RedFormat> = three("RedFormat");
export const RedIntegerFormat: Client<typeof Three.RedIntegerFormat> =
  three("RedIntegerFormat");
export const ReinhardToneMapping: Client<typeof Three.ReinhardToneMapping> =
  three("ReinhardToneMapping");
export const RenderTarget: Client<typeof Three.RenderTarget> =
  three("RenderTarget");
export type RenderTarget<
  TTexture extends Three.Texture | Three.Texture[] = Three.Texture,
> = Three.RenderTarget<TTexture>;
export const RenderTarget3D: Client<typeof Three.RenderTarget3D> =
  three("RenderTarget3D");
export type RenderTarget3D = Three.RenderTarget3D;
export const RepeatWrapping: Client<typeof Three.RepeatWrapping> =
  three("RepeatWrapping");
export const ReplaceStencilOp: Client<typeof Three.ReplaceStencilOp> =
  three("ReplaceStencilOp");
export const ReverseSubtractEquation: Client<
  typeof Three.ReverseSubtractEquation
> = three("ReverseSubtractEquation");
export const RingGeometry: Client<typeof Three.RingGeometry> =
  three("RingGeometry");
export type RingGeometry = Three.RingGeometry;
export const SIGNED_R11_EAC_Format: Client<typeof Three.SIGNED_R11_EAC_Format> =
  three("SIGNED_R11_EAC_Format");
export const SIGNED_RED_GREEN_RGTC2_Format: Client<
  typeof Three.SIGNED_RED_GREEN_RGTC2_Format
> = three("SIGNED_RED_GREEN_RGTC2_Format");
export const SIGNED_RED_RGTC1_Format: Client<
  typeof Three.SIGNED_RED_RGTC1_Format
> = three("SIGNED_RED_RGTC1_Format");
export const SIGNED_RG11_EAC_Format: Client<
  typeof Three.SIGNED_RG11_EAC_Format
> = three("SIGNED_RG11_EAC_Format");
export const SRGBColorSpace: Client<typeof Three.SRGBColorSpace> =
  three("SRGBColorSpace");
export const SRGBTransfer: Client<typeof Three.SRGBTransfer> =
  three("SRGBTransfer");
export const Scene: Client<typeof Three.Scene> = three("Scene");
export type Scene<
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.Scene<TEventMap>;
export const ShaderChunk: Client<typeof Three.ShaderChunk> =
  three("ShaderChunk");
export const ShaderLib: Client<typeof Three.ShaderLib> = three("ShaderLib");
export const ShaderMaterial: Client<typeof Three.ShaderMaterial> =
  three("ShaderMaterial");
export type ShaderMaterial = Three.ShaderMaterial;
export const ShadowMaterial: Client<typeof Three.ShadowMaterial> =
  three("ShadowMaterial");
export type ShadowMaterial = Three.ShadowMaterial;
export const Shape: Client<typeof Three.Shape> = three("Shape");
export type Shape = Three.Shape;
export const ShapeGeometry: Client<typeof Three.ShapeGeometry> =
  three("ShapeGeometry");
export type ShapeGeometry = Three.ShapeGeometry;
export const ShapePath: Client<typeof Three.ShapePath> = three("ShapePath");
export type ShapePath = Three.ShapePath;
export const ShapeUtils: Client<typeof Three.ShapeUtils> = three("ShapeUtils");
export type ShapeUtils = Three.ShapeUtils;
export const ShortType: Client<typeof Three.ShortType> = three("ShortType");
export const Skeleton: Client<typeof Three.Skeleton> = three("Skeleton");
export type Skeleton = Three.Skeleton;
export const SkeletonHelper: Client<typeof Three.SkeletonHelper> =
  three("SkeletonHelper");
export type SkeletonHelper = Three.SkeletonHelper;
export const SkinnedMesh: Client<typeof Three.SkinnedMesh> =
  three("SkinnedMesh");
export type SkinnedMesh<
  TGeometry extends Three.BufferGeometry = Three.BufferGeometry,
  TMaterial extends Three.Material | Three.Material[] =
    | Three.Material
    | Three.Material[],
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.SkinnedMesh<TGeometry, TMaterial, TEventMap>;
export const Source: Client<typeof Three.Source> = three("Source");
export type Source<TData> = Three.Source<TData>;
export const Sphere: Client<typeof Three.Sphere> = three("Sphere");
export type Sphere = Three.Sphere;
export const SphereGeometry: Client<typeof Three.SphereGeometry> =
  three("SphereGeometry");
export type SphereGeometry = Three.SphereGeometry;
export const Spherical: Client<typeof Three.Spherical> = three("Spherical");
export type Spherical = Three.Spherical;
export const SphericalHarmonics3: Client<typeof Three.SphericalHarmonics3> =
  three("SphericalHarmonics3");
export type SphericalHarmonics3 = Three.SphericalHarmonics3;
export const SplineCurve: Client<typeof Three.SplineCurve> =
  three("SplineCurve");
export type SplineCurve = Three.SplineCurve;
export const SpotLight: Client<typeof Three.SpotLight> = three("SpotLight");
export type SpotLight = Three.SpotLight;
export const SpotLightHelper: Client<typeof Three.SpotLightHelper> =
  three("SpotLightHelper");
export type SpotLightHelper = Three.SpotLightHelper;
export const Sprite: Client<typeof Three.Sprite> = three("Sprite");
export type Sprite<
  TEventMap extends Three.Object3DEventMap = Three.Object3DEventMap,
> = Three.Sprite<TEventMap>;
export const SpriteMaterial: Client<typeof Three.SpriteMaterial> =
  three("SpriteMaterial");
export type SpriteMaterial = Three.SpriteMaterial;
export const SrcAlphaFactor: Client<typeof Three.SrcAlphaFactor> =
  three("SrcAlphaFactor");
export const SrcAlphaSaturateFactor: Client<
  typeof Three.SrcAlphaSaturateFactor
> = three("SrcAlphaSaturateFactor");
export const SrcColorFactor: Client<typeof Three.SrcColorFactor> =
  three("SrcColorFactor");
export const StaticCopyUsage: Client<typeof Three.StaticCopyUsage> =
  three("StaticCopyUsage");
export const StaticDrawUsage: Client<typeof Three.StaticDrawUsage> =
  three("StaticDrawUsage");
export const StaticReadUsage: Client<typeof Three.StaticReadUsage> =
  three("StaticReadUsage");
export const StereoCamera: Client<typeof Three.StereoCamera> =
  three("StereoCamera");
export type StereoCamera = Three.StereoCamera;
export const StreamCopyUsage: Client<typeof Three.StreamCopyUsage> =
  three("StreamCopyUsage");
export const StreamDrawUsage: Client<typeof Three.StreamDrawUsage> =
  three("StreamDrawUsage");
export const StreamReadUsage: Client<typeof Three.StreamReadUsage> =
  three("StreamReadUsage");
export const StringKeyframeTrack: Client<typeof Three.StringKeyframeTrack> =
  three("StringKeyframeTrack");
export type StringKeyframeTrack = Three.StringKeyframeTrack;
export const SubtractEquation: Client<typeof Three.SubtractEquation> =
  three("SubtractEquation");
export const SubtractiveBlending: Client<typeof Three.SubtractiveBlending> =
  three("SubtractiveBlending");
export const TOUCH: Client<typeof Three.TOUCH> = three("TOUCH");
export type TOUCH = Three.TOUCH;
export const TangentSpaceNormalMap: Client<typeof Three.TangentSpaceNormalMap> =
  three("TangentSpaceNormalMap");
export const TetrahedronGeometry: Client<typeof Three.TetrahedronGeometry> =
  three("TetrahedronGeometry");
export type TetrahedronGeometry = Three.TetrahedronGeometry;
export const Texture: Client<typeof Three.Texture> = three("Texture");
export type Texture<TImage = unknown> = Three.Texture<TImage>;
export const TextureLoader: Client<typeof Three.TextureLoader> =
  three("TextureLoader");
export type TextureLoader = Three.TextureLoader;
export const TextureUtils: Client<typeof Three.TextureUtils> =
  three("TextureUtils");
export const Timer: Client<typeof Three.Timer> = three("Timer");
export type Timer = Three.Timer;
export const TimestampQuery: Client<typeof Three.TimestampQuery> =
  three("TimestampQuery");
export type TimestampQuery = Three.TimestampQuery;
export const TorusGeometry: Client<typeof Three.TorusGeometry> =
  three("TorusGeometry");
export type TorusGeometry = Three.TorusGeometry;
export const TorusKnotGeometry: Client<typeof Three.TorusKnotGeometry> =
  three("TorusKnotGeometry");
export type TorusKnotGeometry = Three.TorusKnotGeometry;
export const Triangle: Client<typeof Three.Triangle> = three("Triangle");
export type Triangle = Three.Triangle;
export const TriangleFanDrawMode: Client<typeof Three.TriangleFanDrawMode> =
  three("TriangleFanDrawMode");
export const TriangleStripDrawMode: Client<typeof Three.TriangleStripDrawMode> =
  three("TriangleStripDrawMode");
export const TrianglesDrawMode: Client<typeof Three.TrianglesDrawMode> =
  three("TrianglesDrawMode");
export const TubeGeometry: Client<typeof Three.TubeGeometry> =
  three("TubeGeometry");
export type TubeGeometry = Three.TubeGeometry;
export const UVMapping: Client<typeof Three.UVMapping> = three("UVMapping");
export const Uint16BufferAttribute: Client<typeof Three.Uint16BufferAttribute> =
  three("Uint16BufferAttribute");
export type Uint16BufferAttribute = Three.Uint16BufferAttribute;
export const Uint32BufferAttribute: Client<typeof Three.Uint32BufferAttribute> =
  three("Uint32BufferAttribute");
export type Uint32BufferAttribute = Three.Uint32BufferAttribute;
export const Uint8BufferAttribute: Client<typeof Three.Uint8BufferAttribute> =
  three("Uint8BufferAttribute");
export type Uint8BufferAttribute = Three.Uint8BufferAttribute;
export const Uint8ClampedBufferAttribute: Client<
  typeof Three.Uint8ClampedBufferAttribute
> = three("Uint8ClampedBufferAttribute");
export type Uint8ClampedBufferAttribute = Three.Uint8ClampedBufferAttribute;
export const Uniform: Client<typeof Three.Uniform> = three("Uniform");
export type Uniform<T = any> = Three.Uniform<T>;
export const UniformsGroup: Client<typeof Three.UniformsGroup> =
  three("UniformsGroup");
export type UniformsGroup = Three.UniformsGroup;
export const UniformsLib: Client<typeof Three.UniformsLib> =
  three("UniformsLib");
export const UniformsUtils: Client<typeof Three.UniformsUtils> =
  three("UniformsUtils");
export const UnsignedByteType: Client<typeof Three.UnsignedByteType> =
  three("UnsignedByteType");
export const UnsignedInt101111Type: Client<typeof Three.UnsignedInt101111Type> =
  three("UnsignedInt101111Type");
export const UnsignedInt248Type: Client<typeof Three.UnsignedInt248Type> =
  three("UnsignedInt248Type");
export const UnsignedInt5999Type: Client<typeof Three.UnsignedInt5999Type> =
  three("UnsignedInt5999Type");
export const UnsignedIntType: Client<typeof Three.UnsignedIntType> =
  three("UnsignedIntType");
export const UnsignedShort4444Type: Client<typeof Three.UnsignedShort4444Type> =
  three("UnsignedShort4444Type");
export const UnsignedShort5551Type: Client<typeof Three.UnsignedShort5551Type> =
  three("UnsignedShort5551Type");
export const UnsignedShortType: Client<typeof Three.UnsignedShortType> =
  three("UnsignedShortType");
export const VSMShadowMap: Client<typeof Three.VSMShadowMap> =
  three("VSMShadowMap");
export const Vector2: Client<typeof Three.Vector2> = three("Vector2");
export type Vector2 = Three.Vector2;
export const Vector3: Client<typeof Three.Vector3> = three("Vector3");
export type Vector3 = Three.Vector3;
export const Vector4: Client<typeof Three.Vector4> = three("Vector4");
export type Vector4 = Three.Vector4;
export const VectorKeyframeTrack: Client<typeof Three.VectorKeyframeTrack> =
  three("VectorKeyframeTrack");
export type VectorKeyframeTrack = Three.VectorKeyframeTrack;
export const VideoFrameTexture: Client<typeof Three.VideoFrameTexture> =
  three("VideoFrameTexture");
export type VideoFrameTexture = Three.VideoFrameTexture;
export const VideoTexture: Client<typeof Three.VideoTexture> =
  three("VideoTexture");
export type VideoTexture<TVideo = HTMLVideoElement> =
  Three.VideoTexture<TVideo>;
export const WebGL3DRenderTarget: Client<typeof Three.WebGL3DRenderTarget> =
  three("WebGL3DRenderTarget");
export type WebGL3DRenderTarget = Three.WebGL3DRenderTarget;
export const WebGLArrayRenderTarget: Client<
  typeof Three.WebGLArrayRenderTarget
> = three("WebGLArrayRenderTarget");
export type WebGLArrayRenderTarget = Three.WebGLArrayRenderTarget;
export const WebGLCoordinateSystem: Client<typeof Three.WebGLCoordinateSystem> =
  three("WebGLCoordinateSystem");
export const WebGLCubeRenderTarget: Client<typeof Three.WebGLCubeRenderTarget> =
  three("WebGLCubeRenderTarget");
export type WebGLCubeRenderTarget = Three.WebGLCubeRenderTarget;
export const WebGLRenderTarget: Client<typeof Three.WebGLRenderTarget> =
  three("WebGLRenderTarget");
export type WebGLRenderTarget<
  TTexture extends Three.Texture | Three.Texture[] = Three.Texture,
> = Three.WebGLRenderTarget<TTexture>;
export const WebGLRenderer: Client<typeof Three.WebGLRenderer> =
  three("WebGLRenderer");
export type WebGLRenderer = Three.WebGLRenderer;
export const WebGLUtils: Client<typeof Three.WebGLUtils> = three("WebGLUtils");
export type WebGLUtils = Three.WebGLUtils;
export const WebGPUCoordinateSystem: Client<
  typeof Three.WebGPUCoordinateSystem
> = three("WebGPUCoordinateSystem");
export const WireframeGeometry: Client<typeof Three.WireframeGeometry> =
  three("WireframeGeometry");
export type WireframeGeometry<
  TBufferGeometry extends Three.BufferGeometry = Three.BufferGeometry,
> = Three.WireframeGeometry<TBufferGeometry>;
export const WrapAroundEnding: Client<typeof Three.WrapAroundEnding> =
  three("WrapAroundEnding");
export const ZeroCurvatureEnding: Client<typeof Three.ZeroCurvatureEnding> =
  three("ZeroCurvatureEnding");
export const ZeroFactor: Client<typeof Three.ZeroFactor> = three("ZeroFactor");
export const ZeroSlopeEnding: Client<typeof Three.ZeroSlopeEnding> =
  three("ZeroSlopeEnding");
export const ZeroStencilOp: Client<typeof Three.ZeroStencilOp> =
  three("ZeroStencilOp");
export const createCanvasElement: Client<typeof Three.createCanvasElement> =
  three("createCanvasElement");
export const error: Client<typeof Three.error> = three("error");
export const getConsoleFunction: Client<typeof Three.getConsoleFunction> =
  three("getConsoleFunction");
export const log: Client<typeof Three.log> = three("log");
export const setConsoleFunction: Client<typeof Three.setConsoleFunction> =
  three("setConsoleFunction");
export const warn: Client<typeof Three.warn> = three("warn");
export const warnOnce: Client<typeof Three.warnOnce> = three("warnOnce");

export type {
  AnimationActionLoopStyles,
  AnimationBlendMode,
  AnimationClipJSON,
  AnimationMixerEventMap,
  AnimationMixerStats,
  AnyMapping,
  AnyPixelFormat,
  AttributeGPUType,
  BaseEvent,
  BatchedMeshGeometryRange,
  BindMode,
  Blending,
  BlendingDstFactor,
  BlendingEquation,
  BlendingSrcFactor,
  Box3JSON,
  BufferAttributeJSON,
  BufferGeometryEventMap,
  BufferGeometryJSON,
  ColorRepresentation,
  ColorSpace,
  ColorSpaceDefinition,
  ColorSpaceTransfer,
  Combine,
  CompressedArrayTextureImageData,
  CompressedPixelFormat,
  CompressedTextureImageData,
  CompressedTextureMipmap,
  CoordinateSystem,
  CubeCameraRenderer,
  CubeTextureMapping,
  CullFace,
  CurveJSON,
  CurvePathJSON,
  CurveType,
  Data3DTextureImageData,
  DataArrayTextureImageData,
  DataTextureImageData,
  DepthModes,
  DepthPackingStrategies,
  DepthTextureImageData,
  DepthTexturePixelFormat,
  DirectionalLightJSON,
  DirectionalLightShadow,
  Effect,
  EulerOrder,
  EulerTuple,
  Event,
  EventListener,
  ExtrudeGeometryOptions,
  Face,
  FogExp2JSON,
  FogJSON,
  FramebufferTextureImageData,
  GLSLVersion,
  GeometryGroup,
  HSL,
  HemisphereLightJSON,
  IUniform,
  InstancedMeshEventMap,
  InstancedMeshJSON,
  InstancedMeshJSONObject,
  InterpolationEndingModes,
  InterpolationModes,
  Intersection,
  JSONMeta,
  KeyframeTrackJSON,
  LODJSON,
  LODJSONObject,
  LightEventMap,
  LightJSON,
  LightProbeJSON,
  LightShadow,
  LightShadowJSON,
  LineBasicMaterialParameters,
  LineBasicMaterialProperties,
  LineDashedMaterialParameters,
  LineDashedMaterialProperties,
  MagnificationTextureFilter,
  MapColorPropertiesToColorRepresentations,
  Mapping,
  MaterialJSON,
  MaterialParameters,
  MaterialProperties,
  Matrix2Tuple,
  Matrix3Tuple,
  Matrix4Tuple,
  MeshBasicMaterialParameters,
  MeshBasicMaterialProperties,
  MeshDepthMaterialParameters,
  MeshDepthMaterialProperties,
  MeshDistanceMaterialParameters,
  MeshDistanceMaterialProperties,
  MeshJSON,
  MeshJSONObject,
  MeshLambertMaterialParameters,
  MeshLambertMaterialProperties,
  MeshMatcapMaterialParameters,
  MeshMatcapMaterialProperties,
  MeshNormalMaterialParameters,
  MeshNormalMaterialProperties,
  MeshPhongMaterialParameters,
  MeshPhongMaterialProperties,
  MeshPhysicalMaterialParameters,
  MeshPhysicalMaterialProperties,
  MeshStandardMaterialParameters,
  MeshStandardMaterialProperties,
  MeshToonMaterialParameters,
  MeshToonMaterialProperties,
  MinificationTextureFilter,
  MixerControlInterpolant,
  MorphTarget,
  NormalBufferAttributes,
  NormalMapTypes,
  NormalOrGLBufferAttributes,
  NormalPacking,
  Object3DEventMap,
  Object3DJSON,
  Object3DJSONObject,
  OffscreenCanvas,
  OrthographicCameraJSON,
  OrthographicCameraJSONObject,
  PMREMGeneratorOptions,
  ParseTrackNameResults,
  PathJSON,
  PerspectiveCameraJSON,
  PerspectiveCameraJSONObject,
  PixelFormat,
  PixelFormatGPU,
  PointLightJSON,
  PointLightShadow,
  PointsMaterialParameters,
  PointsMaterialProperties,
  QuaternionLike,
  QuaternionTuple,
  RGB,
  RaycasterParameters,
  RenderItem,
  RenderTargetOptions,
  SRGBToLinear,
  SceneJSON,
  SceneJSONObject,
  SerializedImage,
  ShaderLibShader,
  ShaderMaterialJSON,
  ShaderMaterialParameters,
  ShaderMaterialProperties,
  ShaderMaterialUniformJSON,
  ShadowMapType,
  ShadowMaterialParameters,
  ShadowMaterialProperties,
  ShapeJSON,
  Side,
  SkeletonJSON,
  SkinnedMeshJSON,
  SkinnedMeshJSONObject,
  SourceJSON,
  SphereJSON,
  SpotLightJSON,
  SpotLightShadow,
  SpriteMaterialParameters,
  SpriteMaterialProperties,
  StencilFunc,
  StencilOp,
  TextureComparisonFunction,
  TextureDataType,
  TextureFilter,
  TextureJSON,
  TextureParameters,
  ToneMapping,
  TrianglesDrawModes,
  TypedArray,
  TypedArrayConstructor,
  UVGenerator,
  Usage,
  Vector2Like,
  Vector2Tuple,
  Vector3Like,
  Vector3Tuple,
  Vector4Like,
  Vector4Tuple,
  WebGLAttributes,
  WebGLBindingStates,
  WebGLBufferRenderer,
  WebGLCapabilities,
  WebGLCapabilitiesParameters,
  WebGLClipping,
  WebGLColorBuffer,
  WebGLCubeMaps,
  WebGLCubeUVMaps,
  WebGLDebug,
  WebGLDepthBuffer,
  WebGLExtensions,
  WebGLGeometries,
  WebGLIndexedBufferRenderer,
  WebGLInfo,
  WebGLLights,
  WebGLLightsState,
  WebGLObjects,
  WebGLProgram,
  WebGLProgramParameters,
  WebGLProgramParametersWithUniforms,
  WebGLPrograms,
  WebGLProperties,
  WebGLRenderList,
  WebGLRenderLists,
  WebGLRendererParameters,
  WebGLShader,
  WebGLShadowMap,
  WebGLState,
  WebGLStencilBuffer,
  WebGLTextures,
  WebGLUniforms,
  WebXRArrayCamera,
  WebXRCamera,
  WebXRController,
  WebXRDepthSensing,
  WebXRManager,
  WebXRManagerEventMap,
  WebXRSpaceEventMap,
  Wrapping,
  XRControllerEventType,
  XRGripSpace,
  XRHandInputState,
  XRHandJoints,
  XRHandSpace,
  XRJointSpace,
  XRTargetRaySpace,
} from "three";
