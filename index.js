import init from 'uhtml/ssr';

let a, d, H, h, hF, r, s, sF;

export default function initSSR(template) {
  const uhtml = init(template);
  a = uhtml.attr;
  d = uhtml.document;
  H = uhtml.Hole;
  h = uhtml.html;
  hF = uhtml.htmlFor;
  r = uhtml.render;
  s = uhtml.svg;
  sF = uhtml.svgFor;
  uhtml.raw = raw;
  return uhtml;
}

export const raw = str => h([str]);

export {
  a as attr,
  d as document,
  H as Hole,
  h as html,
  hF as htmlFor,
  r as render,
  s as svg,
  sF as svgFor
};
