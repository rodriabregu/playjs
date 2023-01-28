import React from 'react';
import { parseResultOutput, validateRegexError } from '../utils';

export function useValidationCode() {
  const [code, setCode] = React.useState('');
  const [lines, setLines] = React.useState(0);

  const resultDiv = document.querySelector('#result') as HTMLElement;

  const codePlay = () => {
    let result = '';
      setLines(code.split(/\r?\n|\r|\n/g).length);
      code
        .trimEnd()
        .split(/\r?\n|\r|\n/g)
        .reduce((acc, line) => {
          if (line.trim() === '')
            return (
              (result += `
  ` + `<br/>`),
              acc +
                `
  `
            );
          const htmlPart: any = acc + line;
          if (
            line ||
            line === '' ||
            !line.startsWith((/\/\//) as any) ||
            !line.startsWith((/\/*/) as any)
          )
            try {
              const html = eval(htmlPart);
              result +=
                parseResultOutput(html) +
                `
  ` +
                `<br/>`;
  
                if (result.includes('null')) {
                    result = result.replaceAll('null', '<span style="color: #569cd6">null</span>');
                }
                if (result.includes('undefined')) {
                    result = result.replaceAll('undefined', '<span style="color: #569cd6">undefined</span>');
                }
            } catch (e) {
              const error = (e as any).toString()
              validateRegexError(error) && (result += e),
                (result += `
  ` + `<br/>`);
            }
          return (
            htmlPart +
            `
  `
          );
        }, '');

    if (resultDiv) resultDiv.innerHTML = result;
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      codePlay();
    }, 200);

    return () => clearTimeout(timeout);
  }, [code]);

  return { code, setCode, lines };
}