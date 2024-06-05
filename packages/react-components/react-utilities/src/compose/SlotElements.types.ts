import * as React from 'react';
import { SlotRenderFunction } from './types';

export interface SlotElements {
  //
  // Content sectioning
  //
  // address: SlotAttributes<HTMLElement>;
  // article: SlotAttributes<HTMLElement>;
  // aside: SlotAttributes<HTMLElement>;
  footer: SlotAttributes<HTMLElement>;
  h1: SlotAttributes<HTMLHeadingElement>;
  h2: SlotAttributes<HTMLHeadingElement>;
  h3: SlotAttributes<HTMLHeadingElement>;
  h4: SlotAttributes<HTMLHeadingElement>;
  h5: SlotAttributes<HTMLHeadingElement>;
  h6: SlotAttributes<HTMLHeadingElement>;
  header: SlotAttributes<HTMLElement>;
  hgroup: SlotAttributes<HTMLElement>;
  // main: SlotAttributes<HTMLElement>;
  nav: SlotAttributes<HTMLElement>;
  section: SlotAttributes<HTMLElement>;

  //
  // Text content
  //
  // blockquote: BlockquoteSlotAttributes<HTMLQuoteElement>;
  // dd: SlotAttributes<HTMLElement>;
  div: SlotAttributes<HTMLDivElement>;
  // dl: SlotAttributes<HTMLDListElement>;
  // dt: SlotAttributes<HTMLElement>;
  // figcaption: SlotAttributes<HTMLElement>;
  // figure: SlotAttributes<HTMLElement>;
  // hr: HrSlotAttributes<HTMLHRElement>;
  li: LiSlotAttributes<HTMLLIElement>;
  menu: MenuSlotAttributes<HTMLElement>;
  ol: OlSlotAttributes<HTMLOListElement>;
  p: SlotAttributes<HTMLParagraphElement>;
  pre: SlotAttributes<HTMLPreElement>;
  ul: SlotAttributes<HTMLUListElement>;

  //
  // Inline text semantics
  //
  a: AnchorSlotAttributes<HTMLAnchorElement>;
  // abbr: SlotAttributes<HTMLElement>;
  // b: SlotAttributes<HTMLElement>;
  // bdi: SlotAttributes<HTMLElement>;
  // bdo: SlotAttributes<HTMLElement>;
  // br: BrSlotAttributes<HTMLBRElement>;
  // cite: SlotAttributes<HTMLElement>;
  code: SlotAttributes<HTMLElement>;
  // data: DataSlotAttributes<HTMLDataElement>;
  // dfn: SlotAttributes<HTMLElement>;
  // em: SlotAttributes<HTMLElement>;
  // i: SlotAttributes<HTMLElement>;
  // kbd: SlotAttributes<HTMLElement>;
  // mark: SlotAttributes<HTMLElement>;
  // q: QuoteSlotAttributes<HTMLQuoteElement>;
  // rp: SlotAttributes<HTMLElement>;
  // rt: SlotAttributes<HTMLElement>;
  // ruby: SlotAttributes<HTMLElement>;
  // s: SlotAttributes<HTMLElement>;
  // samp: SlotAttributes<HTMLElement>;
  // small: SlotAttributes<HTMLElement>;
  span: SlotAttributes<HTMLSpanElement>;
  // strong: SlotAttributes<HTMLElement>;
  // sub: SlotAttributes<HTMLElement>;
  // sup: SlotAttributes<HTMLElement>;
  // time: TimeSlotAttributes<HTMLTimeElement>;
  // u: SlotAttributes<HTMLElement>;
  // wbr: BrSlotAttributes<HTMLElement>;

  //
  // Image and multimedia
  //
  // area: AreaSlotAttributes<HTMLAreaElement>;
  // audio: AudioSlotAttributes<HTMLAudioElement>;
  img: ImgSlotAttributes<HTMLImageElement>;
  // map: MapSlotAttributes<HTMLMapElement>;
  // track: TrackSlotAttributes<HTMLTrackElement>;
  // video: VideoSlotAttributes<HTMLVideoElement>;

