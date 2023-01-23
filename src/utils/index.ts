const colors = {
  blue: '#569cd6',
  red: '#f44747',
  green: '#3dc9b0',
};

export function parseResultOutput(e: any) {
  if (typeof e === 'boolean') {
    return `<span style="color: ${colors.blue}">${e}</span>`;
  }
  if (typeof e === 'number') {
    return `<span style="color: ${colors.green}">${e}</span>`;
  }
  if (typeof e === 'object') {
    return JSON.stringify(e);
  }
  if (typeof e === 'string') {
    // return `'${e}'`;
    return e.match(/^['"].*['"]$/) ? e : `'${e}'`;
  }
  if (typeof e === 'function') {
    return `<span style="color: ${colors.red}">ƒ</span> ${e.name}()`;
  }
  if (typeof e === 'symbol') {
    return `<span style="color: ${colors.green}">${e.toString()}</span>`;
  }
  if (typeof e > 'u') {
    return '';
  }

  return e;
}

export const monacoOptions = {
  fontSize: 18,
  lineNumbersMinChars: 0,
  lineDecorationsWidth: 0,
  minimap: {
    enabled: false,
  },
  scrollbar: {
    vertical: 'hidden',
    horizontal: 'hidden',
  },
  glyphMargin: true,
  overviewRulerBorder: false,
};

export const validateRegexError = (error: string) =>
  error.matchAll(
    /ReferenceError/gi ||
      /SyntaxError/gi ||
      /TypeError/gi ||
      /RangeError/gi ||
      /EvalError/gi ||
      /URIError/gi
  );
