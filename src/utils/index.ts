export function parseResultHTML(e: any) {
  return typeof e == 'object'
    ? JSON.stringify(e)
    : typeof e == 'string'
    ? e.match(/^['"].*['"]$/)
      ? e
      : `'${e}'`
    : typeof e == 'function'
    ? e()
    : typeof e == 'symbol'
    ? e.toString()
    : typeof e > 'u'
    ? ''
    : e;
}

export const monacoOptions = {
  fontSize: 16,
  lineDecorationsWidth: 0,
  minimap: {
    enabled: false,
  },
  scrollbar: {
    vertical: 'hidden',
    horizontal: 'hidden',
  },
};