  //
  // Embedded content
  //
  // embed: EmbedSlotAttributes<HTMLEmbedElement>;
  // iframe: IframeSlotAttributes<HTMLIFrameElement>;
  // object: ObjectSlotAttributes<HTMLObjectElement>;
  picture: SlotAttributes<HTMLElement>;
  source: SourceSlotAttributes<HTMLSourceElement>;

  //
  // SVG
  //
  svg: SVGSlotAttributes<SVGSVGElement>;

  //
  // Scripting
  //
  canvas: CanvasSlotAttributes<HTMLCanvasElement>;
  // noscript: SlotAttributes<HTMLElement>;
  // script: ScriptSlotAttributes<HTMLScriptElement>;

  //
  // Table content
  //
  caption: SlotAttributes<HTMLElement>;
  col: ColSlotAttributes<HTMLTableColElement>;
  colgroup: ColgroupSlotAttributes<HTMLTableColElement>;
  table: TableSlotAttributes<HTMLTableElement>;
  tbody: SlotAttributes<HTMLTableSectionElement>;
  td: TdSlotAttributes<HTMLTableDataCellElement>;
  tfoot: SlotAttributes<HTMLTableSectionElement>;
  th: ThSlotAttributes<HTMLTableHeaderCellElement>;
  thead: SlotAttributes<HTMLTableSectionElement>;
  tr: SlotAttributes<HTMLTableRowElement>;

  //
  // Forms
  //
  button: ButtonSlotAttributes<HTMLButtonElement>;
  datalist: SlotAttributes<HTMLDataListElement>;
  fieldset: FieldsetSlotAttributes<HTMLFieldSetElement>;
  form: FormSlotAttributes<HTMLFormElement>;
  input: InputSlotAttributes<HTMLInputElement>;
  label: LabelSlotAttributes<HTMLLabelElement>;
  legend: SlotAttributes<HTMLLegendElement>;
  meter: MeterSlotAttributes<HTMLMeterElement>;
  optgroup: OptgroupSlotAttributes<HTMLOptGroupElement>;
  option: OptionSlotAttributes<HTMLOptionElement>;
  output: OutputSlotAttributes<HTMLOutputElement>;
  progress: ProgressSlotAttributes<HTMLProgressElement>;
  select: SelectSlotAttributes<HTMLSelectElement>;
  textarea: TextareaSlotAttributes<HTMLTextAreaElement>;

  //
  // Interactive elements
  //
  details: DetailsSlotAttributes<HTMLDetailsElement>;
  dialog: DialogSlotAttributes<HTMLDialogElement>;
  summary: SlotAttributes<HTMLElement>;

  //
  // Root
  //
  // body: SlotAttributes<HTMLBodyElement>;
  // html: HtmlSlotAttributes<HTMLHtmlElement>;

  //
  // Document metadata
  //
  // base: BaseSlotAttributes<HTMLBaseElement>;
  // head: SlotAttributes<HTMLHeadElement>;
  // link: LinkSlotAttributes<HTMLLinkElement>;
  // meta: MetaSlotAttributes<HTMLMetaElement>;
  // style: StyleSlotAttributes<HTMLStyleElement>;
  // title: SlotAttributes<HTMLTitleElement>;

  //
  // Demarcating edits
  //
  // del: DelSlotAttributes<HTMLModElement>;
  // ins: InsSlotAttributes<HTMLModElement>;

  //
  // Web Components
  //
  // slot: SlotSlotAttributes<HTMLSlotElement>;
  // template: SlotAttributes<HTMLTemplateElement>;

  //
  // Obsolete and deprecated elements
  //
  // big: SlotAttributes<HTMLElement>;
  // keygen: KeygenSlotAttributes<HTMLElement>;
  // menuitem: SlotAttributes<HTMLElement>;
  // noindex: SlotAttributes<HTMLElement>;
  // param: ParamSlotAttributes<HTMLParamElement>;
  // webview: WebViewSlotAttributes<HTMLWebViewElement>;
}

