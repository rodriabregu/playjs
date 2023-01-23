import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

import './globalRules.ts';
import { monacoOptions, parseResultOutput, validateRegexError } from './utils';
import { NumberColumns } from './components/NumberColumns';

function App() {
  const [code, setCode] = useState('');
  const [lines, setLines] = useState(0);
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
      if(resultDiv) resultDiv.innerHTML = result;
}

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      codePlay();
    }, 200);

    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <main className='container'>
      <Editor
        loading={''}
        theme={'vs-dark'}
        language={'javascript'}
        options={monacoOptions}
        onChange={(e) => setCode(e ?? '')}
      />
      <section className='divider'>
        <NumberColumns lines={lines} />
        <div className='result' id='result' />
      </section>
    </main>
  );
}

export default App;
