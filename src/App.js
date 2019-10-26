import React from 'react';
import { DndProvider } from 'react-dnd';
import html5Backend from 'react-dnd-html5-backend';

import GlobalStyled from './styles/global';

import Header from './components/Header';
import Board from  './components/Board';

function App() {
  return (
    <DndProvider backend={html5Backend}>
      <Header />
      <Board />
      
      <GlobalStyled />
    </DndProvider>
  );
}

export default App;