// Similar to React.RefAttributes, but does not include the key prop, which we don't want on slots
export interface RefAttribute<E> {
  ref?: React.Ref<E>;
}

export interface SlotAttributes<E> extends React.HTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.HTMLAttributes<E> & RefAttribute<E>>;
}
export interface AnchorSlotAttributes<E> extends React.AnchorHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.AnchorHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface AreaSlotAttributes<E> extends React.AreaHTMLAttributes<E>, RefAttribute<E> {
//   children?: SlotRenderFunction<React.AreaHTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
// }
// export interface AudioSlotAttributes<E> extends React.AudioHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.AudioHTMLAttributes<E> & RefAttribute<E>>;
// }
// export interface BaseSlotAttributes<E> extends React.BaseHTMLAttributes<E>, RefAttribute<E> {
//   children?: SlotRenderFunction<React.BaseHTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
// }
// export interface BlockquoteSlotAttributes<E> extends React.BlockquoteHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.BlockquoteHTMLAttributes<E> & RefAttribute<E>>;
// }
export interface ButtonSlotAttributes<E> extends React.ButtonHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.ButtonHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface BrSlotAttributes<E> extends React.HTMLAttributes<E>, RefAttribute<E> {
//   children?: SlotRenderFunction<React.HTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
// }
export interface CanvasSlotAttributes<E> extends React.CanvasHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.CanvasHTMLAttributes<E> & RefAttribute<E>>;
}
export interface ColgroupSlotAttributes<E> extends React.ColgroupHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.ColgroupHTMLAttributes<E> & RefAttribute<E>>;
}
export interface ColSlotAttributes<E> extends React.ColHTMLAttributes<E>, RefAttribute<E> {
  children?: SlotRenderFunction<React.ColHTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
}
// export interface DataSlotAttributes<E> extends React.DataHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.DataHTMLAttributes<E> & RefAttribute<E>>;
// }
// export interface DelSlotAttributes<E> extends React.DelHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.DelHTMLAttributes<E> & RefAttribute<E>>;
// }
export interface DetailsSlotAttributes<E> extends React.DetailsHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.DetailsHTMLAttributes<E> & RefAttribute<E>>;
}
export interface DialogSlotAttributes<E> extends React.DialogHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.DialogHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface EmbedSlotAttributes<E> extends React.EmbedHTMLAttributes<E>, RefAttribute<E> {
//   children?: SlotRenderFunction<React.EmbedHTMLAttributes<E> & RefAttribute<E>>;
// }
export interface FieldsetSlotAttributes<E> extends React.FieldsetHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.FieldsetHTMLAttributes<E> & RefAttribute<E>>;
}
export interface FormSlotAttributes<E> extends React.FormHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.FormHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface HtmlSlotAttributes<E> extends React.HtmlHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.HtmlHTMLAttributes<E> & RefAttribute<E>>;
// }
// export interface IframeSlotAttributes<E> extends React.IframeHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.IframeHTMLAttributes<E> & RefAttribute<E>>;
// }
// export interface HrSlotAttributes<E> extends React.HTMLAttributes<E>, RefAttribute<E> {
//   children?: SlotRenderFunction<React.HTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
// }
export interface ImgSlotAttributes<E> extends React.ImgHTMLAttributes<E>, RefAttribute<E> {
  children?: SlotRenderFunction<React.ImgHTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
}
export interface InputSlotAttributes<E> extends React.InputHTMLAttributes<E>, RefAttribute<E> {
  children?: SlotRenderFunction<React.InputHTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
}
// export interface InsSlotAttributes<E> extends React.InsHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.InsHTMLAttributes<E> & RefAttribute<E>>;
// }
// export interface KeygenSlotAttributes<E> extends React.KeygenHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.KeygenHTMLAttributes<E> & RefAttribute<E>>;
// }
export interface LabelSlotAttributes<E> extends React.LabelHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.LabelHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface LinkSlotAttributes<E> extends React.LinkHTMLAttributes<E>, RefAttribute<E> {
//   children?: SlotRenderFunction<React.LinkHTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
// }
export interface LiSlotAttributes<E> extends React.LiHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.LiHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface MapSlotAttributes<E> extends React.MapHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.MapHTMLAttributes<E> & RefAttribute<E>>;
// }
export interface MenuSlotAttributes<E> extends React.MenuHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.MenuHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface MetaSlotAttributes<E> extends React.MetaHTMLAttributes<E>, RefAttribute<E> {
//   children?: SlotRenderFunction<React.MetaHTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
// }
export interface MeterSlotAttributes<E> extends React.MeterHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.MeterHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface ObjectSlotAttributes<E> extends React.ObjectHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.ObjectHTMLAttributes<E> & RefAttribute<E>>;
// }
export interface OlSlotAttributes<E> extends React.OlHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.OlHTMLAttributes<E> & RefAttribute<E>>;
}
export interface OptgroupSlotAttributes<E> extends React.OptgroupHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.OptgroupHTMLAttributes<E> & RefAttribute<E>>;
}
export interface OptionSlotAttributes<E> extends React.OptionHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.OptionHTMLAttributes<E> & RefAttribute<E>>;
}
export interface OutputSlotAttributes<E> extends React.OutputHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.OutputHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface ParamSlotAttributes<E> extends React.ParamHTMLAttributes<E>, RefAttribute<E> {
//   children?: SlotRenderFunction<React.ParamHTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
// }
export interface ProgressSlotAttributes<E> extends React.ProgressHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.ProgressHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface QuoteSlotAttributes<E> extends React.QuoteHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.QuoteHTMLAttributes<E> & RefAttribute<E>>;
// }
// export interface ScriptSlotAttributes<E> extends React.ScriptHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.ScriptHTMLAttributes<E> & RefAttribute<E>>;
// }
export interface SelectSlotAttributes<E> extends React.SelectHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.SelectHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface SlotSlotAttributes<E> extends React.SlotAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<SlotSlotAttributes<E>>;
// }
export interface SourceSlotAttributes<E> extends React.SourceHTMLAttributes<E>, RefAttribute<E> {
  children?: SlotRenderFunction<React.SourceHTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
}
// export interface StyleSlotAttributes<E> extends React.StyleHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.StyleHTMLAttributes<E> & RefAttribute<E>>;
// }
export interface SVGSlotAttributes<E> extends React.SVGAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.SVGAttributes<E> & RefAttribute<E>>;
}
export interface TableSlotAttributes<E> extends React.TableHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.TableHTMLAttributes<E> & RefAttribute<E>>;
}
export interface TdSlotAttributes<E> extends React.TdHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.TdHTMLAttributes<E> & RefAttribute<E>>;
}
export interface TextareaSlotAttributes<E> extends React.TextareaHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.TextareaHTMLAttributes<E> & RefAttribute<E>>;
}
export interface ThSlotAttributes<E> extends React.ThHTMLAttributes<E>, RefAttribute<E> {
  children?: React.ReactNode | SlotRenderFunction<React.ThHTMLAttributes<E> & RefAttribute<E>>;
}
// export interface TimeSlotAttributes<E> extends React.TimeHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.TimeHTMLAttributes<E> & RefAttribute<E>>;
// }
// export interface TrackSlotAttributes<E> extends React.TrackHTMLAttributes<E>, RefAttribute<E> {
//   children?: SlotRenderFunction<React.TrackHTMLAttributes<E> & RefAttribute<E>>; // empty element; ReactNode is not allowed
// }
// export interface VideoSlotAttributes<E> extends React.VideoHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.VideoHTMLAttributes<E> & RefAttribute<E>>;
// }
// export interface WebViewSlotAttributes<E> extends React.WebViewHTMLAttributes<E>, RefAttribute<E> {
//   children?: React.ReactNode | SlotRenderFunction<React.WebViewHTMLAttributes<E> & RefAttribute<E>>;
// }
