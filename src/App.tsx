import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

import { monacoOptions, parseResultHTML } from './utils';
import './globalRules.ts';

function App() {
  const [code, setCode] = useState('');
  const [lines, setLines] = useState(0);

  addEventListener('keyup', () => {
    let result = '';
    setLines(code.split(/\r?\n|\r|\n/g).length);
    code
      .trimEnd()
      .split(/\r?\n|\r|\n/g)
      .reduce((acc, line) => {
        if (line.trim() === '')
          return (
            (result += `
`),
            acc +
              `
`
          );
        const htmlPart = acc + line;
        if (
          line ||
          line === '' ||
          !line.startsWith(/\/\//) ||
          !line.startsWith(/\/*/)
        )
          try {
            const html = eval(htmlPart);
            result +=
              parseResultHTML(html) +
              `
` +
              `<br/>`;
          } catch (e) {
            e.toString().match(/ReferenceError/gi) && (result += e),
              (result += `
`);
          }
        return (
          htmlPart +
          `
`
        );
      }, '');
    document.querySelector('#result').innerHTML = result;
  });

  return (
    <main className='container'>
      <Editor
        loading={''}
        theme={'vs-dark'}
        language='javascript'
        options={monacoOptions}
        onChange={(e) => setCode(e ?? '')}
      />
      <section className='divider'>
        <div>
          {Array.from(Array(lines).keys()).map((e) => (
            <span className='numberColumns' key={e}>
              {e + 1}
            </span>
          ))}
        </div>
        <div className='result' id='result' />
      </section>
    </main>
  );
}

export default App;
