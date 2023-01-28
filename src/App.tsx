import React from 'react';
import Editor from '@monaco-editor/react';

import './globalRules.ts';
import { monacoOptions } from 'utils/index';
import { NumberColumns } from 'components/NumberColumns';
import { useValidationCode } from 'hooks/useValidationCode';

function App() {
  const { setCode, lines } = useValidationCode();

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
