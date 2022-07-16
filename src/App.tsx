import Editor from '@monaco-editor/react';
import { useState } from 'react';

function App() {
  const [code, setCode] = useState('');

  try {
    console.log(eval(code))
  } catch (error) {  
    console.log(eval(error))
  }

  return (
    <div style={{ backgroundColor: 'black'}}>
      <Editor
        language='javascript'
        value='const example = "Hello World";'
        height={'100vh'}
        width={'100%'}
        theme={'vs-dark'}
        onChange={e => setCode(e.toString())}
      />
    </div>
  );
}

export default App;
