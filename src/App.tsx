import { useState } from 'react';
import Editor from '@monaco-editor/react';

function App() {
  const [code, setCode] = useState('');
  const [lines, setLines] = useState(0);

  globalThis.open = 'Desactivated for security reasons';
  globalThis.print = 'Desactivated for security reasons';
  globalThis.alert = 'Desactivated for security reasons';
  globalThis.prompt = 'Desactivated for security reasons';
  globalThis.confirm = 'Desactivated for security reasons';

  globalThis.console.log = function (...e) {
    return parseResultHTML(...e);
  };

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

  function parseResultHTML(e) {
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

  const config = {
    minimap: {
      enabled: false,
    },
    fontSize: 16,
    lineDecorationsWidth: 0,
    padding: 0,
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden',
    },
  };

  return (
    <div
      style={{
        backgroundColor: '#282c34',
        color: 'white',
        display: 'flex',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Editor
        width={'50vw'}
        language='javascript'
        onChange={(e) => setCode(e ?? '')}
        theme={'vs-dark'}
        options={config}
        loading={''}
      />
      <div>
        {Array.from(Array(lines).keys()).map((e) => (
          <span
            style={{
              display: 'block',
              width: '28px',
              color: '#858585',
              fontSize: '16px',
              lineHeight: '24px',
              textAlign: 'center',
            }}
            key={e}
          >
            {e + 1}
          </span>
        ))}
      </div>
      <div
        id='result'
        style={{
          width: '100%',
          height: '100%',
          fontSize: '17px',
          lineHeight: '24px',
        }}
      />
    </div>
  );
}

export default App;
