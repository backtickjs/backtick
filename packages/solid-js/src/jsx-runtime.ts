import { createJsxElement, type Client } from "@backtickjs/core";
import type { JSX as Solid } from "solid-js";

export declare namespace JSX {
  export type FunctionMaybe<T = unknown> = Solid.FunctionMaybe<T>;
  export type FunctionElement = Solid.FunctionElement;
  export type Element =
    | Client<Solid.Element>
    | ArrayElement
    | (string & {})
    | number
    | boolean
    | null
    | undefined;
  export type ElementType =
    | string
    | ((props: never) => Element)
    | ((props: never) => Promise<Element>);
  export interface ArrayElement extends Array<Element> {}
  export type ElementClass = Solid.ElementClass;
  export type ElementAttributesProperty = Solid.ElementAttributesProperty;
  export type ElementChildrenAttribute = Solid.ElementChildrenAttribute;
  export type EventHandler<T, E extends Event> = Solid.EventHandler<T, E>;
  export type BoundEventHandler<
    T,
    E extends Event,
    EHandler extends EventHandler<T, any> = EventHandler<T, E>,
  > = Solid.BoundEventHandler<T, E, EHandler>;
  export type EventHandlerUnion<
    T,
    E extends Event,
    EHandler extends EventHandler<T, any> = EventHandler<T, E>,
  > = Solid.EventHandlerUnion<T, E, EHandler>;
  export type EventHandlerWithOptions<
    T,
    E extends Event,
    EHandler = EventHandler<T, E>,
  > = Solid.EventHandlerWithOptions<T, E, EHandler>;
  export type EventHandlerWithOptionsUnion<
    T,
    E extends Event,
    EHandler extends EventHandler<T, any> = EventHandler<T, E>,
  > = Solid.EventHandlerWithOptionsUnion<T, E, EHandler>;
  export type InputEventHandler<
    T,
    E extends InputEvent,
  > = Solid.InputEventHandler<T, E>;
  export type InputEventHandlerUnion<
    T,
    E extends InputEvent,
  > = Solid.InputEventHandlerUnion<T, E>;
  export type ChangeEventHandler<T, E extends Event> = Solid.ChangeEventHandler<
    T,
    E
  >;
  export type ChangeEventHandlerUnion<
    T,
    E extends Event,
  > = Solid.ChangeEventHandlerUnion<T, E>;
  export type FocusEventHandler<
    T,
    E extends FocusEvent,
  > = Solid.FocusEventHandler<T, E>;
  export type FocusEventHandlerUnion<
    T,
    E extends FocusEvent,
  > = Solid.FocusEventHandlerUnion<T, E>;
  export type SerializableAttributeValue = Solid.SerializableAttributeValue;
  export type IntrinsicAttributes = Solid.IntrinsicAttributes;
  export type ClassList = Solid.ClassList;
  export type CustomAttributes<T> = Solid.CustomAttributes<T>;
  export type Accessor<T> = Solid.Accessor<T>;
  export type Directives = Solid.Directives;
  export type DirectiveFunctions = Solid.DirectiveFunctions;
  export type ExplicitProperties = Solid.ExplicitProperties;
  export type ExplicitAttributes = Solid.ExplicitAttributes;
  export type ExplicitBoolAttributes = Solid.ExplicitBoolAttributes;
  export type CustomEvents = Solid.CustomEvents;
  export type CustomCaptureEvents = Solid.CustomCaptureEvents;
  export type DirectiveAttributes = Solid.DirectiveAttributes;
  export type DirectiveFunctionAttributes<T> =
    Solid.DirectiveFunctionAttributes<T>;
  export type PropAttributes = Solid.PropAttributes;
  export type AttrAttributes = Solid.AttrAttributes;
  export type BoolAttributes = Solid.BoolAttributes;
  export type OnAttributes<T> = Solid.OnAttributes<T>;
  export type OnCaptureAttributes<T> = Solid.OnCaptureAttributes<T>;
  export type WindowEventMap<T> = Solid.WindowEventMap<T>;
  export type CustomEventHandlersCamelCase<T> =
    Solid.CustomEventHandlersCamelCase<T>;
  export type CustomEventHandlersLowerCase<T> =
    Solid.CustomEventHandlersLowerCase<T>;
  export type CustomEventHandlersNamespaced<T> =
    Solid.CustomEventHandlersNamespaced<T>;
  export type DOMAttributes<T> = Solid.DOMAttributes<T>;
  export type CSSProperties = Solid.CSSProperties;
  export type HTMLAutocapitalize = Solid.HTMLAutocapitalize;
  export type HTMLAutocomplete = Solid.HTMLAutocomplete;
  export type HTMLDir = Solid.HTMLDir;
  export type HTMLFormEncType = Solid.HTMLFormEncType;
  export type HTMLFormMethod = Solid.HTMLFormMethod;
  export type HTMLCrossorigin = Solid.HTMLCrossorigin;
  export type HTMLReferrerPolicy = Solid.HTMLReferrerPolicy;
  export type HTMLIframeSandbox = Solid.HTMLIframeSandbox;
  export type HTMLLinkAs = Solid.HTMLLinkAs;
  export type AriaAttributes = Solid.AriaAttributes;
  export type HTMLAttributes<T> = Solid.HTMLAttributes<T>;
  export type AnchorHTMLAttributes<T> = Solid.AnchorHTMLAttributes<T>;
  export type AudioHTMLAttributes<T> = Solid.AudioHTMLAttributes<T>;
  export type AreaHTMLAttributes<T> = Solid.AreaHTMLAttributes<T>;
  export type BaseHTMLAttributes<T> = Solid.BaseHTMLAttributes<T>;
  export type BdoHTMLAttributes<T> = Solid.BdoHTMLAttributes<T>;
  export type BlockquoteHTMLAttributes<T> = Solid.BlockquoteHTMLAttributes<T>;
  export type BodyHTMLAttributes<T> = Solid.BodyHTMLAttributes<T>;
  export type ButtonHTMLAttributes<T> = Solid.ButtonHTMLAttributes<T>;
  export type CanvasHTMLAttributes<T> = Solid.CanvasHTMLAttributes<T>;
  export type CaptionHTMLAttributes<T> = Solid.CaptionHTMLAttributes<T>;
  export type ColHTMLAttributes<T> = Solid.ColHTMLAttributes<T>;
  export type ColgroupHTMLAttributes<T> = Solid.ColgroupHTMLAttributes<T>;
  export type DataHTMLAttributes<T> = Solid.DataHTMLAttributes<T>;
  export type DetailsHtmlAttributes<T> = Solid.DetailsHtmlAttributes<T>;
  export type DialogHtmlAttributes<T> = Solid.DialogHtmlAttributes<T>;
  export type EmbedHTMLAttributes<T> = Solid.EmbedHTMLAttributes<T>;
  export type FieldsetHTMLAttributes<T> = Solid.FieldsetHTMLAttributes<T>;
  export type FormHTMLAttributes<T> = Solid.FormHTMLAttributes<T>;
  export type IframeHTMLAttributes<T> = Solid.IframeHTMLAttributes<T>;
  export type ImgHTMLAttributes<T> = Solid.ImgHTMLAttributes<T>;
  export type InputHTMLAttributes<T> = Solid.InputHTMLAttributes<T>;
  export type ModHTMLAttributes<T> = Solid.ModHTMLAttributes<T>;
  export type KeygenHTMLAttributes<T> = Solid.KeygenHTMLAttributes<T>;
  export type LabelHTMLAttributes<T> = Solid.LabelHTMLAttributes<T>;
  export type LiHTMLAttributes<T> = Solid.LiHTMLAttributes<T>;
  export type LinkHTMLAttributes<T> = Solid.LinkHTMLAttributes<T>;
  export type MapHTMLAttributes<T> = Solid.MapHTMLAttributes<T>;
  export type MediaHTMLAttributes<T> = Solid.MediaHTMLAttributes<T>;
  export type MenuHTMLAttributes<T> = Solid.MenuHTMLAttributes<T>;
  export type MetaHTMLAttributes<T> = Solid.MetaHTMLAttributes<T>;
  export type MeterHTMLAttributes<T> = Solid.MeterHTMLAttributes<T>;
  export type QuoteHTMLAttributes<T> = Solid.QuoteHTMLAttributes<T>;
  export type ObjectHTMLAttributes<T> = Solid.ObjectHTMLAttributes<T>;
  export type OlHTMLAttributes<T> = Solid.OlHTMLAttributes<T>;
  export type OptgroupHTMLAttributes<T> = Solid.OptgroupHTMLAttributes<T>;
  export type OptionHTMLAttributes<T> = Solid.OptionHTMLAttributes<T>;
  export type OutputHTMLAttributes<T> = Solid.OutputHTMLAttributes<T>;
  export type ParamHTMLAttributes<T> = Solid.ParamHTMLAttributes<T>;
  export type ProgressHTMLAttributes<T> = Solid.ProgressHTMLAttributes<T>;
  export type ScriptHTMLAttributes<T> = Solid.ScriptHTMLAttributes<T>;
  export type SelectHTMLAttributes<T> = Solid.SelectHTMLAttributes<T>;
  export type HTMLSlotElementAttributes<T> = Solid.HTMLSlotElementAttributes<T>;
  export type SourceHTMLAttributes<T> = Solid.SourceHTMLAttributes<T>;
  export type StyleHTMLAttributes<T> = Solid.StyleHTMLAttributes<T>;
  export type TdHTMLAttributes<T> = Solid.TdHTMLAttributes<T>;
  export type TemplateHTMLAttributes<T> = Solid.TemplateHTMLAttributes<T>;
  export type TextareaHTMLAttributes<T> = Solid.TextareaHTMLAttributes<T>;
  export type ThHTMLAttributes<T> = Solid.ThHTMLAttributes<T>;
  export type TimeHTMLAttributes<T> = Solid.TimeHTMLAttributes<T>;
  export type TrackHTMLAttributes<T> = Solid.TrackHTMLAttributes<T>;
  export type VideoHTMLAttributes<T> = Solid.VideoHTMLAttributes<T>;
  export type WebViewHTMLAttributes<T> = Solid.WebViewHTMLAttributes<T>;
  export type SVGPreserveAspectRatio = Solid.SVGPreserveAspectRatio;
  export type ImagePreserveAspectRatio = Solid.ImagePreserveAspectRatio;
  export type SVGUnits = Solid.SVGUnits;
  export type CoreSVGAttributes<T> = Solid.CoreSVGAttributes<T>;
  export type StylableSVGAttributes = Solid.StylableSVGAttributes;
  export type TransformableSVGAttributes = Solid.TransformableSVGAttributes;
  export type ConditionalProcessingSVGAttributes =
    Solid.ConditionalProcessingSVGAttributes;
  export type ExternalResourceSVGAttributes =
    Solid.ExternalResourceSVGAttributes;
  export type AnimationTimingSVGAttributes = Solid.AnimationTimingSVGAttributes;
  export type AnimationValueSVGAttributes = Solid.AnimationValueSVGAttributes;
  export type AnimationAdditionSVGAttributes =
    Solid.AnimationAdditionSVGAttributes;
  export type AnimationAttributeTargetSVGAttributes =
    Solid.AnimationAttributeTargetSVGAttributes;
  export type PresentationSVGAttributes = Solid.PresentationSVGAttributes;
  export type AnimationElementSVGAttributes<T> =
    Solid.AnimationElementSVGAttributes<T>;
  export type ContainerElementSVGAttributes<T> =
    Solid.ContainerElementSVGAttributes<T>;
  export type FilterPrimitiveElementSVGAttributes<T> =
    Solid.FilterPrimitiveElementSVGAttributes<T>;
  export type SingleInputFilterSVGAttributes =
    Solid.SingleInputFilterSVGAttributes;
  export type DoubleInputFilterSVGAttributes =
    Solid.DoubleInputFilterSVGAttributes;
  export type FitToViewBoxSVGAttributes = Solid.FitToViewBoxSVGAttributes;
  export type GradientElementSVGAttributes<T> =
    Solid.GradientElementSVGAttributes<T>;
  export type GraphicsElementSVGAttributes<T> =
    Solid.GraphicsElementSVGAttributes<T>;
  export type LightSourceElementSVGAttributes<T> =
    Solid.LightSourceElementSVGAttributes<T>;
  export type NewViewportSVGAttributes<T> = Solid.NewViewportSVGAttributes<T>;
  export type ShapeElementSVGAttributes<T> = Solid.ShapeElementSVGAttributes<T>;
  export type TextContentElementSVGAttributes<T> =
    Solid.TextContentElementSVGAttributes<T>;
  export type ZoomAndPanSVGAttributes = Solid.ZoomAndPanSVGAttributes;
  export type AnimateSVGAttributes<T> = Solid.AnimateSVGAttributes<T>;
  export type AnimateMotionSVGAttributes<T> =
    Solid.AnimateMotionSVGAttributes<T>;
  export type AnimateTransformSVGAttributes<T> =
    Solid.AnimateTransformSVGAttributes<T>;
  export type CircleSVGAttributes<T> = Solid.CircleSVGAttributes<T>;
  export type ClipPathSVGAttributes<T> = Solid.ClipPathSVGAttributes<T>;
  export type DefsSVGAttributes<T> = Solid.DefsSVGAttributes<T>;
  export type DescSVGAttributes<T> = Solid.DescSVGAttributes<T>;
  export type EllipseSVGAttributes<T> = Solid.EllipseSVGAttributes<T>;
  export type FeBlendSVGAttributes<T> = Solid.FeBlendSVGAttributes<T>;
  export type FeColorMatrixSVGAttributes<T> =
    Solid.FeColorMatrixSVGAttributes<T>;
  export type FeComponentTransferSVGAttributes<T> =
    Solid.FeComponentTransferSVGAttributes<T>;
  export type FeCompositeSVGAttributes<T> = Solid.FeCompositeSVGAttributes<T>;
  export type FeConvolveMatrixSVGAttributes<T> =
    Solid.FeConvolveMatrixSVGAttributes<T>;
  export type FeDiffuseLightingSVGAttributes<T> =
    Solid.FeDiffuseLightingSVGAttributes<T>;
  export type FeDisplacementMapSVGAttributes<T> =
    Solid.FeDisplacementMapSVGAttributes<T>;
  export type FeDistantLightSVGAttributes<T> =
    Solid.FeDistantLightSVGAttributes<T>;
  export type FeDropShadowSVGAttributes<T> = Solid.FeDropShadowSVGAttributes<T>;
  export type FeFloodSVGAttributes<T> = Solid.FeFloodSVGAttributes<T>;
  export type FeFuncSVGAttributes<T> = Solid.FeFuncSVGAttributes<T>;
  export type FeGaussianBlurSVGAttributes<T> =
    Solid.FeGaussianBlurSVGAttributes<T>;
  export type FeImageSVGAttributes<T> = Solid.FeImageSVGAttributes<T>;
  export type FeMergeSVGAttributes<T> = Solid.FeMergeSVGAttributes<T>;
  export type FeMergeNodeSVGAttributes<T> = Solid.FeMergeNodeSVGAttributes<T>;
  export type FeMorphologySVGAttributes<T> = Solid.FeMorphologySVGAttributes<T>;
  export type FeOffsetSVGAttributes<T> = Solid.FeOffsetSVGAttributes<T>;
  export type FePointLightSVGAttributes<T> = Solid.FePointLightSVGAttributes<T>;
  export type FeSpecularLightingSVGAttributes<T> =
    Solid.FeSpecularLightingSVGAttributes<T>;
  export type FeSpotLightSVGAttributes<T> = Solid.FeSpotLightSVGAttributes<T>;
  export type FeTileSVGAttributes<T> = Solid.FeTileSVGAttributes<T>;
  export type FeTurbulanceSVGAttributes<T> = Solid.FeTurbulanceSVGAttributes<T>;
  export type FilterSVGAttributes<T> = Solid.FilterSVGAttributes<T>;
  export type ForeignObjectSVGAttributes<T> =
    Solid.ForeignObjectSVGAttributes<T>;
  export type GSVGAttributes<T> = Solid.GSVGAttributes<T>;
  export type ImageSVGAttributes<T> = Solid.ImageSVGAttributes<T>;
  export type LineSVGAttributes<T> = Solid.LineSVGAttributes<T>;
  export type LinearGradientSVGAttributes<T> =
    Solid.LinearGradientSVGAttributes<T>;
  export type MarkerSVGAttributes<T> = Solid.MarkerSVGAttributes<T>;
  export type MaskSVGAttributes<T> = Solid.MaskSVGAttributes<T>;
  export type MetadataSVGAttributes<T> = Solid.MetadataSVGAttributes<T>;
  export type MPathSVGAttributes<T> = Solid.MPathSVGAttributes<T>;
  export type PathSVGAttributes<T> = Solid.PathSVGAttributes<T>;
  export type PatternSVGAttributes<T> = Solid.PatternSVGAttributes<T>;
  export type PolygonSVGAttributes<T> = Solid.PolygonSVGAttributes<T>;
  export type PolylineSVGAttributes<T> = Solid.PolylineSVGAttributes<T>;
  export type RadialGradientSVGAttributes<T> =
    Solid.RadialGradientSVGAttributes<T>;
  export type RectSVGAttributes<T> = Solid.RectSVGAttributes<T>;
  export type SetSVGAttributes<T> = Solid.SetSVGAttributes<T>;
  export type StopSVGAttributes<T> = Solid.StopSVGAttributes<T>;
  export type SvgSVGAttributes<T> = Solid.SvgSVGAttributes<T>;
  export type SwitchSVGAttributes<T> = Solid.SwitchSVGAttributes<T>;
  export type SymbolSVGAttributes<T> = Solid.SymbolSVGAttributes<T>;
  export type TextSVGAttributes<T> = Solid.TextSVGAttributes<T>;
  export type TextPathSVGAttributes<T> = Solid.TextPathSVGAttributes<T>;
  export type TSpanSVGAttributes<T> = Solid.TSpanSVGAttributes<T>;
  export type UseSVGAttributes<T> = Solid.UseSVGAttributes<T>;
  export type ViewSVGAttributes<T> = Solid.ViewSVGAttributes<T>;
  export type MathMLAttributes<T> = Solid.MathMLAttributes<T>;
  export type MathMLAnnotationElementAttributes<T> =
    Solid.MathMLAnnotationElementAttributes<T>;
  export type MathMLAnnotationXmlElementAttributes<T> =
    Solid.MathMLAnnotationXmlElementAttributes<T>;
  export type MathMLMactionElementAttributes<T> =
    Solid.MathMLMactionElementAttributes<T>;
  export type MathMLMathElementAttributes<T> =
    Solid.MathMLMathElementAttributes<T>;
  export type MathMLMerrorElementAttributes<T> =
    Solid.MathMLMerrorElementAttributes<T>;
  export type MathMLMfracElementAttributes<T> =
    Solid.MathMLMfracElementAttributes<T>;
  export type MathMLMiElementAttributes<T> = Solid.MathMLMiElementAttributes<T>;
  export type MathMLMmultiscriptsElementAttributes<T> =
    Solid.MathMLMmultiscriptsElementAttributes<T>;
  export type MathMLMnElementAttributes<T> = Solid.MathMLMnElementAttributes<T>;
  export type MathMLMoElementAttributes<T> = Solid.MathMLMoElementAttributes<T>;
  export type MathMLMoverElementAttributes<T> =
    Solid.MathMLMoverElementAttributes<T>;
  export type MathMLMpaddedElementAttributes<T> =
    Solid.MathMLMpaddedElementAttributes<T>;
  export type MathMLMphantomElementAttributes<T> =
    Solid.MathMLMphantomElementAttributes<T>;
  export type MathMLMprescriptsElementAttributes<T> =
    Solid.MathMLMprescriptsElementAttributes<T>;
  export type MathMLMrootElementAttributes<T> =
    Solid.MathMLMrootElementAttributes<T>;
  export type MathMLMrowElementAttributes<T> =
    Solid.MathMLMrowElementAttributes<T>;
  export type MathMLMsElementAttributes<T> = Solid.MathMLMsElementAttributes<T>;
  export type MathMLMspaceElementAttributes<T> =
    Solid.MathMLMspaceElementAttributes<T>;
  export type MathMLMsqrtElementAttributes<T> =
    Solid.MathMLMsqrtElementAttributes<T>;
  export type MathMLMstyleElementAttributes<T> =
    Solid.MathMLMstyleElementAttributes<T>;
  export type MathMLMsubElementAttributes<T> =
    Solid.MathMLMsubElementAttributes<T>;
  export type MathMLMsubsupElementAttributes<T> =
    Solid.MathMLMsubsupElementAttributes<T>;
  export type MathMLMsupElementAttributes<T> =
    Solid.MathMLMsupElementAttributes<T>;
  export type MathMLMtableElementAttributes<T> =
    Solid.MathMLMtableElementAttributes<T>;
  export type MathMLMtdElementAttributes<T> =
    Solid.MathMLMtdElementAttributes<T>;
  export type MathMLMtextElementAttributes<T> =
    Solid.MathMLMtextElementAttributes<T>;
  export type MathMLMtrElementAttributes<T> =
    Solid.MathMLMtrElementAttributes<T>;
  export type MathMLMunderElementAttributes<T> =
    Solid.MathMLMunderElementAttributes<T>;
  export type MathMLMunderoverElementAttributes<T> =
    Solid.MathMLMunderoverElementAttributes<T>;
  export type MathMLSemanticsElementAttributes<T> =
    Solid.MathMLSemanticsElementAttributes<T>;
  export type MathMLMencloseElementAttributes<T> =
    Solid.MathMLMencloseElementAttributes<T>;
  export type MathMLMfencedElementAttributes<T> =
    Solid.MathMLMfencedElementAttributes<T>;
  export type HTMLElementTags = Solid.HTMLElementTags;
  export type HTMLElementDeprecatedTags = Solid.HTMLElementDeprecatedTags;
  export type SVGElementTags = Solid.SVGElementTags;
  export type MathMLElementTags = Solid.MathMLElementTags;
  export type IntrinsicElements = Solid.IntrinsicElements;
}

/**
 * `<>` and `<Fragment>`, as `solid-js/h/jsx-runtime` types it. Always an
 * array, so a single child that is a script stays a child, read where it
 * stands, rather than a script the fragment drew.
 */
export function Fragment(props: { children: JSX.Element }): JSX.Element {
  return [props.children];
}

export function jsx(type: JSX.ElementType, props: unknown): JSX.Element {
  // Core's element, as this adapter types it: a stand-in for a Solid element.
  return createJsxElement(type, props) as JSX.Element;
}

export const jsxs = jsx;
// What a development build of the JSX transform calls, as Bun does.
export const jsxDEV = jsx;
