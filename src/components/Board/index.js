// Index do Board
// Autor: Alessandro L. Santos
import React, { useState } from 'react';

import produce from 'immer';

import { loadLists } from '../../services/api';
import BoardContext from './context';

import List from '../List';
import { Container } from './styles';

const data = loadLists();

export default function Board() {

  const [lists, setLists] = useState(data);

  // Função para mover os Card que recebe como parameto 'From' e 'to'
  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from]

      // Removendo o item que esta sendo arrastado
      draft[fromList].cards.splice(from, 1);
      // colocar na posição
      draft[toList].cards.splice(to, 0, dragged);
    }))
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
      </Container>
    </BoardContext.Provider>
  );
}
