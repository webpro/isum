type Hole = ReturnType<typeof import('uhtml').html>;

type Raw = (str: string) => Hole;

type UhtmlSSR = ReturnType<typeof import('uhtml/ssr').default> & {
  document: Document;
  raw: Raw;
};

declare const initSSR: (template?: unknown) => UhtmlSSR;

export default initSSR;
export * from 'uhtml/reactive';
export declare const document: Document;
export declare const raw: Raw;
