// Index do Card
// Autor: Alessandro L. Santos
import React, { useRef, useContext } from 'react';

import { useDrag, useDrop } from 'react-dnd';

import { Container, Label } from './styles';

import BoardContext from '../Board/context';

export default function Card( { data, index, listIndex } ) {

  // Buscar a função do contexto
  const { move } = useContext(BoardContext);

  // Iniciar uma referencia vazia
  const ref = useRef();

  // Monitor quando o usuário arrasta um objeto 
  // -------------------------------------------------------------
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  // Monitora o objeto que será solto 
  // -------------------------------------------------------------
  const [, dropRef] = useDrop({
    accept: 'CARD',
    // Item => id do card que esta sendo arrastado e
    // data.id => é o id do card que esta recebendo o arraste
    hover(item, monitor) {
      // Pegar o Index da lista
      const draggedListIndex = item.listIndex;
      // Pegar o Index da lista que recebe o arrastante
      const targetListIndex = listIndex;
      // Capturar o Index do card que esta sendo arrastado
      const draggedIndex = item.index; 
      // Capturar o Index do Card alvo que esta recebendo o arraste
      const targetIndex = index;
      // Pegar o tamanho do elemento alvo que recebe o arraste
      const targetSize = ref.current.getBoundingClientRect();
      // Calcular o ponto Central do Card, pegar o tamanho do card e dividir pela metade
      const targetCenter = targetSize.height / 2;
      // Dá a posição do objeto que esta sendo arrastado x e y em relação ao top
      const draggedOffset = monitor.getClientOffset();
      // Descontar a posição do Top do objeto arrastado com a posição do top do objeto alvo
      const draggedTop = draggedOffset.y - targetSize.top

      // Verificar se o Card esta sendo arrastado sobre ele mesmo
      if(draggedIndex == targetIndex && draggedListIndex == targetListIndex){
        return;
      }
      // Verificar se o Card estiver antes do Card de destino não fazer nada
      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }
      // Verificar se o Card que esta arrastando estiver abaixo do card não faz nada
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;

    }
  });

  // Referencia do objeto que esta sendo arrastado e o 
  // alvo que esta recebendo
  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p> {data.content} </p>
      {data.user && <img src={data.user} alt='avatar' />}
    </Container>
  );
}
