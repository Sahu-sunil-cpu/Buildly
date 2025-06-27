import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { EditorLayout } from './components/EditorLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EditorPage } from './components/EditorPage';
import NotFound from './components/NotFound';

function App() {
  const [userPrompt, setuserPrompt] = useState<any>('');

  return (
   

          <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage setUserPrompt={setuserPrompt}/>} />
          <Route path="/editor" element={<EditorLayout userPrompt={userPrompt}/>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;