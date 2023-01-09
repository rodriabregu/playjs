import { useState } from 'react';
import Editor from '@monaco-editor/react';

function App() {
  const [code, setCode] = useState('');
  const resultDiv = document.getElementById('result');

  globalThis.open = 'Desactivated for security reasons'
  globalThis.print = 'Desactivated for security reasons'
  globalThis.alert = 'Desactivated for security reasons'
  globalThis.prompt = 'Desactivated for security reasons'
  globalThis.confirm = 'Desactivated for security reasons'

  // function evaluarCodigo(codigo, elemento) {
  //   let output = document.querySelector(elemento);

  //   output.innerHTML = '';
  //   try {
  //     let funcion = function() {
  //       return eval(codigo);
  //     };

  //     let contexto = {};
  //     output.innerHTML += funcion.apply(contexto) + "<br>";
  //   } catch (error) {
  //     output.innerHTML += error + "<br>";
  //   }
  // }

  addEventListener('keyup', () => {
    window.eval(code);
    if (resultDiv) resultDiv.innerHTML = '';

    const lines = code.split('\n');

    for (const line of lines) {
      let result;
      try {
        result = eval(line)
      } catch (error) {
        result = error;
      }

      if (result === undefined) result = '';
      if (resultDiv) resultDiv.innerHTML += `${result}<br>`;
    }
  });

  const config = {
    minimap: {
      enabled: false,
    },
    lineNumbers: 'off',
    fontSize: 16,
  }

  return (
    <div
      style={{
        backgroundColor: '#282c34',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Editor
        width={'50vw'}
        value={'"example code"'}
        defaultLanguage='javascript'
        // onChange={(e) => setCode(e?.replace('const', 'var') ?? '')}
        onChange={(e) => setCode(e ?? '')}
        theme={'vs-dark'}
        options={config}
      />
      <code style={{ marginLeft: '1rem', fontSize: 18 }} id='result' />
    </div>
  );
}

export default App;
