import { useState } from "react";
import Editor from "@monaco-editor/react";

function App() {
  const [code, setCode] = useState('');

  const resultDiv = document.getElementById('result');

  addEventListener('keyup', () => {
    resultDiv.innerHTML = '';
  
    const lines = code.split('\n');
  
    // Iteramos sobre cada línea
    for (const line of lines) {
      let result;
      try {
        result = eval(line);
      } catch (error) {
        result = error;
      }
  
      if (result !== 'undefined') {
        resultDiv.innerHTML += `${result}<br>`;
      }
    }
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      width: '100vw',
      height: '100vh',
      padding: '2rem'

    }}>
      <Editor line={2} width={'50vw'} defaultLanguage="javascript" onChange={e => setCode(e)} />
      <span id='result' />
    </div>
  );
}

export default App;
